import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'system' | 'light' | 'dark'

export interface SettingsState {
  theme: Theme
  gaps: boolean
  rounded: boolean
  leftPanelWidth: number
  propsPanelWidth: number
  isLeftPanelCollapsed: boolean
}

const INITIAL_STATE: SettingsState = {
  theme: 'system',
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
