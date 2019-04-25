[@emit-js/emit](../README.md) > ["emit"](../modules/_emit_.md) > [Emit](../classes/_emit_.emit.md)

# Class: Emit

## Hierarchy

**Emit**

## Index

### Constructors

- [constructor](_emit_.emit.md#constructor)

### Properties

- [anyListeners](_emit_.emit.md#anylisteners)
- [onListeners](_emit_.emit.md#onlisteners)
- [promises](_emit_.emit.md#promises)

### Methods

- [any](_emit_.emit.md#any)
- [callListener](_emit_.emit.md#calllistener)
- [emit](_emit_.emit.md#emit)
- [flattenNestedIds](_emit_.emit.md#flattennestedids)
- [on](_emit_.emit.md#on)

---

## Constructors

<a id="constructor"></a>

### constructor

⊕ **new Emit**(): [Emit](_emit_.emit.md)

_Defined in emit.ts:22_

**Returns:** [Emit](_emit_.emit.md)

---

## Properties

<a id="anylisteners"></a>

### `<Private>` anyListeners

**● anyListeners**: _[ListenersType](../modules/_emit_.md#listenerstype)_

_Defined in emit.ts:20_

---

<a id="onlisteners"></a>

### `<Private>` onListeners

**● onListeners**: _[ListenersType](../modules/_emit_.md#listenerstype)_

_Defined in emit.ts:21_

---

<a id="promises"></a>

### `<Private>` promises

**● promises**: _`Set`<`Promise`<`any`>>_

_Defined in emit.ts:22_

---

## Methods

<a id="any"></a>

### any

▸ **any**(nestedId: _[EventIdType](../modules/_emit_.md#eventidtype)_, fn: _[ListenerType](../modules/_emit_.md#listenertype)_): `void`

_Defined in emit.ts:30_

**Parameters:**

| Name     | Type                                              |
| -------- | ------------------------------------------------- |
| nestedId | [EventIdType](../modules/_emit_.md#eventidtype)   |
| fn       | [ListenerType](../modules/_emit_.md#listenertype) |

**Returns:** `void`

---

<a id="calllistener"></a>

### `<Private>` callListener

▸ **callListener**(args: _`any`[]_, e: _[EventType](../interfaces/_emit_.eventtype.md)_, listeners: _[ListenerType](../modules/_emit_.md#listenertype)[]_): `void`

_Defined in emit.ts:107_

**Parameters:**

| Name      | Type                                                |
| --------- | --------------------------------------------------- |
| args      | `any`[]                                             |
| e         | [EventType](../interfaces/_emit_.eventtype.md)      |
| listeners | [ListenerType](../modules/_emit_.md#listenertype)[] |

**Returns:** `void`

---

<a id="emit"></a>

### emit

▸ **emit**(nestedId?: _[EventIdType](../modules/_emit_.md#eventidtype)_, ...args: _`any`[]_): `any`

_Defined in emit.ts:51_

**Parameters:**

| Name                | Type                                            |
| ------------------- | ----------------------------------------------- |
| `Optional` nestedId | [EventIdType](../modules/_emit_.md#eventidtype) |
| `Rest` args         | `any`[]                                         |

**Returns:** `any`

---

<a id="flattennestedids"></a>

### `<Private>` flattenNestedIds

▸ **flattenNestedIds**(nestedId: _[EventIdType](../modules/_emit_.md#eventidtype)_): `string`[]

_Defined in emit.ts:126_

**Parameters:**

| Name     | Type                                            |
| -------- | ----------------------------------------------- |
| nestedId | [EventIdType](../modules/_emit_.md#eventidtype) |

**Returns:** `string`[]

---

<a id="on"></a>

### on

▸ **on**(nestedId: _[EventIdType](../modules/_emit_.md#eventidtype)_, fn: _[ListenerType](../modules/_emit_.md#listenertype)_): `void`

_Defined in emit.ts:96_

**Parameters:**

| Name     | Type                                              |
| -------- | ------------------------------------------------- |
| nestedId | [EventIdType](../modules/_emit_.md#eventidtype)   |
| fn       | [ListenerType](../modules/_emit_.md#listenertype) |

**Returns:** `void`

---
