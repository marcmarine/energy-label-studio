declare global {
  namespace preact.JSX {
    interface IntrinsicElements {
      // biome-ignore lint/suspicious/noExplicitAny: Experimental
      selectedcontent: any
      'va-code-block': Omit<
        preact.JSX.HTMLAttributes<HTMLElement>,
        'onChange'
      > & {
        text?: string
        language?: string
        selected?: string
        onChange?: (
          event: CustomEvent<{ label: string; language: string; value: string }>
        ) => void
      }
    }
  }
}

export {}
