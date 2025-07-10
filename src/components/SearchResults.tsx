import type {
  ArrowData,
  HouseholdFridgesAndFreezersData,
  SmartphonesAndTabletsData,
  WineStorageAppliancesData
} from 'energy-label'
import EnergyLabelArrow from './EnergyLabelArrow'

interface SearchResultsProps {
  results: ((WineStorageAppliancesData &
    HouseholdFridgesAndFreezersData &
    SmartphonesAndTabletsData) & {
    operatingSystem: string
    deviceType: string
  })[]
  onClick: (
    data: Partial<
      | WineStorageAppliancesData
      | HouseholdFridgesAndFreezersData
      | SmartphonesAndTabletsData
      | ArrowData
    >
  ) => void
  onDblClick: (isSearchActive: boolean) => void
}
export default function SearchResults({
  results,
  onClick,
  onDblClick
}: SearchResultsProps) {
  return (
    <ul class="border border-[var(--panel-border-color)] divide-y divide-[var(--panel-border-color)] rounded-[var(--border-radius)]">
      {results.map((item) => {
        const {
          batteryEnduranceInCycles,
          batteryEndurancePerCycle,
          capBottles,
          capFreezeNet,
          capRefrNet,
          consolidatedEnergyConsAnnual,
          energyClass,
          eprelRegistrationNumber,
          ingressProtectionRating,
          modelIdentifier,
          noise,
          noiseClass,
          repairabilityClass,
          repeatedFreeFallReliabilityClass,
          supplierOrTrademark
        } = item
        return (
          <li>
            <button
              class="button !px-2 !rounded-none w-full flex flex-col gap-2"
              onClick={() => {
                onClick({
                  batteryEnduranceInCycles,
                  batteryEndurancePerCycle,
                  capBottles,
                  capFreezeNet,
                  capRefrNet,
                  consolidatedEnergyConsAnnual,
                  energyClass,
                  eprelRegistrationNumber,
                  ingressProtectionRating,
                  modelIdentifier,
                  noise,
                  noiseClass,
                  repairabilityClass,
                  repeatedFreeFallReliabilityClass,
                  supplierOrTrademark
                })
              }}
              onDblClick={() => {
                onDblClick(false)
              }}
              type="button"
            >
              <div class="flex gap-2 justify-between">
                <div class="text-left truncate">
                  <h2 class="inline-block text-sm font-medium ">
                    {item.supplierOrTrademark}
                  </h2>{' '}
                  <h4 class="inline-block text-xs text-neutral-500 dark:text-slate-500">
                    {item.modelIdentifier}
                  </h4>
                </div>
                <div class="flex items-center justify-between">
                  <EnergyLabelArrow energyClass={item.energyClass} />
                </div>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
