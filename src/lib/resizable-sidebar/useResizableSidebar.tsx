import { RefObject } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

export type ResizeDirection = 'left' | 'right'

export interface ResizableSidebarOptions {
  direction?: ResizeDirection
  minWidth?: number
  maxWidth?: number
  defaultWidth?: number
  collapseAt?: number
}

interface UseSidebarResizeReturn {
  ref: {
    sidebar: RefObject<HTMLDivElement>
    resizer: RefObject<HTMLDivElement>
  }
  isResizing: boolean
  isCollapsed: boolean
}

export default function useResizableSidebar({ direction = 'right', minWidth = 48, maxWidth = 500, defaultWidth, collapseAt }: ResizableSidebarOptions = {}): UseSidebarResizeReturn {
  const initialWidth = defaultWidth ?? minWidth
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [isCollapsed, setCollapsed] = useState<boolean>(false)

  const sidebarRef = useRef<HTMLDivElement>(null)
  const resizerRef = useRef<HTMLDivElement>(null)

  const resizeSidebar = useCallback(
    (newWidth: number) => {
      if (sidebarRef.current) {
        sidebarRef.current.style.width = `${newWidth}px`
      }
    },
    [minWidth, maxWidth]
  )

  useEffect(() => {
    const panel = sidebarRef.current
    const resizer = resizerRef.current

    if (!panel || !resizer) return

    const handleMouseMove = (mouseEvent: MouseEvent) => {
      let width: number

      const rectangle = panel.getBoundingClientRect()

      if (direction === 'right') {
        width = mouseEvent.clientX - rectangle.left
      } else {
        width = rectangle.right - mouseEvent.clientX
      }

      let shouldCollapse = false

      if (collapseAt) {
        if (direction === 'right') {
          shouldCollapse = mouseEvent.clientX <= collapseAt
        } else {
          shouldCollapse = mouseEvent.clientX >= window.innerWidth - collapseAt
        }
      }

      setCollapsed(!!shouldCollapse)

      if (width > minWidth && width < maxWidth) {
        resizeSidebar(width)
        panel.style.transition = ''
      } else if (shouldCollapse) {
        panel.style.transition = 'all 200ms'
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    const handleMouseDown = () => {
      setIsResizing(true)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    }

    resizer.addEventListener('mousedown', handleMouseDown)

    return () => {
      resizer.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [direction, minWidth, maxWidth, collapseAt, resizeSidebar])

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${initialWidth}px`
    }
  }, [])

  return {
    ref: { sidebar: sidebarRef, resizer: resizerRef },
    isResizing,
    isCollapsed
  }
}
