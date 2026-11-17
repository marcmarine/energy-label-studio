import 'va-code-block'
import {
  CODE_VARIANTS,
  type CodeVariant,
  getLabelSnippet,
  INSTALL_COMMANDS,
  type PackageManager
} from '../lib/codeSnippet'
import { ENERGY_LABEL_DOCS_URL } from '../lib/constants'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'
import { useSettingsStore } from '../lib/useSettingsStore'
import { updateAndApplySettings } from '../lib/utils'

export default function CodePanel() {
  const template = useEnergyLabelStore((state) => state.template)
  const templateData = useEnergyLabelStore(
    (state) => state.data?.[state.template]
  )
  const codeVariant = useSettingsStore((state) => state.codeVariant)
  const packageManager = useSettingsStore((state) => state.packageManager)

  return (
    <div class="px-2 pt-2 pb-4 overflow-auto">
      <h3 class="px-1 mb-4 text-sm font-medium">Installation</h3>
      <va-code-block
        class="block mb-6"
        selected={packageManager}
        onChange={(event) =>
          updateAndApplySettings({
            packageManager: event.detail.label as PackageManager
          })
        }
      >
        {INSTALL_COMMANDS.map(({ label, command }) => (
          <pre key={label} data-label={label}>
            <code class="language-bash">{command}</code>
          </pre>
        ))}
      </va-code-block>

      <h3 class="px-1 mb-4 text-sm font-medium">Usage</h3>
      <va-code-block
        class="block mb-4"
        selected={codeVariant}
        onChange={(event) =>
          updateAndApplySettings({
            codeVariant: event.detail.label as CodeVariant
          })
        }
      >
        {CODE_VARIANTS.map(({ label, language }) => (
          <pre key={label} data-label={label}>
            <code class={`language-${language}`}>
              {getLabelSnippet(label, template, templateData ?? {})}
            </code>
          </pre>
        ))}
      </va-code-block>

      <a
        href={ENERGY_LABEL_DOCS_URL}
        target="_blank"
        class="-mx-1 button text-xs text-neutral-500 dark:text-slate-500 hover:underline"
      >
        Read the energy-label documentation
      </a>
    </div>
  )
}
