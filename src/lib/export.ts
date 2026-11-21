import { toDataURL } from 'energy-label'

// SVG user units are CSS pixels (96 DPI); export PNGs at print resolution
const PNG_SCALE = 300 / 96

export async function svgToPngBlob(
  svgString: string,
  scale = PNG_SCALE
): Promise<Blob> {
  const image = new Image()
  image.src = toDataURL(svgString)
  await image.decode()

  const canvas = document.createElement('canvas')
  canvas.width = Math.round(image.naturalWidth * scale)
  canvas.height = Math.round(image.naturalHeight * scale)

  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas 2D context is not available')
  context.drawImage(image, 0, 0, canvas.width, canvas.height)

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error('Could not export the PNG')),
      'image/png'
    )
  )
}

// energy-label's download() appends its link to document.body, so preact-iso's
// document-level click handler treats it as navigation and tries to pushState
// the blob: URL. A detached link's click doesn't bubble to the router
export function downloadSvg(svgString: string, filename: string) {
  downloadBlob(new Blob([svgString], { type: 'image/svg+xml' }), filename)
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
