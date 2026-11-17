import {
  type NavigationState,
  setState,
  useNavigationStore
} from '../lib/useNavigationStore'
import { cx } from '../lib/utils'

const TABS: { tab: NavigationState['tab']; label: string }[] = [
  { tab: 'edit', label: 'Properties' },
  { tab: 'code', label: 'Code' }
]

export default function PanelTabs() {
  const activeTab = useNavigationStore((state) => state.tab)

  return (
    <div role="tablist" class="px-2 pb-2 flex gap-1">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.tab

        return (
          <button
            key={tab.tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setState({ tab: tab.tab })}
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
