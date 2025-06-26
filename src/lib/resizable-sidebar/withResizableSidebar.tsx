import { ComponentType, JSX, createElement } from 'preact'
import useResizableSidebar, { type ResizableSidebarOptions } from './useResizableSidebar'
import ResizeHandle from './ResizeHandle'
import { useMemo } from 'preact/hooks'

export interface ResizableSidebarProps {
  isCollapsed: boolean
  panelWidth: number
}

export default function withResizableSidebar<P extends ResizableSidebarProps>(WrappedComponent: ComponentType<P>, resizeOptions?: ResizableSidebarOptions & { collapsedWidth?: number }) {
  return function ResizableSidebarWrapper(props: Omit<P, keyof ResizableSidebarProps>): JSX.Element {
    const { direction, collapsedWidth } = resizeOptions ?? {}
    const {
      ref: { sidebar, resizer },
      isResizing,
      isCollapsed,
      width
    } = useResizableSidebar(resizeOptions)

    const isLeftPanel = useMemo(() => direction === 'left', [])

    return (
      <div style={{ display: 'flex', flexDirection: isLeftPanel ? 'row-reverse' : 'row' }}>
        <div ref={sidebar} style={{ display: 'flex', width: isCollapsed ? collapsedWidth : width }}>
          {/* Using createElement to avoid TS2786 - Preact ComponentType return type mismatch with JSX */}
          {createElement(WrappedComponent, { ...(props as P), isCollapsed, panelWidth: width })}
        </div>
        {/* Same typing issue with ResizeHandle */}
        {createElement(ResizeHandle, { ref: resizer, isResizing })}
      </div>
    )
  }
}
