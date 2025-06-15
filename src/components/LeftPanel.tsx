import { NPM_BETA_URL, TEMPLATES } from '../lib/constants'
import { withResizableSidebar, type ResizableSidebarProps } from '../lib/resizable-sidebar'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'
import Select from './Select'
import { cx } from '../lib/utils'

const FLAG_OPTIONS = [
  {
    value: 'EU',
    label: 'European Union',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" className="size-6" fill="none">
        <path fill="#034EA2" d="M0 56h56V0H0v56Z" />
        <path
          fill="#FFF200"
          d="M26.573 8.725 27.413 6l.827 2.725h2.818l-2.263 1.771.867 2.793-2.249-1.716-2.25 1.716.895-2.793-2.29-1.771h2.805ZM26.748 44.724l.907-2.732.878 2.732h2.98l-2.404 1.769.936 2.788-2.39-1.712-2.404 1.712.95-2.788-2.433-1.77h2.98ZM35.685 42.446l.854-2.732.826 2.732h2.805L37.907 44.2l.88 2.802-2.248-1.726-2.263 1.726.894-2.802-2.29-1.755h2.805ZM35.685 11.01l.854-2.732.826 2.732h2.805l-2.263 1.755.88 2.803-2.248-1.727-2.263 1.727.894-2.803-2.29-1.755h2.805ZM42.519 17.673l.84-2.561.826 2.56h2.819l-2.263 1.646.867 2.628-2.25-1.606-2.248 1.606.894-2.628-2.29-1.645h2.805ZM42.519 35.892l.84-2.556.826 2.556h2.819l-2.263 1.655.867 2.623-2.25-1.616-2.248 1.615.894-2.622-2.29-1.655h2.805ZM44.783 26.771l.854-2.547.826 2.547h2.818l-2.262 1.66.867 2.627-2.25-1.62-2.248 1.62.88-2.628-2.276-1.659h2.791ZM17.461 10.996l.854-2.718.826 2.718h2.805l-2.263 1.769.881 2.803-2.249-1.727-2.263 1.727.895-2.803-2.29-1.77h2.804ZM11.083 17.838l.853-2.726.827 2.726h2.805l-2.263 1.766.88 2.797-2.249-1.723L9.674 22.4l.894-2.797-2.29-1.766h2.805ZM8.805 26.78l.853-2.556.827 2.556h2.805l-2.263 1.655.88 2.623-2.249-1.616-2.262 1.616.894-2.623L6 26.78h2.805ZM11.083 35.892l.853-2.556.827 2.556h2.805l-2.263 1.655.88 2.623-2.249-1.616-2.262 1.615.894-2.622-2.29-1.655h2.805ZM17.637 42.44l.892-2.726.893 2.726h2.98l-2.404 1.766.921 2.797-2.39-1.723-2.39 1.723.95-2.797-2.432-1.766h2.98Z"
        />
      </svg>
    )
  },
  {
    value: 'UK',
    label: 'Great Britain',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" className="size-6" fill="none">
        <g clipPath="url(#a)">
          <path fill="#034EA2" d="M-1.07.02v56h59v-56h-59Z" />
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M21.51 28.02-3.07 4.682.592-4.98l27.836 26.43L56.266-4.98l3.663 9.662L35.35 28.02l24.58 23.338-3.663 9.662-27.837-26.43L.593 61.02l-3.664-9.662L21.51 28.02Z"
            clipRule="evenodd"
          />
          <mask id="b" width="61" height="57" x="-2" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }}>
            <path fill="#fff" d="M28.358 28.04h29.735v27.972L28.358 28.04Zm0 0v27.972H-1.377L28.358 28.04Zm0 0H-1.377V.068L28.358 28.04Zm0 0V.068h29.735L28.358 28.04Z" />
          </mask>
          <g mask="url(#b)">
            <path
              fill="#DA2E33"
              fillRule="evenodd"
              d="M23.735 28.04-2.601 3.266-.153-3.13l28.511 26.82L56.87-3.13l2.448 6.396L32.982 28.04l26.335 24.774-2.448 6.396-28.51-26.82L-.154 59.21-2.6 52.814 23.735 28.04Z"
              clipRule="evenodd"
            />
          </g>
          <path fill="#DA2E33" d="M-15.317 20.56h37.016V-1.816h13.46v22.378h37.017v14.918H35.158v22.378H21.7V35.479h-37.016V20.561Z" />
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M20.016-3.682h16.826v22.378h37.016v18.648H36.842v22.378H20.016V37.344H-17V18.696h37.016V-3.682Zm3.365 3.73v22.378h-37.016v11.189h37.016v22.377h10.096V33.615h37.016v-11.19H33.477V.049H23.38Z"
            clipRule="evenodd"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h56v56H0z" />
          </clipPath>
        </defs>
      </svg>
    )
  }
]

function LeftPanel({ isCollapsed }: ResizableSidebarProps) {
  const { template, setTemplate, setData, data } = useEnergyLabelStore()

  return (
    <div class="panel w-full flex flex-col items-start justify-between">
      <div class="w-full flex flex-col gap-3">
        <div class="px-2 pt-1 pb-9 border-b border-neutral-200/50 dark:border-neutral-800">
          <div class="size-10 grid place-content-center">
            <span class="absolute -top-2 -left-3 text-7xl text-purple-500 blur-lg opacity-20">⚡︎</span>
            <span class="text-3xl -rotate-12 ">⚡︎</span>
            <span class="absolute -top-2 left-1 text-7xl text-blue-500 blur-2xl opacity-80">⚡︎</span>
          </div>
          {!isCollapsed && (
            <div class="px-2">
              <h1 class="text-xl font-semibold">Energy Label Studio</h1>
              <small class="p-0.5 mr-2 font-bold text-[9px] bg-purple-200 dark:bg-purple-800 rounded-xs text-purple-500 dark:text-purple-200">BETA</small>
              <p class="inline-block text-xs text-neutral-500">
                Powered by{' '}
                <a href={NPM_BETA_URL} target="_blank">
                  energy-label
                </a>
              </p>
            </div>
          )}
        </div>
        <div class="px-2">
          <Select
            onChange={event => {
              setData({ flagOrigin: event.currentTarget.value as any })
            }}
            //@ts-ignore
            value={data?.flagOrigin}
            selectClassName="collapsible"
            options={FLAG_OPTIONS}
            isCollapsed={isCollapsed}
            className="-mt-8.5 bg-neutral-50 dark:bg-neutral-900"
          />
          <div class="py-3">
            <h2 class="mb-1 px-2 text-xs text-neutral-500">Products</h2>
            <nav class="">
              {TEMPLATES.map(t => (
                <button onClick={() => setTemplate(t.value)} class={cx('py-1 button w-full text-left font-medium truncate', template === t.value && 'bg-neutral-200/50 dark:bg-neutral-800')}>
                  {t.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div class="p-2">
        <button class="button text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default withResizableSidebar(LeftPanel, { minWidth: 200, maxWidth: 280, defaultWidth: 250 })
