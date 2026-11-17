import { REGULATIONS } from '../lib/constants'
import {
  type ResizableSidebarProps,
  withResizableSidebar
} from '../lib/resizable-sidebar'
import { generateTestData } from '../lib/testData'
import {
  type ExportFormat,
  useEnergyLabelStore
} from '../lib/useEnergyLabelStore'
import { useNavigationStore } from '../lib/useNavigationStore'
import { getState, useSettingsStore } from '../lib/useSettingsStore'
import { getLabelName, updateAndApplySettings } from '../lib/utils'
import CodePanel from './CodePanel'
import DynamicInputList from './InputList'
import PropertiesActions from './PropiertiesActions'
import Select from './Select'

const EXPORT_FORMAT_OPTIONS = [
  { value: 'svg', label: 'SVG' },
  { value: 'png', label: 'PNG' }
]

function PropertiesPanel(_: ResizableSidebarProps) {
  const template = useEnergyLabelStore((state) => state.template)
  const templateData = useEnergyLabelStore(
    (state) => state.data?.[state.template]
  )
  const setData = useEnergyLabelStore((state) => state.setData)
  const download = useEnergyLabelStore((state) => state.download)
  const exportFormat = useSettingsStore((state) => state.exportFormat)
  const panel = useNavigationStore((state) => state.panel)
  const labelName = getLabelName(template, templateData ?? {})

  const { name: templateTitle, regulationNumber } = REGULATIONS[template!]

  return (
    <div class="panel relative flex-1 w-full">
      <div class="p-2 flex items-center justify-between">
        <h2 class="px-1 font-semibold truncate">{templateTitle}</h2>
        <PropertiesActions />
      </div>

      {panel === 'code' ? (
        <CodePanel />
      ) : (
        <>
          <div class="px-2 overflow-auto">
            {regulationNumber && (
              <a
                href={`http://data.europa.eu/eli/reg_del/${regulationNumber}/oj`}
                class="-mx-1 mb-4 button text-xs text-neutral-500 dark:text-slate-500 hover:underline inline-flex items-center gap-1 self-start"
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
              values={templateData ?? {}}
              setValues={setData}
            />
          </div>
          <div class="p-2 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setData(generateTestData(template))}
              class="button text-xs flex items-center gap-1"
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
        </>
      )}
      <div class="px-2 pt-2 pb-4 bg-[var(--panel-background-color)]/80 border-t backdrop-blur-lg sticky bottom-0">
        <h2 class="px-1 mb-4 text-sm font-medium">Export</h2>
        <div class="flex">
          <button
            type="button"
            onClick={() => download(exportFormat).catch(console.error)}
            title={labelName}
            class="flex-1 min-w-0 p-2 rounded-[var(--border-radius)] rounded-r-none bg-blue-500 dark:bg-blue-800 hover:bg-blue-600 hover:dark:bg-blue-900 active:bg-blue-400 active:dark:bg-blue-700 font-semibold text-neutral-50 dark:text-neutral-200 cursor-pointer truncate"
          >
            Download {labelName}
          </button>
          <Select
            value={exportFormat}
            onChange={(event) =>
              updateAndApplySettings({
                exportFormat: event.currentTarget.value as ExportFormat
              })
            }
            options={EXPORT_FORMAT_OPTIONS}
            selectClassName="h-full !py-2 !px-3 rounded-l-none border-transparent border-l-blue-300/60 dark:border-l-blue-950 bg-blue-500 dark:bg-blue-800 hover:bg-blue-600 hover:dark:bg-blue-900 font-semibold cursor-pointer [&_selectedcontent]:text-neutral-50 dark:[&_selectedcontent]:text-neutral-200 [&::picker-icon]:[--icon-color:var(--color-neutral-50)]! dark:[&::picker-icon]:[--icon-color:var(--color-neutral-200)]!"
          />
        </div>
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
