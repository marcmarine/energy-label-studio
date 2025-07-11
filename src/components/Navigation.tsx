import type { TemplateName } from 'energy-label'
import { PRODUCT_ICONS, PRODUCTS, PRODUCTS_DISABLED } from '../lib/constants'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'
import { cx, navigateWithParams } from '../lib/utils'

export default function Navigation({ isCollapsed }: { isCollapsed: boolean }) {
  const { template: storedTemplate } = useEnergyLabelStore()

  if (isCollapsed)
    return (
      <nav class="flex flex-col gap-1">
        {PRODUCTS.map((product) => (
          <a
            href={navigateWithParams(`/${product.key}`)}
            class={cx(
              'button size-9 flex place-content-center',
              storedTemplate === product.key &&
                'bg-neutral-200/50 dark:bg-slate-700/20'
            )}
          >
            {PRODUCT_ICONS[product.key as TemplateName]}
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
        {PRODUCTS.map((product) => (
          <a
            href={navigateWithParams(`/${product.key}`)}
            class={cx(
              'py-1 button text-sm w-full text-left font-medium truncate',
              storedTemplate === product.key &&
                'bg-neutral-200/50 dark:bg-slate-700/20'
            )}
          >
            {product.name}
          </a>
        ))}
        <div class="mb-1 px-2 py-1">
          <span class="p-0.5 font-bold text-[10px] bg-neutral-200 dark:bg-slate-700/80 rounded-xs text-neutral-400/80 dark:text-slate-40 whitespace-nowrap">
            Coming soon
          </span>
        </div>
        {PRODUCTS_DISABLED.map((product) => (
          <a
            href={navigateWithParams(`/${product.value}`)}
            class={cx(
              'py-1 button text-sm w-full text-left font-medium truncate',
              storedTemplate === product.value &&
                'bg-neutral-200/50 dark:bg-slate-700/20',
              product.disabled &&
                'pointer-events-none text-neutral-400 dark:text-slate-600'
            )}
          >
            {product.name}
          </a>
        ))}
      </nav>
    </>
  )
}
