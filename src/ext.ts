import { Emit } from "./index"

declare module "./index" {
  interface Emit {
    hello(id: IdType, flag: boolean)
  }
}

export function ext(emit: Emit) {
  emit.any("hello", () => console.log("hello"))
}
