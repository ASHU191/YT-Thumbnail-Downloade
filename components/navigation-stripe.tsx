"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Youtube, User, ImageIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { translations, type Language, supportedLanguages } from "@/lib/translations"
import Image from "next/image"

interface NavigationStripeProps {
  currentLang: Language
}

export default function NavigationStripe({ currentLang }: NavigationStripeProps) {
  const pathname = usePathname()
  const router = useRouter()
  const t = translations[currentLang]

  const handleLanguageChange = (newLang: Language) => {
    const currentPath = pathname.split("/").slice(2).join("/") // Remove language part
    router.push(`/${newLang}${currentPath ? `/${currentPath}` : ""}`)
  }

  const navigationItems = [
    {
      href: `/${currentLang}`,
      icon: Youtube,
      label: t.nav.thumbnailDownloader,
      color: "bg-red-500 hover:bg-red-600",
      isActive: pathname === `/${currentLang}` || pathname === `/${currentLang}/`,
    },
    {
      href: `/${currentLang}/profile-pic`,
      icon: User,
      label: t.nav.profilePicDownloader,
      color: "bg-blue-500 hover:bg-blue-600",
      isActive: pathname.includes("/profile-pic"),
    },
    {
      href: `/${currentLang}/banner`,
      icon: ImageIcon,
      label: t.nav.bannerDownloader,
      color: "bg-purple-500 hover:bg-purple-600",
      isActive: pathname.includes("/banner"),
    },
  ]

  return (
    <div className="bg-white border-b-2 border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-28 h-8 relative overflow-hidden">
              <Image
                src="/placeholder.svg?height=32&width=112"
                alt="Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1 flex-1 justify-center">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all
                    ${
                      item.isActive
                        ? `${item.color} text-white shadow-md`
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Language Selector */}
          <div className="flex items-center flex-shrink-0">
            <Select value={currentLang} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32 border-2 hover:border-red-300 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-32">
                {supportedLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span className="font-medium text-sm">{lang.shortName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
