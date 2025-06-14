interface InputFieldProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url' | 'search'
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
    <label className={`flex-1 flex flex-col ${className}`}>
      <span className={`mb-1 text-sm text-neutral-600 ${labelClassName}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`px-2 py-1 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-900/50 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500/10 ${inputClassName}`}
      />
    </label>
  )
}
