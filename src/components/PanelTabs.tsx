import {
  type NavigationState,
  setState,
  useNavigationStore
} from '../lib/useNavigationStore'
import { cx } from '../lib/utils'

const TABS: { panel: NavigationState['panel']; label: string }[] = [
  { panel: 'edit', label: 'Properties' },
  { panel: 'code', label: 'Code' }
]

export default function PanelTabs() {
  const panel = useNavigationStore((state) => state.panel)

  return (
    <div role="tablist" class="px-2 pb-2 flex gap-1">
      {TABS.map((tab) => {
        const isActive = panel === tab.panel

        return (
          <button
            key={tab.panel}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setState({ panel: tab.panel })}
            class={cx(
              'button text-sm font-medium',
              isActive
                ? 'bg-neutral-100 dark:bg-slate-700/40'
                : 'text-neutral-500 dark:text-slate-500'
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
