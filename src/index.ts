export interface Event {
  args: any[];
  cancel?: boolean;
  emit: Emit,
  id: string[];
  name: string;
  value?: any;
}

export type ListenerType = (e: Event, ...arg) => any

export type ListenersType = Record<string, ListenerType[]>

export type IdType = (
  (string | string[])[] | string | null | undefined
)

export class Emit {
  anyListeners: ListenersType
  onListeners: ListenersType

  constructor() {
    this.anyListeners = {}
    this.onListeners = {}
  }

  any(nestedId: IdType, fn: (...args) => any) {
    const id = this.flatten(nestedId)
    const key = id.join(".")

    this.anyListeners[key] = this.anyListeners[key] || []
    this.anyListeners[key].push(fn)
    
    if (id.length === 1) {
      this[id[0]] = (nestedId: IdType, ...args) =>
        this.emit(
          Array.isArray(nestedId) ?
            [id[0], ...nestedId] :
            [id[0], nestedId],
          ...args
        )
    }
  }
  
  emit(nestedId: IdType, ...args) {
    const id = this.flatten(nestedId)
    const e: Event = {
      args,
      emit: this,
      id: id.slice(1),
      name: id[0]
    }
    
    if (this.anyListeners[""]) {
      for (const fn of this.anyListeners[""]) {
        fn(e, ...args)
      }
    }

    let key

    for (const i of id) {
      key = key ? key + "." + i : i

      if (this.anyListeners[key]) {
        for (const fn of this.anyListeners[key]) {
          fn(e, ...args)
        }
      }
    }

    key = id.join(".")

    if (this.onListeners[key]) {
      for (const fn of this.onListeners[key]) {
        fn(e, ...args)
      }
    }
  }

  flatten(id: IdType): string[] {
    if (Array.isArray(id)) {
      let result = []
      for (const item of id) {
        result = result.concat(item)
      }
      return result
    } else if (id) {
      return [id]
    } else {
      return []
    }
  }
}
