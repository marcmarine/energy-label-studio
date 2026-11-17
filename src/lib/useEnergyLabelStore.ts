import { createEnergyLabel, download, type TemplatesData } from 'energy-label'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { downloadBlob, svgToPngBlob } from './export'
import type { ProductName } from './types'
import { getLabelFilename } from './utils'

type LabelDataRecord = Record<ProductName, Partial<TemplatesData[ProductName]>>

export type ExportFormat = 'svg' | 'png'

interface EnergyLabelState {
  svg: string
  template: ProductName
  data?: LabelDataRecord

  setTemplate: (template: ProductName) => void
  setData: (data: Partial<TemplatesData[ProductName]>) => void
  download: (format?: ExportFormat) => Promise<void>
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
          const template = get().template as ProductName

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

        download: async (format = 'svg') => {
          const { svg, template, data } = get()
          if (!svg) return

          const filename = getLabelFilename(
            template,
            data?.[template] ?? {},
            format
          )

          if (format === 'png') {
            downloadBlob(await svgToPngBlob(svg), filename)
          } else {
            download(svg, filename)
          }
        }
      }
    },
    {
      name: 'energy_label_storage',
      // The SVG is not persisted: it's regenerated on load so it always
      // reflects the installed energy-label version
      partialize: ({ template, data }) => ({ template, data }),
      onRehydrateStorage: () => (state) => {
        state?.setTemplate(state.template)
      }
    }
  )
)
