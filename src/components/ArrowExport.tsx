import { type EnergyClass, renderClassArrow } from 'energy-label'
import { downloadBlob, downloadSvg, svgToPngBlob } from '../lib/export'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'
import {
  type ArrowOrientation,
  useSettingsStore
} from '../lib/useSettingsStore'
import { cx, getLabelName, updateAndApplySettings } from '../lib/utils'
import EnergyLabelArrow from './EnergyLabelArrow'

const ORIENTATIONS: { value: ArrowOrientation; label: string }[] = [
  { value: 'LEFT', label: 'Left' },
  { value: 'RIGHT', label: 'Right' }
]

// The class arrow shown next to the price in online sales. It isn't a label
// of its own: it takes the energy class from the label being edited
export default function ArrowExport() {
  const template = useEnergyLabelStore((state) => state.template)
  const templateData = useEnergyLabelStore(
    (state) => state.data?.[state.template]
  )
  const exportFormat = useSettingsStore((state) => state.exportFormat)
  const orientation = useSettingsStore((state) => state.arrowOrientation)

  const energyClass = (templateData as { energyClass?: EnergyClass })
    ?.energyClass
  const filename = `${getLabelName(template, templateData ?? {})}-arrow.${exportFormat}`

  async function handleDownload() {
    if (!energyClass) return
    const svg = renderClassArrow(energyClass, {
      labelOrientation: orientation
    })

    if (exportFormat === 'png') downloadBlob(await svgToPngBlob(svg), filename)
    else downloadSvg(svg, filename)
  }

  return (
    <div class="mt-3 px-1 flex items-center gap-2">
      <span class="flex-1 text-xs text-neutral-600 dark:text-slate-400 truncate">
        Class arrow
      </span>
      <div class="h-6 w-12 flex items-center justify-center">
        {energyClass ? (
          <EnergyLabelArrow
            energyClass={energyClass}
            labelOrientation={orientation}
            className="h-full"
          />
        ) : (
          <span class="text-[10px] text-neutral-400 dark:text-slate-500">
            No class
          </span>
        )}
      </div>
      <fieldset
        aria-label="Arrow orientation"
        class="flex m-0 border-0 p-0.5 rounded-[var(--border-radius)] bg-neutral-100 dark:bg-slate-700/40"
      >
        {ORIENTATIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={orientation === option.value}
            onClick={() =>
              updateAndApplySettings({ arrowOrientation: option.value })
            }
            class={cx(
              'px-2 py-0.5 text-xs font-medium rounded-[calc(var(--border-radius)-2px)] cursor-pointer',
              orientation === option.value
                ? 'bg-[var(--panel-background-color)] shadow-xs'
                : 'text-neutral-600 dark:text-slate-400'
            )}
          >
            {option.label}
          </button>
        ))}
      </fieldset>
      <button
        type="button"
        onClick={() => handleDownload().catch(console.error)}
        disabled={!energyClass}
        title={
          energyClass ? `Download ${filename}` : 'Set an energy class first'
        }
        class="button disabled:opacity-40 disabled:pointer-events-none"
      >
        <svg
          role="img"
          aria-label="Download arrow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="size-4"
        >
          <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
          <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
        </svg>
      </button>
    </div>
  )
}
