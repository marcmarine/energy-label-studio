import { useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { getShareUrl } from '../lib/share'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'
import { setState, useNavigationStore } from '../lib/useNavigationStore'
import { cx } from '../lib/utils'

export default function PropertiesActions({
  className
}: {
  className?: string
}) {
  const { query } = useLocation()
  const panel = useNavigationStore((state) => state.panel)
  const isSearchPanelActive = panel === 'search'
  const isSearchActive = Boolean(query.q)

  const [isCopied, setIsCopied] = useState(false)

  function handleSearchClick() {
    setState({ panel: isSearchPanelActive ? 'edit' : 'search' })
  }

  async function handleShareClick() {
    const { template, data } = useEnergyLabelStore.getState()

    try {
      await navigator.clipboard.writeText(
        getShareUrl(template, data?.[template] ?? {})
      )
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 1500)
    } catch (error) {
      console.error('Could not copy the share link:', error)
    }
  }

  return (
    <div class={cx('flex rounded', className)}>
      <button
        onClick={handleShareClick}
        class="button"
        type="button"
        title={isCopied ? 'Link copied' : 'Copy share link'}
      >
        <svg
          role="img"
          aria-label={isCopied ? 'Link copied' : 'Copy share link'}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              isCopied
                ? 'm4.5 12.75 6 6 9-13.5'
                : 'M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244'
            }
          />
        </svg>
      </button>
      <button
        onClick={handleSearchClick}
        class={cx(
          'button relative',
          isSearchPanelActive && 'bg-neutral-100 dark:bg-slate-700/40'
        )}
        type="button"
      >
        {isSearchActive && (
          <span
            class={cx(
              'absolute right-0.5 top-0.5 block size-1.5 bg-amber-400 opacity-100 rounded-full transition-all duration-200 ease-[cubic-bezier(0,2,1,1)]',
              isSearchPanelActive && 'scale-0 opacity-0'
            )}
          />
        )}
        <svg
          role="img"
          aria-label="Search"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
      <button
        onClick={() => setState({ panel: 'edit' })}
        class={cx(
          'button',
          panel === 'edit' && 'bg-neutral-100 dark:bg-slate-700/40'
        )}
        type="button"
      >
        <svg
          role="img"
          aria-label="Edit"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </button>
    </div>
  )
}
