import { REGULATIONS } from '../lib/constants'
import {
  type ResizableSidebarProps,
  withResizableSidebar
} from '../lib/resizable-sidebar'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'
import { useNavigationStore } from '../lib/useNavigationStore'
import { getState } from '../lib/useSettingsStore'
import { cx, updateAndApplySettings } from '../lib/utils'
import DynamicInputList from './InputList'
import PropertiesActions from './PropiertiesActions'
import SearchPanel from './SearchPanel'

function PropertiesPanel(_: ResizableSidebarProps) {
  const { download, setData, template, data } = useEnergyLabelStore()
  const { panel } = useNavigationStore()

  const isSearchPanelActive = panel === 'search'
  const { name: templateTitle, regulationNumber } = REGULATIONS[template!]

  return (
    <div class="panel relative flex-1 w-full">
      <PropertiesActions className="absolute top-3 right-3 z-30" />
      <div
        class={cx(
          'px-1 py-2 sticky z-20 top-0 h-12 pointer-events-none',
          !isSearchPanelActive &&
            ' bg-[var(--panel-background-color)]/90 backdrop-blur-lg'
        )}
      >
        <h2
          class={cx(
            'px-2 w-[72%] absolute left-0.5 font-semibold truncate transition-all origin-left',
            isSearchPanelActive ? ' top-1 z-10 scale-70 ' : 'top-3.5'
          )}
        >
          {templateTitle}
        </h2>
      </div>
      <SearchPanel />
      <div class="p-3 overflow-auto">
        {regulationNumber && (
          <a
            href={`http://data.europa.eu/eli/reg_del/${regulationNumber}/oj`}
            class="-mx-2 mb-4 button text-xs text-neutral-500 dark:text-slate-500 hover:underline inline-flex items-center gap-1 self-start"
            target="_blank"
          >
            Regulation (EU) {regulationNumber}
            <svg
              role="img"
              aria-label="External"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-3"
            >
              <path
                fillRule="evenodd"
                d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        )}
        <DynamicInputList
          template={template!}
          values={data!}
          setValues={setData}
        />
      </div>
      <div class="p-2 flex items-center justify-end">
        <button
          type="button"
          class="button text-xs flex items-center gap-1 opacity-20 pointer-events-none"
        >
          <svg
            role="img"
            aria-label="Random"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-3"
          >
            <path
              fillRule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
              clipRule="evenodd"
            />
          </svg>
          Generate test data
        </button>
      </div>

      <div class="px-3 pt-2 pb-4 bg-[var(--panel-background-color)]/80 border-t border-[var(--panel-border-color)] backdrop-blur-lg sticky bottom-0">
        <h2 class="mb-4 text-sm font-medium">Export</h2>
        <button
          type="button"
          onClick={() => download()}
          class="p-2 w-full rounded-[var(--border-radius)] bg-blue-500 dark:bg-blue-800 hover:bg-blue-600 hover:dark:bg-blue-900 active:bg-blue-400 active:dark:bg-blue-700 font-semibold text-neutral-50 dark:text-neutral-200 cursor-pointer truncate"
        >
          Download the label in SVG
        </button>
      </div>
    </div>
  )
}

export default withResizableSidebar(PropertiesPanel, {
  direction: 'left',
  minWidth: 200,
  maxWidth: 720,
  defaultWidth: getState().propsPanelWidth,
  onResizeEnd: (width) => {
    updateAndApplySettings({ propsPanelWidth: width })
  }
})
