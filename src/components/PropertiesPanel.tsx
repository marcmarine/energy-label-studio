import { REGULATIONS } from '../lib/constants'
import { withResizableSidebar, type ResizableSidebarProps } from '../lib/resizable-sidebar'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'
import { getState } from '../lib/useSettingsStore'
import DynamicInputList from './InputList'

function PropertiesPanel(_: ResizableSidebarProps) {
  const { download, setData, template, data } = useEnergyLabelStore()

  const { name: templateTitle, regulationNumber } = REGULATIONS[template!]

  return (
    <div class="panel relative flex-1 w-full">
      <div class="p-1 flex gap-2 items-center justify-between">
        <h2 class="px-2 font-semibold truncate">{templateTitle}</h2>
        <div class="p-1 flex gap-0.5 rounded">
          <button class="button bg-neutral-100 dark:bg-slate-700/40">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="size-5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </button>
          <button class="button opacity-40 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
          </button>
        </div>
      </div>
      {regulationNumber && (
        <a href={`http://data.europa.eu/eli/reg_del/${regulationNumber}/oj`} class="px-3 mb-2 w-fit text-xs text-neutral-500 dark:text-slate-500 hover:underline flex items-center gap-1" target="_blank">
          Regulation (EU) {regulationNumber}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3">
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
      <div class="px-3 py-2 overflow-auto">
        <DynamicInputList template={template!} values={data!} setValues={setData} />
      </div>
      <div class="px-1 py-2 flex justify-end">
        <button class="button text-xs flex items-center gap-1 opacity-20 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3">
            <path
              fillRule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
              clipRule="evenodd"
            />
          </svg>
          Generate random data
        </button>
      </div>
      <div class="px-3 pt-2 pb-4 bg-[var(--panel-background-color)] border-t border-[var(--panel-border-color)] backdrop-blur-lg sticky bottom-0">
        <h2 class="mb-4 text-sm font-medium">Export</h2>
        <button
          onClick={() => download()}
          class="p-2 w-full rounded-[var(--border-radius)] bg-blue-500 dark:bg-blue-800 hover:bg-blue-600 hover:dark:bg-blue-900 active:bg-blue-400 active:dark:bg-blue-700 font-semibold text-neutral-50 dark:text-neutral-200 cursor-pointer truncate"
        >
          Download the label in SVG
        </button>
      </div>
    </div>
  )
}

export default withResizableSidebar(PropertiesPanel, { direction: 'left', minWidth: 200, maxWidth: 520, defaultWidth: getState().propsPanelWidth })
