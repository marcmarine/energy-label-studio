declare global {
  namespace preact.JSX {
    interface IntrinsicElements {
      // biome-ignore lint/suspicious/noExplicitAny: Experimental
      selectedcontent: any
    }
  }
}

export {}
