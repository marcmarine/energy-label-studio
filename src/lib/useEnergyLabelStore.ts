import {
  appendTo,
  createEnergyLabel,
  download,
  type TemplateName,
  type TemplatesData
} from 'energy-label'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LabelDataRecord = Record<
  TemplateName,
  Partial<TemplatesData[TemplateName]>
>

interface EnergyLabelState {
  svg: string
  template?: TemplateName
  data?: LabelDataRecord

  setTemplate: (template: TemplateName) => void
  setData: (data: Partial<TemplatesData[TemplateName]>) => void
  renderTo: (el: HTMLElement) => void
  download: (filename?: string) => void
}

export const useEnergyLabelStore = create<EnergyLabelState>()(
  persist(
    (set, get) => {
      const regenerate = () => {
        const { template, data } = get()
        if (!template) return

        const labelData = data?.[template] ?? {}
        const label = createEnergyLabel(template, labelData)
        const svg = label.toString()

        set({ svg })
      }

      return {
        svg: '',
        template: 'smartphones',
        data: {} as LabelDataRecord,

        setTemplate: (template) => {
          set({ template })
          regenerate()
        },

        setData: (newData) => {
          const template = get().template as TemplateName

          set((state) => ({
            data: {
              ...state.data,
              [template]: {
                ...state.data?.[template],
                ...newData
              }
            } as LabelDataRecord
          }))
          regenerate()
        },

        renderTo: (el) => {
          const { svg } = get()
          if (svg) appendTo(el, svg)
        },

        download: (filename) => {
          const { svg } = get()
          if (svg) download(svg, filename)
        }
      }
    },
    {
      name: 'energy_label_storage'
    }
  )
)
