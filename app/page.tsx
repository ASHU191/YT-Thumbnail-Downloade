"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Youtube, AlertCircle, Loader2, Globe } from "lucide-react"
import { extractVideoId, validateYouTubeUrl } from "@/lib/utils"
import MainThumbnailViewer from "@/components/main-thumbnail-viewer"
import Image from "next/image"
import { translations, type Language } from "@/lib/translations"
import { useRouter, usePathname } from "next/navigation"

interface ThumbnailSizes {
  maxres: string
  hq: string
  mq: string
  sd: string
}

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en")
  const [url, setUrl] = useState("")
  const [thumbnailSizes, setThumbnailSizes] = useState<ThumbnailSizes | null>(null)
  const [mainThumbnail, setMainThumbnail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [videoTitle, setVideoTitle] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Redirect to English by default if no language is specified
    if (pathname === "/") {
      router.replace("/en")
    }
  }, [pathname, router])

  const t = translations[language]

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
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger className="w-32">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
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
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger className="w-28">
                <Globe className="h-4 w-4 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="fr">FR</SelectItem>
                <SelectItem value="de">DE</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="pt">PT</SelectItem>
                <SelectItem value="ru">RU</SelectItem>
                <SelectItem value="ja">JA</SelectItem>
                <SelectItem value="ko">KO</SelectItem>
                <SelectItem value="zh">ZH</SelectItem>
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
                <Button type="submit" disabled={loading || !url.trim()} className="w-full sm:w-auto">
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{t.results.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{videoTitle}</p>
            </div>
            <MainThumbnailViewer
              thumbnailSizes={thumbnailSizes}
              mainThumbnail={mainThumbnail}
              onDownload={downloadThumbnail}
              language={language}
            />
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
