import { Emit } from "./index"

declare module "./index" {
  interface Emit {
    hello(prop: PropType, flag: boolean)
  }
}

export function ext(emit: Emit) {
  emit.any("hello", () => console.log("hello"))
}
