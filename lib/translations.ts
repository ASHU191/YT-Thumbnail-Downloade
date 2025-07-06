export type Language = "en" | "es" | "fr" | "de" | "pt"

export const supportedLanguages = [
  { code: "en" as Language, name: "English", shortName: "EN", flag: "🇺🇸" },
  { code: "es" as Language, name: "Español", shortName: "ES", flag: "🇪🇸" },
  { code: "fr" as Language, name: "Français", shortName: "FR", flag: "🇫🇷" },
  { code: "de" as Language, name: "Deutsch", shortName: "DE", flag: "🇩🇪" },
  { code: "pt" as Language, name: "Português", shortName: "PT", flag: "🇵🇹" },
]

export const translations = {
  en: {
    title: "Thumbnail Downloader",
    description: "Get thumbnails from any YouTube video in high resolution. Free, fast and no registration required.",
    form: {
      title: "Enter Video URL",
      description: "Paste the complete YouTube video URL to get its thumbnails",
      placeholder: "https://www.youtube.com/watch?v=...",
      button: "Download Thumbnail",
      processing: "Processing...",
    },
    results: {
      title: "Available Thumbnails",
    },
    thumbnails: {
      maxres: "Maximum Resolution (1280x720)",
      hq: "High Quality (480x360)",
      mq: "Medium Quality (320x180)",
      sd: "Standard Quality (640x480)",
      selected: "Selected",
      download: "Download",
      downloadAll: "Download All",
      noPreview: "Preview not available",
    },
    downloadBySize: {
      title: "Download by Size",
    },
    additionalTypes: {
      profile: "Profile Pictures",
      cover: "Cover Images",
    },
    errors: {
      invalidUrl: "Please enter a valid YouTube URL",
      extractId: "Could not extract video ID from the provided URL",
      processing: "An error occurred while processing the URL. Please try again.",
    },
    videoId: "Video ID",
    footer: {
      copyright: "© 2025 YouTube Thumbnail Downloader. Developed by Muhammad Arsalan.",
      disclaimer: "This tool is independent and not affiliated with YouTube or Google.",
    },
  },
  es: {
    title: "Descargador de Miniaturas",
    description:
      "Obtén miniaturas de cualquier video de YouTube en alta resolución. Gratis, rápido y sin necesidad de registro.",
    form: {
      title: "Ingresa la URL del Video",
      description: "Pega la URL completa del video de YouTube para obtener sus miniaturas",
      placeholder: "https://www.youtube.com/watch?v=...",
      button: "Descargar Miniatura",
      processing: "Procesando...",
    },
    results: {
      title: "Miniaturas Disponibles",
    },
    thumbnails: {
      maxres: "Máxima Resolución (1280x720)",
      hq: "Alta Calidad (480x360)",
      mq: "Calidad Media (320x180)",
      sd: "Calidad Estándar (640x480)",
      selected: "Seleccionado",
      download: "Descargar",
      downloadAll: "Descargar Todo",
      noPreview: "Vista previa no disponible",
    },
    downloadBySize: {
      title: "Descargar por Tamaño",
    },
    additionalTypes: {
      profile: "Fotos de Perfil",
      cover: "Imágenes de Portada",
    },
    errors: {
      invalidUrl: "Por favor, ingresa una URL válida de YouTube",
      extractId: "No se pudo extraer el ID del video de la URL proporcionada",
      processing: "Ocurrió un error al procesar la URL. Por favor, inténtalo de nuevo.",
    },
    videoId: "ID del Video",
    footer: {
      copyright: "© 2025 Descargador de Miniaturas de YouTube. Desarrollado por Muhammad Arsalan.",
      disclaimer: "Esta herramienta es independiente y no está afiliada con YouTube o Google.",
    },
  },
  fr: {
    title: "Téléchargeur de Miniatures",
    description:
      "Obtenez des miniatures de n'importe quelle vidéo YouTube en haute résolution. Gratuit, rapide et sans inscription requise.",
    form: {
      title: "Entrez l'URL de la Vidéo",
      description: "Collez l'URL complète de la vidéo YouTube pour obtenir ses miniatures",
      placeholder: "https://www.youtube.com/watch?v=...",
      button: "Télécharger la Miniature",
      processing: "Traitement...",
    },
    results: {
      title: "Miniatures Disponibles",
    },
    thumbnails: {
      maxres: "Résolution Maximale (1280x720)",
      hq: "Haute Qualité (480x360)",
      mq: "Qualité Moyenne (320x180)",
      sd: "Qualité Standard (640x480)",
      selected: "Sélectionné",
      download: "Télécharger",
      downloadAll: "Tout Télécharger",
      noPreview: "Aperçu non disponible",
    },
    downloadBySize: {
      title: "Télécharger par Taille",
    },
    additionalTypes: {
      profile: "Photos de Profil",
      cover: "Images de Couverture",
    },
    errors: {
      invalidUrl: "Veuillez entrer une URL YouTube valide",
      extractId: "Impossible d'extraire l'ID de la vidéo à partir de l'URL fournie",
      processing: "Une erreur s'est produite lors du traitement de l'URL. Veuillez réessayer.",
    },
    videoId: "ID de la Vidéo",
    footer: {
      copyright: "© 2025 Téléchargeur de Miniatures YouTube. Développé par Muhammad Arsalan.",
      disclaimer: "Cet outil est indépendant et n'est pas affilié à YouTube ou Google.",
    },
  },
  de: {
    title: "Thumbnail-Downloader",
    description:
      "Holen Sie sich Thumbnails von jedem YouTube-Video in hoher Auflösung. Kostenlos, schnell und ohne Registrierung erforderlich.",
    form: {
      title: "Video-URL eingeben",
      description: "Fügen Sie die vollständige YouTube-Video-URL ein, um ihre Thumbnails zu erhalten",
      placeholder: "https://www.youtube.com/watch?v=...",
      button: "Thumbnail herunterladen",
      processing: "Verarbeitung...",
    },
    results: {
      title: "Verfügbare Thumbnails",
    },
    thumbnails: {
      maxres: "Maximale Auflösung (1280x720)",
      hq: "Hohe Qualität (480x360)",
      mq: "Mittlere Qualität (320x180)",
      sd: "Standard-Qualität (640x480)",
      selected: "Ausgewählt",
      download: "Herunterladen",
      downloadAll: "Alle herunterladen",
      noPreview: "Vorschau nicht verfügbar",
    },
    downloadBySize: {
      title: "Nach Größe herunterladen",
    },
    additionalTypes: {
      profile: "Profilbilder",
      cover: "Titelbilder",
    },
    errors: {
      invalidUrl: "Bitte geben Sie eine gültige YouTube-URL ein",
      extractId: "Video-ID konnte nicht aus der angegebenen URL extrahiert werden",
      processing: "Beim Verarbeiten der URL ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
    },
    videoId: "Video-ID",
    footer: {
      copyright: "© 2025 YouTube Thumbnail-Downloader. Entwickelt von Muhammad Arsalan.",
      disclaimer: "Dieses Tool ist unabhängig und nicht mit YouTube oder Google verbunden.",
    },
  },
  pt: {
    title: "Baixador de Miniaturas",
    description:
      "Obtenha miniaturas de qualquer vídeo do YouTube em alta resolução. Gratuito, rápido e sem necessidade de registro.",
    form: {
      title: "Digite a URL do Vídeo",
      description: "Cole a URL completa do vídeo do YouTube para obter suas miniaturas",
      placeholder: "https://www.youtube.com/watch?v=...",
      button: "Baixar Miniatura",
      processing: "Processando...",
    },
    results: {
      title: "Miniaturas Disponíveis",
    },
    thumbnails: {
      maxres: "Resolução Máxima (1280x720)",
      hq: "Alta Qualidade (480x360)",
      mq: "Qualidade Média (320x180)",
      sd: "Qualidade Padrão (640x480)",
      selected: "Selecionado",
      download: "Baixar",
      downloadAll: "Baixar Tudo",
      noPreview: "Visualização não disponível",
    },
    downloadBySize: {
      title: "Baixar por Tamanho",
    },
    additionalTypes: {
      profile: "Fotos de Perfil",
      cover: "Imagens de Capa",
    },
    errors: {
      invalidUrl: "Por favor, digite uma URL válida do YouTube",
      extractId: "Não foi possível extrair o ID do vídeo da URL fornecida",
      processing: "Ocorreu um erro ao processar a URL. Tente novamente.",
    },
    videoId: "ID do Vídeo",
    footer: {
      copyright: "© 2025 Baixador de Miniaturas do YouTube. Desenvolvido por Muhammad Arsalan.",
      disclaimer: "Esta ferramenta é independente e não é afiliada ao YouTube ou Google.",
    },
  },
}
