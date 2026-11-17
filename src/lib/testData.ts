import type {
  EnergyClass,
  FreeFallReliabilityClass,
  NoiseClass,
  TemplatesData
} from 'energy-label'
import type { ProductName } from './types'

// Names are kept short: long supplier and model names overlap in the label header
const SUPPLIERS = [
  'Acme',
  'Hooli',
  'Initech',
  'Cyberdyne',
  'Wonka Industries',
  'Stark Industries',
  'Aperture Science',
  'Umbrella Corp',
  'Pied Piper',
  'Vandelay Ind.'
]

const MODELS = {
  smartphones: [
    'Pocket Toaster',
    'Brick Phone',
    'Doomscroller',
    'Selfie Stick',
    'Notifier',
    'Thumb Wrestler',
    'Pocket Dial'
  ],
  fridges: [
    'Frostbyte',
    'Chill-O-Matic',
    'Brrrr',
    'Cool Runnings',
    'Ice Ice Baby',
    'Polar Pal',
    'Snow Globe'
  ],
  wineStorage: [
    'In Vino Veritas',
    'Merlot Mansion',
    'Cork Dork',
    'Rosé Rack',
    'Sommelier Jr.'
  ]
}

const MODEL_SUFFIXES = ['3000', '9000', 'Pro', 'Pro Max', 'Ultra', 'Lite', 'X']

const ENERGY_CLASSES: EnergyClass[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const A_TO_E: FreeFallReliabilityClass[] = ['A', 'B', 'C', 'D', 'E']
const NOISE_CLASSES: NoiseClass[] = ['A', 'B', 'C', 'D']
const IP_RATINGS = ['IP54', 'IP65', 'IP67', 'IP68']

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function productInformation(models: string[]) {
  return {
    supplierOrTrademark: pick(SUPPLIERS),
    modelIdentifier: `${pick(models)} ${pick(MODEL_SUFFIXES)}`,
    eprelRegistrationNumber: String(randomInt(1000000, 2999999)),
    energyClass: pick(ENERGY_CLASSES)
  }
}

const GENERATORS: {
  [T in ProductName]: () => Partial<TemplatesData[T]>
} = {
  smartphones: () => ({
    ...productInformation(MODELS.smartphones),
    // Minutes, shown as hours and minutes
    batteryEndurancePerCycle: randomInt(1800, 4800),
    repeatedFreeFallReliabilityClass: pick(A_TO_E),
    repairabilityClass: pick(A_TO_E),
    // Shown multiplied by 100
    batteryEnduranceInCycles: randomInt(8, 20),
    ingressProtectionRating: pick(IP_RATINGS)
  }),

  'refrigerating-appliances': () => {
    const isWineStorage = Math.random() < 0.2
    const shared = {
      consolidatedEnergyConsAnnual: randomInt(90, 400),
      noise: randomInt(30, 42),
      noiseClass: pick(NOISE_CLASSES)
    }

    // The library renders the wine storage label when capBottles is set, so the
    // other variant's fields are cleared explicitly to override previous data
    return isWineStorage
      ? {
          ...productInformation(MODELS.wineStorage),
          ...shared,
          capBottles: randomInt(20, 200),
          capRefrNet: undefined,
          capFreezeNet: undefined
        }
      : {
          ...productInformation(MODELS.fridges),
          ...shared,
          capBottles: undefined,
          capRefrNet: randomInt(100, 400),
          capFreezeNet: pick([0, randomInt(40, 150)])
        }
  }
}

export function generateTestData<T extends ProductName>(template: T) {
  return GENERATORS[template]()
}
