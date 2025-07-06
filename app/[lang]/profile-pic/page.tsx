"use client"

import type React from "react"
import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, User, AlertCircle, Loader2, Download } from "lucide-react"
import { extractVideoId, validateYouTubeUrl } from "@/lib/utils"
import NavigationStripe from "@/components/navigation-stripe"
import Image from "next/image"
import { translations, type Language } from "@/lib/translations"

export default function ProfilePicPage() {
  const params = useParams()
  const currentLang = (params?.lang as Language) || "en"

  const [url, setUrl] = useState("")
  const [profilePics, setProfilePics] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [videoTitle, setVideoTitle] = useState("")

  const t = translations[currentLang] || translations.en

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setProfilePics(null)
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

      const pics = [
        `https://img.youtube.com/vi/${videoId}/default.jpg`, // 120x90
        `https://img.youtube.com/vi/${videoId}/1.jpg`, // 120x90
        `https://img.youtube.com/vi/${videoId}/2.jpg`, // 120x90
        `https://img.youtube.com/vi/${videoId}/3.jpg`, // 120x90
      ]

      setProfilePics(pics)
      setVideoTitle(`${t.videoId}: ${videoId}`)
    } catch (err) {
      setError(t.errors.processing)
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl)
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
      console.error("Error downloading image:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <NavigationStripe currentLang={currentLang} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <div className="flex items-center justify-center mb-4">
            <User className="h-8 w-8 md:h-12 md:w-12 text-blue-600 mr-2 md:mr-3" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{t.nav.profilePicDownloader}</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">{t.profilePic.description}</p>
        </div>

        {/* Main Form */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-lg md:text-xl">
              <Search className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              {t.form.title}
            </CardTitle>
            <CardDescription>{t.profilePic.formDescription}</CardDescription>
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
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  {loading ? t.form.processing : t.profilePic.button}
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
        {profilePics && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t.profilePic.resultsTitle}</h2>
              <p className="text-gray-600">{videoTitle}</p>
            </div>

            {/* Profile Pictures Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {profilePics.map((pic, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={pic || "/placeholder.svg"}
                        alt={`Profile picture ${index + 1}`}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-sm text-gray-600 font-medium">120x90</p>
                      <Button
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => downloadImage(pic, `youtube-profile-pic-${index + 1}`)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        {t.thumbnails.download}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Download All Button */}
            <div className="text-center">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 bg-transparent"
                onClick={() => {
                  profilePics.forEach((pic, index) => {
                    setTimeout(() => {
                      downloadImage(pic, `youtube-profile-pic-${index + 1}`)
                    }, index * 200)
                  })
                }}
              >
                <Download className="h-5 w-5 mr-2" />
                {t.thumbnails.downloadAll}
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p>{t.footer.copyright}</p>
            <p className="mt-2 text-sm">{t.footer.disclaimer}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
