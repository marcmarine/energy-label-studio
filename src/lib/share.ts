import { createEnergyLabel, type TemplatesData } from 'energy-label'
import type { ProductName } from './types'

export const SHARE_PARAM = 'd'

type LabelData = Partial<TemplatesData[ProductName]>

// base64url of the UTF-8 JSON, so it's safe in a URL and keeps non-ASCII text
function encode(data: LabelData) {
  const bytes = new TextEncoder().encode(JSON.stringify(data))
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function decode(value: string): unknown {
  const binary = atob(value.replace(/-/g, '+').replace(/_/g, '/'))
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  return JSON.parse(new TextDecoder().decode(bytes))
}

export function getShareUrl(template: ProductName, data: LabelData) {
  const url = new URL(`/${template}`, window.location.origin)
  url.searchParams.set(SHARE_PARAM, encode(data))

  return url.toString()
}

// Returns null when the value is malformed or the label rejects its data
export function parseSharedData(
  template: ProductName,
  value: string
): LabelData | null {
  try {
    const data = decode(value)
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      throw new Error('Shared data is not an object')
    }

    // The label validates its data when rendering, not when created
    createEnergyLabel(template, data as LabelData).toString()
    return data as LabelData
  } catch (error) {
    console.warn('Ignoring invalid shared label data:', error)
    return null
  }
}
