import { forwardRef, type JSX, type Ref } from 'preact/compat'
import { cx } from '../lib/utils'

export interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface SelectProps {
  label?: string
  options: SelectOption[] | string[]
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  isCollapsed?: boolean
  className?: string
  labelClassName?: string
  selectClassName?: string
  id?: string
  disabled?: boolean
  selectedContent?: React.ReactNode
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    options,
    value,
    onChange,
    required = false,
    isCollapsed = false,
    className = '',
    selectClassName = '',
    id,
    disabled = false,
    selectedContent
  },
  ref
) {
  return (
    <label className={`flex flex-col ${className}`}>
      {label && (
        <span
          className={`px-1 text-xs text-neutral-500 dark:text-slate-500 text-nowrap ${className ?? 'mb-1'}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      )}
      <select
        id={id}
        ref={ref}
        className={cx(
          'px-2 py-1 rounded-[var(--border-radius)] border border-[var(--panel-border-color)] focus:outline-none open:ring-4 open:ring-blue-400/50 dark:open:ring-blue-900/50 open:border-blue-400 dark:open:border-slate-600',
          isCollapsed && 'collapsed',
          selectClassName
        )}
        value={value}
        onInput={onChange}
        disabled={disabled}
        required={required}
      >
        <button type="button">
          <selectedcontent>{selectedContent}</selectedcontent>
        </button>
        {options.map((option) =>
          typeof option === 'string' ? (
            <option value={option}>{option}</option>
          ) : (
            <option value={option.value} disabled={option.disabled}>
              {option.icon && (
                <span className="icon" aria-hidden="true">
                  {option.icon}
                </span>
              )}
              <span className="option-label">{option.label}</span>
            </option>
          )
        )}
      </select>
    </label>
  )
}) as (props: SelectProps & { ref?: Ref<HTMLSelectElement> }) => JSX.Element

export default Select
