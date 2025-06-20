import { JSX } from 'preact'

interface ToggleSwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

export default function ToggleSwitch({ label, checked, onChange, className = '', disabled = false }: ToggleSwitchProps) {
  const handleChange = (event: JSX.TargetedInputEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(event.currentTarget.checked)
    }
  }

  return (
    <label className={`w-full inline-flex items-center ${disabled ? 'opacity-50' : 'cursor-pointer'} ${className}`}>
      <span className="flex-1 me-2 text-xs text-nowrap text-neutral-500 dark:text-slate-500">{label}</span>
      <input type="checkbox" checked={checked} onInput={handleChange} disabled={disabled} className="sr-only peer" />
      <div className="relative w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-400/50 dark:peer-focus:ring-blue-900/50 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:size-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
    </label>
  )
}
