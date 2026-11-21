import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CodeVariant, PackageManager } from './codeSnippet'
import type { ExportFormat } from './useEnergyLabelStore'

export type Theme = 'system' | 'light' | 'dark'
export type ArrowOrientation = 'LEFT' | 'RIGHT'

export interface SettingsState {
  theme: Theme
  exportFormat: ExportFormat
  arrowOrientation: ArrowOrientation
  codeVariant: CodeVariant
  packageManager: PackageManager
  gaps: boolean
  rounded: boolean
  leftPanelWidth: number
  propsPanelWidth: number
  isLeftPanelCollapsed: boolean
}

const INITIAL_STATE: SettingsState = {
  theme: 'system',
  exportFormat: 'svg',
  arrowOrientation: 'RIGHT',
  codeVariant: 'React',
  packageManager: 'npm',
  gaps: true,
  rounded: true,
  leftPanelWidth: 200,
  propsPanelWidth: 400,
  isLeftPanelCollapsed: false
}

export const useSettingsStore = create<SettingsState>()(
  persist(() => INITIAL_STATE, {
    name: 'config'
  })
)
export const { getState, setState } = useSettingsStore
