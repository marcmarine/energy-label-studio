import {
  appendTo,
  createEnergyLabel,
  download,
  type TemplateName,
  type TemplatesData
} from 'energy-label'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EnergyLabelState<T extends TemplateName = TemplateName> {
  svg: string
  template?: T
  data?: Partial<TemplatesData[T]>

  setTemplate: (template: T) => void
  setData: (data: Partial<TemplatesData[T]>) => void
  renderTo: (el: HTMLElement) => void
  download: (filename?: string) => void
}

export const useEnergyLabelStore = create<EnergyLabelState>()(
  persist(
    (set, get) => {
      const regenerate = () => {
        const { template, data } = get()

        const label = createEnergyLabel(template, data)
        const svg = label.toString()

        set({ svg })
      }

      return {
        svg: '',
        template: 'smartphones',
        data: {},

        setTemplate: (template) => {
          set({ template })
          regenerate()
        },

        setData: (data) => {
          set((state) => ({
            data: {
              ...state.data,
              ...data
            }
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
