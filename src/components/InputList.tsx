import { TemplateName, TemplatesData } from 'energy-label'
import InputField from './InputField'
import Select from './Select'
import { REGULATIONS } from '../lib/constants'

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

export default function DynamicInputList({ template, values, setValues }: DynamicInputListProps) {
  const { inputs } = REGULATIONS[template]
  const productInformationKeys = ['supplierName', 'modelName', 'eprelRegistrationNumber']
  const [productInformationData, efficiencyData] = [inputs.filter(({ key }) => productInformationKeys.includes(key)), inputs.filter(({ key }) => !productInformationKeys.includes(key))] as [InputConfig[], InputConfig[]]

  return (
    <>
      {template !== 'arrow' && (
        <>
          <h2 class="mb-4 text-sm font-medium">Product information</h2>
          <div class="mb-6 flex gap-2 flex-wrap">
            {productInformationData.map(item => (
              <InputField label={item.label} value={values[item.key]} onChange={e => setValues({ [item.key]: e.currentTarget.value })} placeholder={item.placeholder} />
            ))}
          </div>
        </>
      )}
      <h2 class="mb-4 text-sm font-medium">Efficiency details</h2>
      <div className="mb-2 flex gap-2 flex-wrap">
        {efficiencyData.map(({ label, key, type, options: selectOptions, placeholder }) =>
          type === 'select' ? (
            <Select label={label} value={values[key]} onChange={e => setValues({ [key]: e.currentTarget.value })} options={selectOptions as string[]} />
          ) : (
            <InputField
              label={label}
              type={type}
              value={values[key]}
              placeholder={placeholder}
              onChange={e =>
                setValues({
                  [key as string]: type === 'number' ? Number(e.currentTarget.value) : e.currentTarget.value
                })
              }
            />
          )
        )}
      </div>
    </>
  )
}
