import type { EprelStatus } from '../lib/eprel'
import { cx } from '../lib/utils'
import SpinnerIcon from './Spinner'

// Heroicons mini: check-circle, exclamation-triangle, x-circle, question-mark-circle
const ICONS = {
  check:
    'M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z',
  warning:
    'M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  cross:
    'M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z',
  unknown:
    'M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-.182-.75c.25-.254.666-.474 1.242-.474.576 0 .992.22 1.242.474.255.26.383.583.383.883 0 .43-.195.7-.535.979a5.24 5.24 0 0 1-.442.315l-.047.03c-.163.104-.343.218-.493.343-.344.285-.618.67-.618 1.26a.75.75 0 0 0 1.5 0c0-.084.019-.12.075-.167.083-.07.192-.14.344-.236l.056-.036c.164-.105.364-.233.548-.385.43-.355.862-.928.862-1.803 0-.69-.288-1.36-.81-1.894C11.425 4.736 10.75 4.5 10 4.5c-.75 0-1.425.236-1.966.786a.75.75 0 1 0 1.07 1.05l-.164-.396ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
}

function normalizeSpaces(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function describe(status: EprelStatus) {
  switch (status.kind) {
    case 'match':
      return {
        icon: ICONS.check,
        color: 'text-emerald-500/70 dark:text-emerald-400/60',
        title: `Found in EPREL: ${status.product.supplierOrTrademark} ${status.product.modelIdentifier}`
      }
    case 'mismatch':
      return {
        icon: ICONS.warning,
        color: 'text-amber-400/75 dark:text-amber-300/60',
        title: `Found in EPREL, but it's a different product group (${status.product.productGroup}): ${status.product.supplierOrTrademark} ${status.product.modelIdentifier}`
      }
    case 'other-model':
      return {
        icon: ICONS.warning,
        color: 'text-amber-400/75 dark:text-amber-300/60',
        title: `This EPREL ID belongs to another model: ${normalizeSpaces(status.product.supplierOrTrademark)} ${normalizeSpaces(status.product.modelIdentifier)}`
      }
    case 'not-found':
      return {
        icon: ICONS.cross,
        color: 'text-rose-400/80 dark:text-rose-400/60',
        title: 'Not found in EPREL'
      }
    case 'invalid':
      return {
        icon: ICONS.cross,
        color: 'text-rose-400/80 dark:text-rose-400/60',
        title: 'An EPREL ID is a number of up to 12 digits'
      }
    case 'error':
      return {
        icon: ICONS.unknown,
        color: 'text-neutral-400 dark:text-slate-500',
        title: "Couldn't reach EPREL to check this ID"
      }
    default:
      return null
  }
}

export default function EprelStatusIcon({ status }: { status: EprelStatus }) {
  if (status.kind === 'loading')
    return (
      <span class="flex [&_svg]:size-4" title="Checking EPREL…">
        <SpinnerIcon />
      </span>
    )

  const description = describe(status)
  if (!description) return null

  return (
    <svg
      role="img"
      aria-label={description.title}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class={cx('size-4', description.color)}
    >
      <title>{description.title}</title>
      <path fillRule="evenodd" d={description.icon} clipRule="evenodd" />
    </svg>
  )
}
