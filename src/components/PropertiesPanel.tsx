import { withResizableSidebar, type ResizableSidebarProps } from '../lib/resizable-sidebar'

function PropertiesPanel({ isCollapsed }: ResizableSidebarProps) {
  return (
    <div class="p-2 w-full bg-base-100/20 backdrop-blur-sm border border-base-200/40 rounded-[var(--app-layout-border-radius)]">
      <button class="button text-xs">
        {isCollapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        ) : (
          'Information'
        )}
      </button>
    </div>
  )
}

export default withResizableSidebar(PropertiesPanel, { direction: 'left', minWidth: 200, defaultWidth: 400, collapseAt: 100 })
