import type { TemplateName } from 'energy-label'

// energy-label no longer exports this type since beta.13
export type ProductName = Exclude<TemplateName, 'arrow'>
