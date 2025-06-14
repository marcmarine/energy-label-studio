import { withResizableSidebar, type ResizableSidebarProps } from '../lib/resizable-sidebar'
import InputField from './InputField'
import Select from './Select'

function PropertiesPanel(_: ResizableSidebarProps) {
  return (
    <div class="panel w-full">
      <div class="p-2">
        <button class="button text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </button>
      </div>
      <div class="px-3 py-2">
        <h2 class="mb-4 font-medium">Product information</h2>
        <div class="mb-8 flex gap-2 flex-wrap">
          <InputField label="Supplier's Name" />
          <InputField label="Model Identifier" />
          <InputField label="EPREL ID" />
        </div>
        <h2 class="mb-4 font-medium">Efficiency details</h2>
        <div class="mb-8 flex gap-2 flex-wrap">
          <Select options={[{ value: 'A', label: 'A' }]} label="Efficiency class" />
          <InputField label="Consumption" />
          <InputField label="Number of wine bottles" type="number" />
          <InputField label="Noise class" />
        </div>
      </div>
      <div class="px-3 py-2">
        <h2 class="mb-4 font-medium">Export</h2>
        <button class="p-2 w-full bg-blue-500 dark:bg-blue-600 rounded-lg font-semibold text-neutral-200 cursor-pointer">Download Energy Label (SVG)</button>
      </div>
    </div>
  )
}

export default withResizableSidebar(PropertiesPanel, { direction: 'left', minWidth: 200, maxWidth: 400, defaultWidth: 300 })
