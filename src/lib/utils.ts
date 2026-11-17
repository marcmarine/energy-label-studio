import {
  getState as getSettingsState,
  type SettingsState,
  setState,
  type Theme
} from './useSettingsStore'

export function cx(...args: unknown[]) {
  return args
    .flat()
    .filter((item) => typeof item === 'string')
    .join(' ')
    .trim()
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

interface LabelNameData {
  supplierOrTrademark?: string
  modelIdentifier?: string
  flagOrigin?: string
}

// e.g. "acme-x1-eu", or "smartphones-eu" without supplier or model
export function getLabelName(template: string, data: LabelNameData) {
  const { supplierOrTrademark, modelIdentifier, flagOrigin = 'EU' } = data
  const product = [supplierOrTrademark, modelIdentifier]
    .map((part) => slugify(part ?? ''))
    .filter(Boolean)

  return [...(product.length ? product : [template]), flagOrigin]
    .map(slugify)
    .join('-')
}

export function getLabelFilename(
  template: string,
  data: LabelNameData,
  extension: string
) {
  return `${getLabelName(template, data)}.${extension}`
}

export function navigateWithParams(to: string) {
  const currentUrl = new URL(window.location.href)
  const params = currentUrl.search

  return `${to}${params}`
}

function getTheme(theme: Theme): string {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return theme
}

export const applySettingsToDOM = (state: SettingsState) => {
  const { theme, gaps, rounded } = state

  document.documentElement.setAttribute('data-theme', getTheme(theme))
  document.documentElement.style.setProperty(
    '--layout-gap',
    gaps ? '10px' : '0px'
  )
  document.documentElement.style.setProperty(
    '--layout-border-radius',
    rounded ? '10px' : '0px'
  )
}

export const updateAndApplySettings = (updates: Partial<SettingsState>) => {
  setState(updates)

  applySettingsToDOM(getSettingsState())
}

export const initializeSettings = () => {
  const state = getSettingsState()

  applySettingsToDOM(state)
}
