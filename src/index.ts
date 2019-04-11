export interface Event {
  args: any[];
  cancel?: boolean;
  emit: Emit,
  id: string[];
  name: string;
  promises: Set<Promise<any>>,
  value?: any;
}

export type ListenerType = (e: Event, ...arg) => any

export type ListenersType = Record<string, ListenerType[]>

export type EventIdType = (
  (string | string[])[] | string | null | undefined
)

export class Emit {
  anyListeners: ListenersType
  onListeners: ListenersType
  promises: Set<Promise<any>>

  constructor() {
    this.anyListeners = {}
    this.onListeners = {}
    this.promises = new Set()
  }

  any(nestedId: EventIdType, fn: (...args) => any) {
    const id = this.flatten(nestedId)
    const key = id.join(".")

    this.anyListeners[key] = this.anyListeners[key] || []
    this.anyListeners[key].push(fn)
    
    if (id.length === 1) {
      this[id[0]] = (nestedId: EventIdType, ...args) =>
        this.emit(
          Array.isArray(nestedId) ?
            [id[0], ...nestedId] :
            [id[0], nestedId],
          ...args
        )
    }
  }
  
  callListener(args: any[], e: Event, fn: ListenerType) {
    if (!e.cancel) {
      const out = fn(e, ...args)
      if (out && out.then) {
        e.promises.add(out)
      } else if (out !== undefined) {
        e.value = e.value || out
      }
    }
  }
  
  emit(nestedId: EventIdType, ...args) {
    const id = this.flatten(nestedId)
    const e: Event = {
      args,
      emit: this,
      id: id.slice(1),
      name: id[0],
      promises: new Set()
    }
    
    if (this.anyListeners[""]) {
      for (const fn of this.anyListeners[""]) {
        this.callListener(args, e, fn)
      }
    }

    let key

    for (const i of id) {
      key = key ? key + "." + i : i

      if (this.anyListeners[key]) {
        for (const fn of this.anyListeners[key]) {
          this.callListener(args, e, fn)
        }
      }
    }

    key = id.join(".")

    if (this.onListeners[key]) {
      for (const fn of this.onListeners[key]) {
        this.callListener(args, e, fn)
      }
    }

    if (e.promises.size) {
      const promise = Promise.all(e.promises)
        .then(function (results) {
          this.promises.delete(promise)
          return e.value === undefined
            ? results.length < 2
              ? results[0]
              : results
            : e.value
        })
        .catch(function (err) {
          this.promises.delete(promise)
          throw err
        })

      this.promises.add(promise)
      return promise
    }

    return e.value
  }

  flatten(id: EventIdType): string[] {
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
