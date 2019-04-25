[@emit-js/emit](../README.md) > ["emit"](../modules/_emit_.md)

# External module: "emit"

## Index

### Classes

- [Emit](../classes/_emit_.emit.md)

### Interfaces

- [EventType](../interfaces/_emit_.eventtype.md)

### Type aliases

- [EventIdType](_emit_.md#eventidtype)
- [ListenerType](_emit_.md#listenertype)
- [ListenersType](_emit_.md#listenerstype)

---

## Type aliases

<a id="eventidtype"></a>

### EventIdType

**Ƭ EventIdType**: _`string` \| (`string` \| `string`[])[]_

_Defined in emit.ts:15_

---

<a id="listenertype"></a>

### ListenerType

**Ƭ ListenerType**: _`function`_

_Defined in emit.ts:11_

#### Type declaration

▸(e: _[EventType](../interfaces/_emit_.eventtype.md)_, ...arg: _`any`[]_): `any`

**Parameters:**

| Name       | Type                                           |
| ---------- | ---------------------------------------------- |
| e          | [EventType](../interfaces/_emit_.eventtype.md) |
| `Rest` arg | `any`[]                                        |

**Returns:** `any`

---

<a id="listenerstype"></a>

### ListenersType

**Ƭ ListenersType**: _`Record`<`string`, [ListenerType](_emit_.md#listenertype)[]>_

_Defined in emit.ts:13_

---
