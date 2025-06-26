import type { RefObject } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

export type ResizeDirection = 'left' | 'right'

interface State {
  isCollapsed: boolean
}

export interface ResizableSidebarOptions {
  direction?: ResizeDirection
  minWidth?: number
  maxWidth?: number
  defaultWidth?: number
  collapseAt?: number
  onResizeEnd?: (width: number) => void
  initialState?: State
}

interface UseSidebarResizeReturn {
  ref: {
    sidebar: RefObject<HTMLDivElement>
    resizer: RefObject<HTMLDivElement>
  }
  isResizing: boolean
  isCollapsed: boolean
  width: number
}

export default function useResizableSidebar({
  direction = 'right',
  minWidth = 48,
  maxWidth = 500,
  defaultWidth,
  collapseAt,
  onResizeEnd,
  initialState
}: ResizableSidebarOptions = {}): UseSidebarResizeReturn {
  const initialWidth = defaultWidth ?? minWidth
  const [isResizing, setIsResizing] = useState(false)
  const [isCollapsed, setCollapsed] = useState(
    initialState?.isCollapsed || false
  )
  const [width, setWidth] = useState(initialWidth)

  const sidebarRef = useRef<HTMLDivElement>(null)
  const resizerRef = useRef<HTMLDivElement>(null)

  const applyWidth = useCallback((newWidth: number) => {
    const sidebar = sidebarRef.current
    if (sidebar) {
      sidebar.style.width = `${newWidth}px`
      setWidth(newWidth)
    }
  }, [])

  useEffect(() => {
    const sidebar = sidebarRef.current
    const resizer = resizerRef.current
    if (!sidebar || !resizer) return

    const getNewWidth = (event: MouseEvent) => {
      const rect = sidebar.getBoundingClientRect()
      return direction === 'right'
        ? event.clientX - rect.left
        : rect.right - event.clientX
    }

    const checkCollapse = (event: MouseEvent) => {
      if (!collapseAt) return false
      return direction === 'right'
        ? event.clientX <= collapseAt
        : event.clientX >= window.innerWidth - collapseAt
    }

    const onMouseMove = (event: MouseEvent) => {
      const newWidth = getNewWidth(event)
      const collapsed = checkCollapse(event)

      setCollapsed(collapsed)

      if (collapsed) {
        sidebar.style.transition = 'all 80ms'
        return
      }

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        sidebar.style.transition = ''
        applyWidth(newWidth)
      }
    }

    const onMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''

      const finalWidth = sidebarRef.current?.getBoundingClientRect().width
      if (finalWidth != null) {
        setWidth(finalWidth)
        onResizeEnd?.(finalWidth)
      }
    }

    const onMouseDown = () => {
      setIsResizing(true)
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    }

    resizer.addEventListener('mousedown', onMouseDown)

    return () => {
      resizer.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [direction, minWidth, maxWidth, collapseAt, applyWidth, onResizeEnd])

  useEffect(() => {
    const sidebar = sidebarRef.current
    if (!sidebar) return

    const current = sidebar.getBoundingClientRect().width
    const widthToSet = current || initialWidth
    sidebar.style.width = `${widthToSet}px`
    setWidth(widthToSet)
  }, [])

  return {
    ref: { sidebar: sidebarRef, resizer: resizerRef },
    isResizing,
    isCollapsed,
    width
  }
}
