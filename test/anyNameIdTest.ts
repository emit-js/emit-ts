import { Emit } from "../"

let emit: Emit;

beforeEach((): void => {
  emit = new Emit()
})

describe("any name & id", (): void => {
  test("calls listener", (): void => {
    expect.assertions(1)

    emit.any(["a", "b"], (): void => {
      expect(true).toBe(true)
    })

    emit.emit(["a", "b"])
  })

  test("calls listener (broad id match)", (): void => {
    expect.assertions(1)

    emit.any(["a", "b"], (): void => {
      expect(true).toBe(true)
    })

    return emit.emit(["a", "b", "c"])
  })

  test("returns value from async listener", (): Promise<void> => {
    expect.assertions(1)

    emit.any(["a", "b"], async (): Promise<boolean> => {
      return true
    })

    return emit.emit(["a", "b", "c"]).then((out): void => {
      expect(out).toBe(true)
    })
  })

  test("doesn't call non-matching listener", (): void => {
    expect.assertions(0)

    emit.any(["a", "b"], (): void => {
      expect(true).toBe(true)
    })

    emit.emit(["a", "c"])
    emit.emit(["a"])
    emit.emit()
  })
})
