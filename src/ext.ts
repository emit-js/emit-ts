import { Emit } from "./index"

declare module "./index" {
  interface Emit {
    hello(id: EventIdType, flag: boolean): boolean
  }
}

export function ext(emit: Emit) {
  emit.any("hello", () => true)
}
