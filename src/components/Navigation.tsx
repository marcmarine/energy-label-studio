import { TEMPLATE_ICONS, TEMPLATES, TEMPLATES_DISABLED } from '../lib/constants'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'
import { cx } from '../lib/utils'

const generateLink = (product: string) =>
  `?${new URLSearchParams({ product }).toString()}`

export default function Navigation({ isCollapsed }: { isCollapsed: boolean }) {
  const { template: storedTemplate } = useEnergyLabelStore()

  if (isCollapsed)
    return (
      <nav class="flex flex-col gap-1">
        {TEMPLATES.map((template) => (
          <a
            href={generateLink(template.value)}
            class={cx(
              'button size-9 flex place-content-center',
              storedTemplate === template.value &&
                'bg-neutral-200/50 dark:bg-slate-700/20'
            )}
          >
            {TEMPLATE_ICONS[template.value]}
          </a>
        ))}
      </nav>
    )

  return (
    <>
      <h2 class="mb-1 px-2 text-xs text-neutral-500 dark:text-slate-500">
        Products
      </h2>
      <nav class="flex flex-col">
        {TEMPLATES.map((template) => (
          <a
            href={generateLink(template.value)}
            class={cx(
              'py-1 button text-sm w-full text-left font-medium truncate',
              storedTemplate === template.value &&
                'bg-neutral-200/50 dark:bg-slate-700/20'
            )}
          >
            {template.name}
          </a>
        ))}
        <div class="mb-1 px-2 py-1">
          <span class="p-0.5 font-bold text-[10px] bg-neutral-200 dark:bg-slate-700/80 rounded-xs text-neutral-400/80 dark:text-slate-40 whitespace-nowrap">
            Coming soon
          </span>
        </div>
        {TEMPLATES_DISABLED.map((template) => (
          <a
            href={generateLink(template.value)}
            class={cx(
              'py-1 button text-sm w-full text-left font-medium truncate',
              storedTemplate === template.value &&
                'bg-neutral-200/50 dark:bg-slate-700/20',
              template.disabled &&
                'pointer-events-none text-neutral-400 dark:text-slate-600'
            )}
          >
            {template.name}
          </a>
        ))}
      </nav>
    </>
  )
}
