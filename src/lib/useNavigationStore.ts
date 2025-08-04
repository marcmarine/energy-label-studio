import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface NavigationState {
  panel?: 'search' | 'edit' | 'settings'
}

const INITIAL_STATE: NavigationState = {
  panel: 'edit'
}

export const useNavigationStore = create<NavigationState>()(
  persist(() => INITIAL_STATE, {
    name: 'navigation'
  })
)
export const { getState, setState } = useNavigationStore
