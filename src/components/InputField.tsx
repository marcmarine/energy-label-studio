import type { ComponentChildren } from 'preact'
import {
  forwardRef,
  type InputHTMLAttributes,
  type JSX,
  type Ref
} from 'preact/compat'
import { useId } from 'preact/hooks'

interface InputFieldProps extends InputHTMLAttributes {
  label?: string
  type?: string
  labelClassName?: string
  inputClassName?: string
  hint?: ComponentChildren
  // Shown inside the input, on the right
  suffix?: ComponentChildren
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      label,
      required = false,
      className = '',
      labelClassName = '',
      inputClassName = '',
      hint,
      suffix,
      ...restProps
    },
    ref
  ) {
    const generatedId = useId()
    const id = (restProps.id as string | undefined) ?? generatedId
    const suffixId = `${id}-suffix`

    // Only the label text names the input: the suffix and hint sit outside the
    // <label>, and the suffix is announced as the input's description
    return (
      <div
        className={`flex-1 flex flex-col w-1/2 rounded-[var(--border-radius)] ${className}`}
      >
        {label && (
          <label
            for={id}
            className={`px-1 mb-1 text-xs text-neutral-600 dark:text-slate-400 whitespace-nowrap truncate ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div class="relative flex items-center">
          <input
            ref={ref}
            required={required}
            aria-describedby={suffix ? suffixId : undefined}
            className={`w-full px-2 py-1 ${suffix ? 'pr-7' : ''} rounded-[var(--border-radius)] border focus:outline-none focus:ring-4 focus:ring-blue-400/50 dark:focus:ring-blue-900/50 focus:border-neutral-400 dark:focus:border-slate-600 placeholder:text-neutral-400 dark:placeholder:text-slate-600 ${inputClassName}`}
            {...restProps}
            id={id}
          />
          {suffix && (
            <span id={suffixId} class="absolute right-2 flex">
              {suffix}
            </span>
          )}
        </div>
        {hint}
      </div>
    )
  }
) as (props: InputFieldProps & { ref?: Ref<HTMLInputElement> }) => JSX.Element

export default InputField
