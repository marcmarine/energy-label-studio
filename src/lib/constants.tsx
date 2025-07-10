import { PRODUCT_GROUPS, type TemplateName } from 'energy-label'
import type { JSX } from 'preact'

export const ENERGY_LABEL_DOCS_URL = 'https://docs.label.energy'

export const TEMPLATES: { name: string; value: TemplateName }[] = [
  { name: 'Arrow Label', value: 'arrow' },
  { name: 'Smartphones and Tablets', value: 'smartphones' },
  {
    name: 'Household Refrigeration Appliances',
    value: 'refrigerating-appliances'
  }
]

export const TEMPLATES_DISABLED: {
  name: string
  value: string
  disabled?: boolean
}[] = [
  {
    name: 'Commercial Refrigerators',
    value: 'comercial-refrigerators',
    disabled: true
  },
  { name: 'Household Dishwashers', value: 'dishwashers', disabled: true },
  {
    name: 'Household Washing machines',
    value: 'washing-machines',
    disabled: true
  },
  { name: 'Household Washer Dryers', value: 'washer-dryers', disabled: true },
  { name: 'Light Sources', value: 'light-sources', disabled: true },
  { name: 'Tyres', value: 'tyres', disabled: true },
  { name: 'Electronic Displays', value: 'electronic-display', disabled: true }
]

const PRODUCT_INFO_DATA = [
  {
    label: "Supplier's Name",
    key: 'supplierOrTrademark',
    type: 'text',
    placeholder: "Supplier's Name"
  },
  {
    label: 'Model Identifier',
    key: 'modelIdentifier',
    type: 'text',
    placeholder: 'Model Identifier'
  },
  { label: 'EPREL ID', key: 'eprelRegistrationNumber', type: 'text' },
  {
    label: 'Efficiency class',
    key: 'energyClass',
    type: 'select',
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  }
]

export const REGULATIONS = {
  arrow: {
    name: 'Arrow Label',
    regulationNumber: null,
    inputs: [
      ...PRODUCT_INFO_DATA,

      {
        label: 'Label orientation',
        key: 'labelOrientation',
        type: 'select',
        options: ['LEFT', 'RIGHT']
      }
    ]
  },
  smartphones: {
    name: PRODUCT_GROUPS.smartphones.name,
    regulationNumber: PRODUCT_GROUPS.smartphones.regulation,
    inputs: [
      ...PRODUCT_INFO_DATA,
      {
        label: 'Battery Endurance',
        key: 'batteryEndurancePerCycle',
        type: 'number',
        placeholder: 'X'
      },
      {
        label: 'Fall Reliability Class',
        key: 'repeatedFreeFallReliabilityClass',
        type: 'select',
        options: ['A', 'B', 'C', 'D', 'E']
      },
      {
        label: 'Repairability Class',
        key: 'repairabilityClass',
        type: 'select',
        options: ['A', 'B', 'C', 'D', 'E']
      },
      {
        label: 'Battery Endurance (Cycles)',
        key: 'batteryEnduranceInCycles',
        type: 'number',
        placeholder: 'XY00'
      },
      {
        label: 'Ingress Protection Rating',
        key: 'ingressProtectionRating',
        type: 'text',
        placeholder: 'IPXY'
      }
    ]
  },
  'refrigerating-appliances': {
    name: PRODUCT_GROUPS['refrigerating-appliances'].name,
    regulationNumber: PRODUCT_GROUPS['refrigerating-appliances'].regulation,
    inputs: [
      ...PRODUCT_INFO_DATA,
      {
        label: 'Consumption',
        key: 'consolidatedEnergyConsAnnual',
        type: 'number',
        placeholder: 'XYZ'
      },
      {
        label: 'Frozen Volume',
        key: 'capFreezeNet',
        type: 'number',
        placeholder: 'XYZ'
      },
      {
        label: 'Chill Volume',
        key: 'capRefrNet',
        type: 'number',
        placeholder: 'XYZ'
      },
      {
        label: 'Number of wine bottles',
        key: 'capBottles',
        type: 'number'
      },
      {
        label: 'Airborne acoustical noise emissions',
        key: 'noise',
        type: 'number',
        placeholder: 'XY'
      },
      {
        label: 'Noise class',
        key: 'noiseClass',
        type: 'select',
        options: ['A', 'B', 'C', 'D']
      }
    ]
  }
}

export const TEMPLATE_ICONS: Record<TemplateName, JSX.Element> = {
  arrow: (
    <svg
      role="img"
      aria-label="Arrow"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 40 22"
      stroke="currentColor"
      stroke-width="2"
    >
      <g clip-path="url(#a)">
        <path
          stroke-linejoin="round"
          d="M30.4 1H11a1 1 0 0 0-.7.3l-8.6 9a1 1 0 0 0 0 1.3l8.6 9c.1.3.4.4.7.4h19.4m0-20H38c.6 0 1 .5 1 1v18c0 .6-.4 1-1 1h-7.6m0-20v20"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h40v22H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  smartphones: (
    <svg
      role="img"
      aria-label="Smartphones"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 40 40"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        d="M16 10H4a2 2 0 0 0-2 1.9V36A2 2 0 0 0 4 38h12a2 2 0 0 0 2-1.9V11.9a2 2 0 0 0-2-2ZM8 12h4M23 4h6"
      />
      <path
        stroke-linecap="round"
        d="M14 9.7V4.3C14 3 15 2 16.4 2h19.2C37 2 38 3 38 4.3v29.4c0 1.3-1 2.3-2.4 2.3H18.4M10 36a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      />
      <path stroke-linecap="round" d="M26 34a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
  ),
  'refrigerating-appliances': (
    <svg
      role="img"
      aria-label="Refrigeratin Appliances"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 40 40"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        d="M10 14.3h20M27.5 12h-1.3m1.3 5h-1.3M28.7 38H11.3c-.7 0-1.3-.6-1.3-1.4V3.4c0-.8.6-1.4 1.3-1.4h17.4c.7 0 1.3.6 1.3 1.4v33.2c0 .8-.6 1.4-1.3 1.4Z"
      />
    </svg>
  )
}
