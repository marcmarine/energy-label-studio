import { cx } from '../lib/utils'

export interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
}

interface ReusableSelectProps {
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

export default function Select({ label, options, value, onChange, required = false, isCollapsed = false, className = '', selectClassName = '', id, disabled = false, selectedContent }: ReusableSelectProps) {
  return (
    <label className={`flex flex-col ${className}`}>
      {label && (
        <span className={`text-xs text-neutral-500 dark:text-slate-500 text-nowrap ${className ?? 'mb-1'}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      )}
      <select
        id={id}
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
        <button>
          <selectedcontent>{selectedContent}</selectedcontent>
        </button>
        {options.map(option =>
          typeof option === 'string' ? (
            <option value={option}>{option}</option>
          ) : (
            <option value={option.value}>
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
}
