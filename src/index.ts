export type ListenersType = Record<
  string,
  ((emit: Emit, prop: PropType, ...arg) => any)[]
>

export type PropType = (
  (string | string[])[] | string | null | undefined
)

export class Emit {
  anyListeners: ListenersType
  onListeners: ListenersType

  constructor() {
    this.anyListeners = {}
    this.onListeners = {}
  }

  any(prop: PropType, fn: (...arg) => any) {
    const p = this.flatten(prop)
    const key = p.join(".")

    this.anyListeners[key] = this.anyListeners[key] || []
    this.anyListeners[key].push(fn)
    
    if (p.length === 1) {
      this[p[0]] = (prop: PropType, ...args) =>
        this.emit(
          Array.isArray(prop) ?
            [p[0], ...prop] :
            [p[0], prop],
          ...args
        )
    }
  }
  
  emit(prop: PropType, ...arg) {
    const p = this.flatten(prop)
    
    if (this.anyListeners[""]) {
      for (const fn of this.anyListeners[""]) {
        fn(this, p, ...arg)
      }
    }

    let key

    for (const prop of p) {
      key = key ? key + "." + prop : prop;
      if (this.anyListeners[key]) {
        for (const fn of this.anyListeners[key]) {
          fn(this, p, ...arg)
        }
      }
    }

    key = p.join(".")

    if (this.onListeners[key]) {
      for (const fn of this.onListeners[key]) {
        fn(this, p, ...arg)
      }
    }
  }

  flatten(array: PropType): string[] {
    if (Array.isArray(array)) {
      let result = []
      for (const item of array) {
        result = result.concat(item)
      }
      return result
    } else if (array) {
      return [array]
    } else {
      return []
    }
  }
}
