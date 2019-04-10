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

  any(id: IdType, fn: (...args) => any) {
    const p = this.flatten(id)
    const key = p.join(".")

    this.anyListeners[key] = this.anyListeners[key] || []
    this.anyListeners[key].push(fn)
    
    if (p.length === 1) {
      this[p[0]] = (id: IdType, ...args) =>
        this.emit(
          Array.isArray(id) ?
            [p[0], ...id] :
            [p[0], id],
          ...args
        )
    }
  }
  
  emit(id: IdType, ...args) {
    const i = this.flatten(id)
    const e: Event = {
      args,
      emit: this,
      id: i.slice(1),
      name: i[0]
    }
    
    if (this.anyListeners[""]) {
      for (const fn of this.anyListeners[""]) {
        fn(e, ...args)
      }
    }

    let key

    for (const id of i) {
      key = key ? key + "." + id : id;
      if (this.anyListeners[key]) {
        for (const fn of this.anyListeners[key]) {
          fn(e, ...args)
        }
      }
    }

    key = i.join(".")

    if (this.onListeners[key]) {
      for (const fn of this.onListeners[key]) {
        fn(e, ...args)
      }
    }
  }

  flatten(array: IdType): string[] {
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
