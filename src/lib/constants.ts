import { TemplateName } from 'energy-label'

export const ENERGY_LABEL_DOCS_URL = 'https://docs.label.energy'

export const TEMPLATES: { name: string; value: TemplateName }[] = [
  { name: 'Arrow Label', value: 'arrow' },
  { name: 'Smartphones and Tablets', value: 'smartphones' },
  { name: 'Household Refrigeration Appliances', value: 'refrigerating-appliances' }
]

export const TEMPLATES_DISABLED: { name: string; value: string; disabled?: boolean }[] = [
  { name: 'Commercial Refrigerators', value: 'comercial-refrigerators', disabled: true },
  { name: 'Household Dishwashers', value: 'dishwashers', disabled: true },
  { name: 'Household Washing machines', value: 'washing-machines', disabled: true },
  { name: 'Household Washer Dryers', value: 'washer-dryers', disabled: true },
  { name: 'Light Sources', value: 'light-sources', disabled: true },
  { name: 'Tyres', value: 'tyres', disabled: true },
  { name: 'Electronic Displays', value: 'electronic-display', disabled: true }
]

const PRODUCT_INFO_DATA = [
  { label: "Supplier's Name", key: 'supplierName', type: 'text', placeholder: "Supplier's Name" },
  { label: 'Model Identifier', key: 'modelName', type: 'text', placeholder: 'Model Identifier' },
  { label: 'EPREL ID', key: 'eprelRegistrationNumber', type: 'text' }
]

export const REGULATIONS = {
  arrow: {
    name: TEMPLATES.find(t => t.value == 'arrow')?.name,
    regulationNumber: null,
    inputs: [
      ...PRODUCT_INFO_DATA,
      { label: 'Efficiency class', key: 'efficiencyRating', type: 'select', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
      { label: 'Label orientation', key: 'labelOrientation', type: 'select', options: ['LEFT', 'RIGHT'] }
    ]
  },
  smartphones: {
    name: TEMPLATES.find(t => t.value == 'smartphones')?.name,
    regulationNumber: '2023/1669',
    inputs: [
      ...PRODUCT_INFO_DATA,
      { label: 'Efficiency class', key: 'efficiencyRating', type: 'select', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
      { label: 'Battery Endurance (Hours)', key: 'batteryEnduranceHours', type: 'number', placeholder: 'X' },
      { label: 'Battery Endurance (Minutes)', key: 'batteryEnduranceMinutes', type: 'number', placeholder: 'Y' },
      { label: 'Fall Reliability Class', key: 'fallReliabilityClass', type: 'select', options: ['A', 'B', 'C', 'D', 'E'] },
      { label: 'Repairability Class', key: 'repairabilityClass', type: 'select', options: ['A', 'B', 'C', 'D', 'E'] },
      { label: 'Battery Endurance (Cycles)', key: 'batteryEnduranceInCycles', type: 'text', placeholder: 'XY00' },
      { label: 'Ingress Protection Rating', key: 'ingressProtectionRating', type: 'text', placeholder: 'IPXY' }
    ]
  },
  'refrigerating-appliances': {
    name: TEMPLATES.find(t => t.value == 'refrigerating-appliances')?.name,
    regulationNumber: '2019/2016',
    inputs: [
      ...PRODUCT_INFO_DATA,
      { label: 'Efficiency class', key: 'efficiencyRating', type: 'select', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
      { label: 'Consumption', key: 'annualEnergyConsumption', type: 'number', placeholder: 'XYZ' },
      { label: 'Frozen Volume', key: 'frozenVolume', type: 'number', placeholder: 'XYZ' },
      { label: 'Chill Volume', key: 'chillVolume', type: 'number', placeholder: 'XYZ' },
      { label: 'Number of wine bottles', key: 'bottleCapacity', type: 'number' },
      { label: 'Airborne acoustical noise emissions', key: 'noiseEmissions', type: 'number', placeholder: 'XY' },
      { label: 'Noise class', key: 'noiseEmissionsClass', type: 'select', options: ['A', 'B', 'C', 'D'] }
    ]
  }
}
