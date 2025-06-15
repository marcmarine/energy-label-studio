import { forwardRef, JSX } from 'preact/compat'

const ResizeHandle = forwardRef<HTMLDivElement, { isResizing?: boolean }>(({ isResizing }, ref): JSX.Element => {
  return (
    <div class="relative">
      <div
        ref={ref}
        class={[
          'absolute -left-1 w-2 h-full bg-neutral-200/10 dark:bg-slate-900/10 opacity-0 hover:opacity-100 transition-all duration-300 delay-200 cursor-grab active:cursor-grabbing',
          isResizing ? 'opacity-100' : ''
        ].join(' ')}
      >
        <div class="absolute w-1 h-full left-1/2 top-1/2 -translate-1/2 bg-fuchsia-500 dark:bg-fuchsia-700" />
      </div>
    </div>
  )
})

export default ResizeHandle
