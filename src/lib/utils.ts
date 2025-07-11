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
