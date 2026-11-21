import type { TemplateName, TemplatesData } from 'energy-label'
import { REGULATIONS } from '../lib/constants'
import type { ProductName } from '../lib/types'
import { getEprelUrl } from '../lib/utils'
import ExternalLinkIcon from './ExternalLinkIcon'
import InputField from './InputField'
import Select from './Select'

// Filled, borderless fields; the ring and border still show on focus
const FIELD_CLASS_NAME =
  'text-sm font-semibold placeholder:font-normal bg-neutral-100 dark:bg-slate-700/50 border-transparent'

type InputConfig = {
  label: string
  key: keyof TemplatesData[TemplateName]
  type: string
  options?: string[]
  placeholder?: string
}

type DynamicInputListProps = {
  template: TemplateName
  values: Partial<TemplatesData[TemplateName]>
  setValues: (data: Partial<TemplatesData[TemplateName]>) => void
}

export default function DynamicInputList({
  template,
  values,
  setValues
}: DynamicInputListProps) {
  const { inputs } = REGULATIONS[template]
  const productInformationKeys = [
    'supplierOrTrademark',
    'modelIdentifier',
    'eprelRegistrationNumber'
  ]
  const [productInformationData, efficiencyData] = [
    inputs.filter(({ key }) => productInformationKeys.includes(key)),
    inputs.filter(({ key }) => !productInformationKeys.includes(key))
  ] as InputConfig[][]

  return (
    <>
      <h3 class="px-1 mb-4 text-sm font-medium">Product information</h3>
      <div class="mb-6 flex gap-2 flex-wrap">
        {productInformationData.map((item) => (
          <InputField
            label={item.label}
            value={values[item.key] || ''}
            onChange={(event) =>
              setValues({ [item.key as string]: event.currentTarget.value })
            }
            placeholder={item.placeholder}
            inputClassName={FIELD_CLASS_NAME}
            hint={
              (item.key as string) === 'eprelRegistrationNumber' && (
                <EprelLink
                  url={getEprelUrl(
                    template as ProductName,
                    (values[item.key] as string | undefined) || undefined
                  )}
                />
              )
            }
          />
        ))}
      </div>
      <h3 class="px-1 mb-4 text-sm font-medium">Efficiency details</h3>
      <div className="mb-2 flex gap-2 flex-wrap">
        {efficiencyData.map(
          ({ label, key, type, options: selectOptions, placeholder }) =>
            type === 'select' ? (
              <Select
                label={label}
                value={values[key] ?? ''}
                onChange={(e) =>
                  setValues({
                    [key as string]: e.currentTarget.value || undefined
                  })
                }
                options={[
                  // Empty option so an unset value isn't shown as the first class
                  { value: '', label: '—' },
                  ...(selectOptions as string[]).map((option) => ({
                    value: option,
                    label: option
                  }))
                ]}
                className="flex-1"
                selectClassName={FIELD_CLASS_NAME}
              />
            ) : (
              <InputField
                label={label}
                type={type}
                value={values[key]}
                placeholder={placeholder}
                inputClassName={FIELD_CLASS_NAME}
                onChange={(e) =>
                  setValues({
                    // An empty field is unset rather than 0 or ''
                    [key as string]:
                      e.currentTarget.value === ''
                        ? undefined
                        : type === 'number'
                          ? e.currentTarget.valueAsNumber
                          : e.currentTarget.value
                  })
                }
              />
            )
        )}
      </div>
    </>
  )
}

// The URL the label's QR code points to, so it can be checked before printing
function EprelLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={url}
      class="mt-1 px-1 min-w-0 inline-flex items-center gap-1 self-start max-w-full text-xs text-neutral-600 dark:text-slate-400 hover:underline"
    >
      <span class="truncate">{url.replace(/^https:\/\//, '')}</span>
      <ExternalLinkIcon className="size-3 shrink-0" />
    </a>
  )
}
