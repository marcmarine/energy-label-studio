import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EnergyLabel, appendTo, download, type TemplateName, type TemplatesData } from 'energy-label'

interface EnergyLabelState<T extends TemplateName = TemplateName> {
  svg: string
  loading: boolean
  error: Error | null
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
      const regenerate = async () => {
        const { template, data } = get()

        set({ loading: true, error: null })

        try {
          const svg = await EnergyLabel(template, data).generate()
          set({ svg, loading: false })
        } catch (error) {
          set({ error: error as Error, loading: false })
        }
      }

      return {
        svg: '',
        loading: false,
        error: null,
        template: 'arrow',
        data: {},

        setTemplate: template => {
          set({ template })
          regenerate()
        },

        setData: data => {
          set(state => ({
            data: {
              ...state.data,
              ...data
            }
          }))
          regenerate()
        },

        renderTo: el => {
          const { svg } = get()
          if (svg) appendTo(el, svg)
        },

        download: filename => {
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
