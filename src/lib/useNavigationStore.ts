import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface NavigationState {
  tab: 'edit' | 'code'
  // Search overlays the active tab, so closing it returns to the same tab
  isSearchOpen: boolean
}

const INITIAL_STATE: NavigationState = {
  tab: 'edit',
  isSearchOpen: false
}

export const useNavigationStore = create<NavigationState>()(
  persist(() => INITIAL_STATE, {
    name: 'navigation',
    version: 1,
    // v0 kept the tab and the search in a single `panel` field
    migrate: (persisted, version) => {
      if (version === 0) {
        const { panel } = persisted as { panel?: string }
        return {
          tab: panel === 'code' ? 'code' : 'edit',
          isSearchOpen: panel === 'search'
        }
      }
      return persisted as NavigationState
    }
  })
)
export const { getState, setState } = useNavigationStore
