import {
  forwardRef,
  type InputHTMLAttributes,
  type JSX,
  type Ref
} from 'preact/compat'

interface InputFieldProps extends InputHTMLAttributes {
  label?: string
  type?: string
  labelClassName?: string
  inputClassName?: string
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      label,
      required = false,
      className = '',
      labelClassName = '',
      inputClassName = '',
      ...restProps
    },
    ref
  ) {
    return (
      <label
        className={`flex-1 flex flex-col w-1/2 rounded-[var(--border-radius)] ${className}`}
      >
        {label && (
          <span
            className={`px-1 mb-1 text-xs text-neutral-500 dark:text-slate-500 whitespace-nowrap truncate ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        )}
        <input
          ref={ref}
          required={required}
          className={`px-2 py-1 rounded-[var(--border-radius)] border border-[var(--panel-border-color)] focus:outline-none focus:ring-4 focus:ring-blue-400/50 dark:focus:ring-blue-900/50 focus:border-neutral-400 dark:focus:border-slate-600 placeholder:text-neutral-400 dark:placeholder:text-slate-600 ${inputClassName}`}
          {...restProps}
        />
      </label>
    )
  }
) as (props: InputFieldProps & { ref?: Ref<HTMLInputElement> }) => JSX.Element

export default InputField
