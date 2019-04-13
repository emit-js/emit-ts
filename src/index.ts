export interface EventType {
  any: (nestedId: EventIdType, fn: (...args) => any) => void
  args: any[];
  cancel?: boolean;
  emit: (nestedId: EventIdType, ...args) => any,
  id: string[];
  name: string;
  promises: Set<Promise<any>>,
  state: object,
  value?: any;
}

export type ListenerType = (e: EventType, ...arg) => any

export type ListenersType = Record<string, ListenerType[]>

export type EventIdType = (
  (string | string[])[] | string | null | undefined
)

export class Emit {
  private anyListeners: ListenersType
  private onListeners: ListenersType
  private promises: Set<Promise<any>>
  private state: object

  public constructor() {
    this.anyListeners = {}
    this.onListeners = {}
    this.promises = new Set()
    this.state = {}
  }

  public any(
    nestedId: EventIdType,
    fn: (...args) => any
  ): void {
    const id = this.flattenNestedIds(nestedId)
    const key = id.join(".")

    this.anyListeners[key] = this.anyListeners[key] || []
    this.anyListeners[key].push(fn)
    
    if (id.length === 1) {
      this[id[0]] = (nestedId: EventIdType, ...args): any =>
        this.emit(
          Array.isArray(nestedId) ?
            [id[0], ...nestedId] :
            [id[0], nestedId],
          ...args
        )
    }
  }
  
  public emit(nestedId?: EventIdType, ...args): any {
    const id = this.flattenNestedIds(nestedId)
    const e: EventType = {
      any: this.any.bind(this),
      args,
      emit: this.emit.bind(this),
      id: id.slice(1),
      name: id[0],
      promises: new Set(),
      state: this.state
    }
    
    this.callListener(args, e, this.anyListeners[""])

    let key: string

    for (const i of id) {
      key = key ? key + "." + i : i
      this.callListener(args, e, this.anyListeners[key])
    }

    this.callListener(
      args, e, this.onListeners[id.join(".")]
    )

    if (e.promises.size) {
      const promise = Promise.all(e.promises)
        .then((results): any => {
          this.promises.delete(promise)
          return e.value === undefined
            ? results.length < 2
              ? results[0]
              : results
            : e.value
        })
        .catch((err): void => {
          this.promises.delete(promise)
          throw err
        })

      this.promises.add(promise)
      return promise
    }

    return e.value
  }

  public on(
    nestedId: EventIdType, fn: (...args) => any
  ): void {
    const id = this.flattenNestedIds(nestedId)
    const key = id.join(".")

    this.onListeners[key] = this.onListeners[key] || []
    this.onListeners[key].push(fn)
  }

  private callListener(
    args: any[],
    e: EventType,
    listeners: ListenerType[]
  ): void {
    if (listeners) {
      for (const fn of listeners) {
        if (!e.cancel) {
          const out = fn(e, ...args)
          if (out && out.then) {
            e.promises.add(out)
          } else if (out !== undefined) {
            e.value = e.value || out
          }
        }
      }
    }
  }

  private flattenNestedIds(
    nestedId: EventIdType
  ): string[] {
    if (Array.isArray(nestedId)) {
      let result = []
      for (const item of nestedId) {
        result = result.concat(item)
      }
      return result
    } else if (nestedId) {
      return [nestedId]
    } else {
      return []
    }
  }
}
