import { ComponentType, JSX, createElement } from 'preact'
import useResizableSidebar, { type ResizableSidebarOptions } from './useResizableSidebar'
import ResizeHandle from './ResizeHandle'
import { useMemo } from 'preact/hooks'

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

    const isLeftPanel = useMemo(() => resizeOptions?.direction === 'left', [])

    return (
      <div style={{ display: 'flex', flexDirection: isLeftPanel ? 'row-reverse' : 'row' }}>
        <div ref={sidebar} style={{ display: 'flex', width: isCollapsed ? 0 : resizeOptions?.defaultWidth }}>
          {/* Using createElement to avoid TS2786 - Preact ComponentType return type mismatch with JSX */}
          {createElement(WrappedComponent, { ...(props as P), isCollapsed })}
        </div>
        {/* Same typing issue with ResizeHandle */}
        {createElement(ResizeHandle, { ref: resizer, isResizing })}
      </div>
    )
  }
}
