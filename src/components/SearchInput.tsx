import {
  forwardRef,
  type InputHTMLAttributes,
  type JSX,
  type Ref
} from 'preact/compat'
import { useLocation } from 'preact-iso'
import InputField from './InputField'

const SearchInput = forwardRef<HTMLInputElement, InputHTMLAttributes>(
  function SearchInput(props, ref) {
    const { query, route, path } = useLocation()
    const { q: searchQuery = '' } = query ?? {}

    function handleSearch(term: string) {
      const params = new URLSearchParams(query)
      if (term) {
        params.set('q', term)
      } else {
        params.delete('q')
      }
      route(`${path}?${params.toString()}`)
    }

    return (
      <InputField
        ref={ref}
        placeholder="Search..."
        aria-label="Search"
        value={searchQuery}
        onChange={(event) => handleSearch(event.currentTarget.value)}
        className="w-full"
        inputClassName=""
        {...props}
      />
    )
  }
) as (
  props: InputHTMLAttributes & { ref?: Ref<HTMLInputElement> }
) => JSX.Element

export default SearchInput
