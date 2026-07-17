import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MultiSphere Agency',
    short_name: 'MultiSphere',
    description:
      "Agence pluridisciplinaire à Abomey-Calavi, Bénin. Événementiel, communication digitale, développement web & mobile, cybersécurité et gestion administrative.",
    start_url: '/',
    display: 'standalone',
    background_color: '#060b1e',
    theme_color: '#0d6efd',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    categories: ['business', 'productivity'],
    lang: 'fr',
  }
}
