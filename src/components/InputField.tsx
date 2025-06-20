interface InputFieldProps {
  label: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  className?: string
  labelClassName?: string
  inputClassName?: string
}

export default function InputField({ label, type = 'text', placeholder = '', value, onChange, required = false, disabled = false, className = '', labelClassName = '', inputClassName = '' }: InputFieldProps) {
  return (
    <label className={`flex-1 flex flex-col w-1/2 ${className}`}>
      <span className={`mb-1 text-xs text-neutral-500 dark:text-slate-500 whitespace-nowrap truncate ${labelClassName}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onInput={onChange}
        required={required}
        disabled={disabled}
        className={`px-2 py-1 rounded-[var(--border-radius)] border border-[var(--panel-border-color)] focus:outline-none focus:ring-4 focus:ring-blue-400/50 dark:focus:ring-blue-900/50 focus:border-neutral-400 dark:focus:border-slate-600 placeholder:text-neutral-400 dark:placeholder:text-slate-600 ${inputClassName}`}
      />
    </label>
  )
}
