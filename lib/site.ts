export const SITE_URL = 'https://fusion3dlabs.com'
export const SITE_NAME = 'Fusion3DLabs'
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '916378206112'

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hi Fusion3D Labs! I would like a quote for a custom 3D printing project.'

export function whatsappUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
