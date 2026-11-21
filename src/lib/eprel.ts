import { PRODUCT_GROUPS } from 'energy-label'
import { useEffect, useState } from 'preact/hooks'
import { useDebounce } from 'use-debounce'
import type { ProductName } from './types'

interface EprelProduct {
  id: string
  productGroup: string
  status: string
  supplierOrTrademark: string
  modelIdentifier: string
  energyClass: string
}

type LookupResult =
  | { kind: 'found'; product: EprelProduct }
  | { kind: 'not-found' }
  | { kind: 'invalid' }
  | { kind: 'error' }

export type EprelStatus =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'match'; product: EprelProduct }
  | { kind: 'mismatch'; product: EprelProduct }
  | { kind: 'other-model'; product: EprelProduct }
  | { kind: 'not-found' }
  | { kind: 'invalid' }
  | { kind: 'error' }

const VALID_ID = /^\d{1,12}$/

// Settled lookups per ID, so switching templates or retyping an ID doesn't
// refetch. Errors aren't cached so they're retried on the next change
const cache = new Map<string, LookupResult>()

async function lookupEprelProduct(
  id: string,
  signal: AbortSignal
): Promise<LookupResult> {
  const cached = cache.get(id)
  if (cached) return cached

  const url = new URL(
    `/product/${encodeURIComponent(id)}`,
    import.meta.env.VITE_API_URL
  )
  const response = await fetch(url.toString(), { signal })

  let result: LookupResult
  if (response.ok) result = { kind: 'found', product: await response.json() }
  else if (response.status === 404) result = { kind: 'not-found' }
  else if (response.status === 400) result = { kind: 'invalid' }
  else return { kind: 'error' }

  cache.set(id, result)
  return result
}

// EPREL data has stray tabs and inconsistent casing ("FRIDGEMASTER\t MCF96E")
function normalize(value: string) {
  return value.replace(/\s+/g, ' ').trim().toLowerCase()
}

// Whether the label's QR code points to the right product: the EPREL ID must
// exist, belong to the template's product group and, once a model is entered,
// be that model. IDs are sequential, so a typo usually lands on a real
// neighbouring product, often from the same supplier
export function useEprelStatus(
  template: ProductName,
  eprelId: string | undefined,
  modelIdentifier: string | undefined
): EprelStatus {
  // Not trimmed: the QR code encodes the value as typed, so a stray space
  // must show as invalid rather than as a match
  const id = eprelId ?? ''
  const [debouncedId] = useDebounce(id, 400)
  const [result, setResult] = useState<{
    id: string
    value: LookupResult
  } | null>(null)

  useEffect(() => {
    if (!debouncedId || !VALID_ID.test(debouncedId)) return

    const controller = new AbortController()
    lookupEprelProduct(debouncedId, controller.signal)
      .then((value) => setResult({ id: debouncedId, value }))
      .catch(() => {
        if (!controller.signal.aborted)
          setResult({ id: debouncedId, value: { kind: 'error' } })
      })

    return () => controller.abort()
  }, [debouncedId])

  if (!id) return { kind: 'idle' }
  if (!VALID_ID.test(id)) return { kind: 'invalid' }
  // Still typing, or the result belongs to a previous ID
  if (id !== debouncedId || result?.id !== id) return { kind: 'loading' }

  const { value } = result
  if (value.kind !== 'found') return value

  const { product } = value
  if (product.productGroup !== PRODUCT_GROUPS[template].urlCode)
    return { kind: 'mismatch', product }
  if (
    modelIdentifier?.trim() &&
    normalize(modelIdentifier) !== normalize(product.modelIdentifier)
  )
    return { kind: 'other-model', product }

  return { kind: 'match', product }
}
