import type {
  HouseholdFridgesAndFreezersData,
  SmartphonesAndTabletsData,
  TemplateName,
  WineStorageAppliancesData
} from 'energy-label'
import { PRODUCT_GROUPS } from 'energy-label'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { useDebounce } from 'use-debounce'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'
import {
  setState as setNavigationState,
  useNavigationStore
} from '../lib/useNavigationStore'
import { cx } from '../lib/utils'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import Select from './Select'
import SpinnerIcon from './Spinner'

const SEARCH_LIMIT = 28
const SEARCH_DEBOUNCE_MS = 300

interface SearchHit
  extends WineStorageAppliancesData,
    HouseholdFridgesAndFreezersData,
    SmartphonesAndTabletsData {
  operatingSystem: string
  deviceType: string
}

interface SearchAPIResponse {
  offset: number
  hits: SearchHit[]
  size: number
}

type SearchField = 'supplierOrTrademark' | 'modelIdentifier'

interface SearchState {
  results: SearchAPIResponse
  isLoading: boolean
  currentPage: number
  error: string | null
}

async function search(
  query: string,
  product: TemplateName = 'smartphones',
  page: number = 1,
  searchField: SearchField = 'supplierOrTrademark'
): Promise<SearchAPIResponse> {
  try {
    const url = new URL(`/search/${product}`, import.meta.env.VITE_API_URL)
    url.searchParams.set(searchField, query)
    url.searchParams.set('_page', String(page))
    url.searchParams.set('_limit', String(SEARCH_LIMIT))

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(
        `Search failed: ${response.status} ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Search error:', error)
    throw error
  }
}

export default function SearchPanel() {
  const initialResultsState: SearchAPIResponse = {
    offset: 0,
    hits: [],
    size: 0
  }

  const [searchState, setSearchState] = useState<SearchState>({
    results: initialResultsState,
    isLoading: false,
    currentPage: 1,
    error: null
  })

  const [searchField, setSearchField] = useState<SearchField>(
    'supplierOrTrademark'
  )
  const inputRef = useRef<HTMLInputElement>(null)

  const { template, setData } = useEnergyLabelStore()
  const { panel } = useNavigationStore()
  const { query, route, path } = useLocation()
  const { q: searchQuery } = query ?? {}

  const [debouncedSearchQuery] = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS)
  const isSearchActive = Boolean(debouncedSearchQuery)
  const isActive = panel === 'search'

  const setIsActive = useCallback(
    (isSearchActive: boolean) =>
      setNavigationState({ panel: isSearchActive ? 'search' : 'edit' }),
    []
  )

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsActive(false)
    }
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      setIsActive(true)
    }
  }

  const performSearch = useCallback(
    async (query: string, page: number = 1, isLoadMore: boolean = false) => {
      if (!query.trim()) return

      setSearchState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        ...(isLoadMore ? {} : { currentPage: 1 })
      }))

      try {
        const results = await search(query, template, page, searchField)

        setSearchState((prev) => ({
          ...prev,
          results: isLoadMore
            ? { ...results, hits: [...prev.results.hits, ...results.hits] }
            : results,
          currentPage: page,
          isLoading: false
        }))
      } catch (_) {
        setSearchState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Error. Please try again.'
        }))
      }
    },
    [template, searchField]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (isSearchActive) {
      performSearch(debouncedSearchQuery)
    } else {
      setSearchState((prev) => ({
        ...prev,
        results: initialResultsState,
        currentPage: 1,
        error: null
      }))
    }
  }, [debouncedSearchQuery, isSearchActive, performSearch])

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus()
    }
  }, [isActive])

  const handleFetchMore = useCallback(() => {
    if (searchState.isLoading || !debouncedSearchQuery) return

    const nextPage = searchState.currentPage + 1
    performSearch(debouncedSearchQuery, nextPage, true)
  }, [
    searchState.isLoading,
    searchState.currentPage,
    debouncedSearchQuery,
    performSearch
  ])

  const handleReset = () => {
    route(`${path}`)
  }

  const handleSearchFieldChange = useCallback(
    (value: string) => {
      setSearchField(value as SearchField)
      if (debouncedSearchQuery) {
        performSearch(debouncedSearchQuery)
      }
    },
    [debouncedSearchQuery, performSearch]
  )

  const hasNextPage =
    searchState.results.size > searchState.currentPage * SEARCH_LIMIT
  const showResults = Boolean(searchState.results.size)

  return (
    <div
      className={cx(
        'absolute left-0 top-0 w-full z-10 transition-opacity',
        !isActive && 'opacity-0 pointer-events-none'
      )}
    >
      <div className="panel w-full h-full overflow-x-auto !bg-[var(--panel-background-color)]/90 backdrop-blur-xl no-scrollbar">
        <div class="relative">
          <div
            class={cx(
              'p-2 sticky top-0 opacity-0 -translate-y-1 transition-all border-b border-[var(--panel-border-color)] bg-[var(--panel-background-color)]/90 backdrop-blur-sm',
              isActive && 'opacity-100 translate-y-0'
            )}
          >
            <div class="relative">
              <button
                onClick={() => setIsActive(false)}
                type="button"
                class={cx(
                  isSearchActive && 'right-11 delay-[0ms]',
                  'px-1 absolute top-1/2 -translate-y-1/2 right-2 text-[10px] rounded-xs font-mono bg-neutral-200/40 dark:bg-slate-700/20 text-neutral-500 dark:text-slate-600 transition-all duration-200 delay-150'
                )}
              >
                Esc
              </button>
              <button
                onClick={handleReset}
                class={cx(
                  'button absolute text-neutral-500 dark:text-slate-500 z-40 top-1/2 -translate-y-1/2 right-1 transition-transform duration-500',
                  !isSearchActive && 'scale-0'
                )}
                type="button"
              >
                {searchState.isLoading ? (
                  <SpinnerIcon />
                ) : (
                  <svg
                    role="img"
                    aria-label="Close"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
              <SearchInput ref={inputRef} />
            </div>
            <div className="mt-2 w-full flex items-center justify-between">
              <p
                className={cx(
                  'px-1 text-[10px] text-neutral-500 dark:text-slate-500',
                  searchState.error && '!text-red-500'
                )}
              >
                {searchState.isLoading
                  ? 'Loading...'
                  : searchState.error
                    ? searchState.error
                    : `${searchState.results.size} results in ${PRODUCT_GROUPS[template].name.toLowerCase()}`}
              </p>
              <Select
                className="text-[10px] text-neutral-500 dark:text-slate-500"
                selectClassName=" border-0"
                value={searchField}
                onChange={(event) =>
                  handleSearchFieldChange(event.currentTarget.value)
                }
                options={[
                  {
                    label: "Supplier's name  or Trademark",
                    value: 'supplierOrTrademark'
                  },
                  {
                    label: 'Model Identifier',
                    value: 'modelIdentifier'
                  }
                ]}
              />
            </div>
          </div>
          <div class="p-2">
            {showResults && (
              <>
                <SearchResults
                  results={searchState.results.hits}
                  onClick={setData}
                  onDblClick={setIsActive}
                />
                {hasNextPage && (
                  <button
                    onClick={handleFetchMore}
                    className="mt-2 button w-full text-xs"
                    type="button"
                    disabled={searchState.isLoading}
                  >
                    {searchState.isLoading ? 'Fetching...' : 'View more'}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
