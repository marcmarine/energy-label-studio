import { cx } from '../lib/utils'

interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
}

interface ReusableSelectProps {
  label?: string
  options: SelectOption[]
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

export default function Select({
  label,
  options,
  value,
  onChange,
  required = false,
  isCollapsed = false,
  className = '',
  labelClassName = '',
  selectClassName = '',
  id = 'select',
  disabled = false,
  selectedContent
}: ReusableSelectProps) {
  return (
    <label className={`flex-1 flex flex-col ${className}`}>
      {label && (
        <span className={`mb-1 text-sm text-neutral-600 text-nowrap ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      )}
      <select
        id={id}
        className={cx('w-full rounded-lg border border-neutral-200 dark:border-neutral-800 focus:outline-none open:ring-4 open:ring-blue-500/10 open:border-blue-500/10', isCollapsed && 'collapsed', selectClassName)}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      >
        <button>
          <selectedcontent>{selectedContent}</selectedcontent>
        </button>
        {options.map(option => (
          <option value={option.value}>
            {option.icon && (
              <span className="icon" aria-hidden="true">
                {option.icon}
              </span>
            )}
            <span className="option-label">{option.label}</span>
          </option>
        ))}
      </select>
    </label>
  )
}
