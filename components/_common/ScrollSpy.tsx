export const x = 0

declare global {
  interface GlobalEvents {
    pageVisible: { tag: string }
  }
}
