"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Youtube, AlertCircle, Loader2, Download } from "lucide-react"
import { extractVideoId, validateYouTubeUrl } from "@/lib/utils"
import MainThumbnailViewer from "@/components/main-thumbnail-viewer"
import Image from "next/image"
import { translations, type Language, supportedLanguages } from "@/lib/translations"

interface ThumbnailSizes {
  maxres: string
  hq: string
  mq: string
  sd: string
  default: string
  medium: string
  high: string
}

export default function LanguagePage() {
  const router = useRouter()
  const params = useParams()
  const currentLang = (params?.lang as Language) || "en"

  const [url, setUrl] = useState("")
  const [thumbnailSizes, setThumbnailSizes] = useState<ThumbnailSizes | null>(null)
  const [mainThumbnail, setMainThumbnail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [videoTitle, setVideoTitle] = useState("")

  const t = translations[currentLang] || translations.en

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setThumbnailSizes(null)
    setMainThumbnail("")
    setVideoTitle("")

    if (!validateYouTubeUrl(url)) {
      setError(t.errors.invalidUrl)
      return
    }

    setLoading(true)
    try {
      const videoId = extractVideoId(url)
      if (!videoId) {
        setError(t.errors.extractId)
        return
      }

      const sizes = {
        maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
        medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      }

      setThumbnailSizes(sizes)
      setMainThumbnail(sizes.maxres)
      setVideoTitle(`${t.videoId}: ${videoId}`)
    } catch (err) {
      setError(t.errors.processing)
    } finally {
      setLoading(false)
    }
  }

  const downloadThumbnail = async (thumbnailUrl: string, filename: string) => {
    try {
      const response = await fetch(thumbnailUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${filename}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Error downloading thumbnail:", err)
    }
  }

  const downloadSizes = [
    { size: "1280x720", url: thumbnailSizes?.maxres, filename: "maxres" },
    { size: "480x360", url: thumbnailSizes?.hq, filename: "hq" },
    { size: "320x180", url: thumbnailSizes?.mq, filename: "mq" },
    { size: "640x480", url: thumbnailSizes?.sd, filename: "sd" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 mt-8 relative">
          {/* Logo positioned top-left on desktop */}
          <div className="absolute top-0 left-0 hidden md:block">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Language Selector positioned top-right */}
          <div className="absolute top-0 right-0 hidden md:block">
            <Select value={currentLang} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40 border-2 hover:border-red-300 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-40">
                {supportedLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mobile logo and language selector */}
          <div className="flex justify-between items-center mb-4 md:hidden">
            <Image
              src="/placeholder.svg?height=32&width=100"
              alt="Logo"
              width={100}
              height={32}
              className="object-contain"
            />
            <Select value={currentLang} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32 border-2 hover:border-red-300 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-32">
                {supportedLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="cursor-pointer">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.shortName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-center mb-4">
            <Youtube className="h-8 w-8 md:h-12 md:w-12 text-red-600 mr-2 md:mr-3" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">{t.title}</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">{t.description}</p>
        </div>

        {/* Main Form */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-lg md:text-xl">
              <Search className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              {t.form.title}
            </CardTitle>
            <CardDescription>{t.form.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="url"
                  placeholder={t.form.placeholder}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  disabled={loading || !url.trim()}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  {loading ? t.form.processing : t.form.button}
                </Button>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {thumbnailSizes && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{t.results.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{videoTitle}</p>
            </div>

            <MainThumbnailViewer
              thumbnailSizes={thumbnailSizes}
              mainThumbnail={mainThumbnail}
              onDownload={downloadThumbnail}
              language={currentLang}
            />

            {/* Download by Size Section */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold text-gray-900">{t.downloadBySize.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {downloadSizes.map((item) => (
                    <Button
                      key={item.size}
                      variant="outline"
                      className="h-12 flex items-center justify-center gap-2 border-2 hover:border-red-300 hover:bg-red-50 transition-all bg-transparent"
                      onClick={() => item.url && downloadThumbnail(item.url, `youtube-thumbnail-${item.filename}`)}
                      disabled={!item.url}
                    >
                      <Download className="h-4 w-4" />
                      <span className="font-medium">{item.size}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Thumbnail Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Pictures */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.additionalTypes.profile}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={thumbnailSizes.default || "/placeholder.svg"}
                        alt="Profile thumbnail"
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-gray-600 mb-2">120x120</p>
                      <Button
                        size="sm"
                        onClick={() => downloadThumbnail(thumbnailSizes.default, "youtube-profile-120x120")}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        {t.thumbnails.download}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cover Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.additionalTypes.cover}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={thumbnailSizes.maxres || "/placeholder.svg"}
                      alt="Cover thumbnail"
                      width={320}
                      height={180}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">1280x720</p>
                    <Button
                      size="sm"
                      onClick={() => downloadThumbnail(thumbnailSizes.maxres, "youtube-cover-1280x720")}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {t.thumbnails.download}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>{t.footer.copyright}</p>
            <p className="mt-2 text-sm">{t.footer.disclaimer}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
