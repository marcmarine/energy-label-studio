import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'system' | 'light' | 'dark'

export interface SettingsState {
  theme: Theme
  gaps: boolean
  rounded: boolean
  leftPanelWidth: number
  propsPanelWidth: number
}

const INITIAL_STATE: SettingsState = {
  theme: 'system',
  gaps: true,
  rounded: true,
  leftPanelWidth: 200,
  propsPanelWidth: 400
}

export const useSettingsStore = create<SettingsState>()(
  persist(() => INITIAL_STATE, {
    name: 'config'
  })
)
export const { getState, setState } = useSettingsStore
