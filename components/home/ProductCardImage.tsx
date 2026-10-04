'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductCardImageProps {
  src: string
  productUrl?: string
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}

export default function ProductCardImage({ src, productUrl, alt, sizes, priority = false, className }: ProductCardImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [fallbackRequested, setFallbackRequested] = useState(false)

  const recoverStoredImage = async () => {
    if (fallbackRequested || !productUrl) return
    setFallbackRequested(true)

    try {
      const response = await fetch(productUrl, { cache: 'no-store' })
      if (!response.ok) return
      const product = await response.json()
      const storedImage = Array.isArray(product.images) ? product.images[0] : ''
      if (typeof storedImage === 'string' && storedImage.length > 0 && storedImage !== imageSrc) {
        setImageSrc(storedImage)
      }
    } catch {
      // Leave the card in its neutral image area if the API is unavailable.
    }
  }

  return (
    <Image
      key={imageSrc}
      src={imageSrc}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={imageSrc.startsWith('data:')}
      onError={recoverStoredImage}
      className={className}
    />
  )
}
