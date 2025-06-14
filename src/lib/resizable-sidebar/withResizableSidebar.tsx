import { ComponentType, JSX, createElement } from 'preact'
import useResizableSidebar, { type ResizableSidebarOptions } from './useResizableSidebar'
import ResizeHandle from './ResizeHandle'

export interface ResizableSidebarProps {
  isCollapsed: boolean
}

export default function withResizableSidebar<P extends ResizableSidebarProps>(WrappedComponent: ComponentType<P>, resizeOptions?: ResizableSidebarOptions) {
  return function ResizableSidebarWrapper(props: Omit<P, keyof ResizableSidebarProps>): JSX.Element {
    const {
      ref: { sidebar, resizer },
      isResizing,
      isCollapsed
    } = useResizableSidebar(resizeOptions)

    return (
      <div class={['flex', resizeOptions?.direction === 'left' ? 'flex-row-reverse' : 'flex-row'].join(' ')}>
        <div ref={sidebar} class="flex overflow-hidden" style={{ width: isCollapsed ? 52 : resizeOptions?.minWidth }}>
          {/* Using createElement to avoid TS2786 - Preact ComponentType return type mismatch with JSX */}
          {createElement(WrappedComponent, { ...(props as P), isCollapsed })}
        </div>
        {/* Same typing issue with ResizeHandle */}
        {createElement(ResizeHandle, { ref: resizer, isResizing })}
      </div>
    )
  }
}
