import { type Theme, useSettingsStore } from '../lib/useSettingsStore'
import { updateAndApplySettings } from '../lib/utils'
import Select from './Select'
import ToggleSwitch from './ToggleSwitch'

export default function Settings() {
  const { theme, gaps, rounded } = useSettingsStore()

  const themeOptions = [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' }
  ]

  return (
    <div class="panel !border-0 size-full !bg-[var(--panel-background-color)] backdrop-blur-lg">
      <div class="px-2 pt-2 flex gap-2 items-center justify-end">
        <a href="/" class="button">
          <svg
            role="img"
            aria-label="Close"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </a>
      </div>
      <h2 class="px-4 mb-2 text-2xl font-semibold truncate">Settings</h2>
      <div class="p-3">
        <h3 class="px-1 mb-4 text-sm font-medium">Appearance</h3>
        <div class="flex flex-col gap-2">
          <Select
            label="Theme"
            className="flex-1 flex-row items-center"
            labelClassName="flex-1"
            value={theme}
            onChange={(event) =>
              updateAndApplySettings({
                theme: event.currentTarget.value.toLocaleLowerCase() as Theme
              })
            }
            options={themeOptions}
          />
          <ToggleSwitch
            label="Layout spacing"
            checked={gaps}
            onChange={(checked) => {
              updateAndApplySettings({ gaps: checked })
              if (!checked && rounded) {
                updateAndApplySettings({ rounded: false })
              }
            }}
          />
          <ToggleSwitch
            label="Rounded corners"
            checked={gaps && rounded}
            onChange={(checked) => updateAndApplySettings({ rounded: checked })}
            disabled={!gaps}
          />
        </div>
      </div>
    </div>
  )
}
