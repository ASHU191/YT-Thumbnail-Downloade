"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Eye } from "lucide-react"
import Image from "next/image"
import { translations, type Language } from "@/lib/translations"

interface ThumbnailSizes {
  maxres: string
  hq: string
  mq: string
  sd: string
  default: string
  medium: string
  high: string
}

interface MainThumbnailViewerProps {
  thumbnailSizes: ThumbnailSizes
  mainThumbnail: string
  onDownload: (url: string, filename: string) => void
  language: Language
}

export default function MainThumbnailViewer({
  thumbnailSizes,
  mainThumbnail,
  onDownload,
  language,
}: MainThumbnailViewerProps) {
  const [selectedThumbnail, setSelectedThumbnail] = useState(mainThumbnail)
  const [imageError, setImageError] = useState(false)

  const t = translations[language]

  const handleImageError = () => {
    setImageError(true)
    // Fallback to high quality if maxres fails
    if (selectedThumbnail === thumbnailSizes.maxres) {
      setSelectedThumbnail(thumbnailSizes.hq)
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Thumbnail Display */}
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
            {!imageError ? (
              <Image
                src={selectedThumbnail || "/placeholder.svg"}
                alt="YouTube Thumbnail"
                fill
                className="object-cover"
                onError={handleImageError}
                crossOrigin="anonymous"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>{t.thumbnails.noPreview}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
