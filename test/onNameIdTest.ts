import { Emit } from "../"

let emit: Emit;

beforeEach((): void => {
  emit = new Emit()
})

describe("on name & id", (): void => {
  test("calls listener", (): void => {
    expect.assertions(1)

    emit.on(["a", "b"], (): void => {
      expect(true).toBe(true)
    })

    emit.emit(["a", "b"])
  })

  test("returns value from async listener", (): Promise<void> => {
    expect.assertions(1)

    emit.on(["a", "b"], async (): Promise<boolean> => {
      return true
    })

    return emit.emit(["a", "b"]).then((out): void => {
      expect(out).toBe(true)
    })
  })

  test("doesn't call non-matching listener", (): void => {
    expect.assertions(0)

    emit.on(["a", "b"], (): void => {
      expect(true).toBe(true)
    })

    emit.emit(["a", "b", "c"])
  })
})
