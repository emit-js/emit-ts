import { Emit } from "../"

let emit: Emit;

beforeEach((): void => {
  emit = new Emit()
})

describe("any name", (): void => {
  test("calls listener", (): void => {
    expect.assertions(1)

    emit.any("a", (): void => {
      expect(true).toBe(true)
    })

    emit.emit("a")
  })

  test("calls listener (broad id match)", (): void => {
    expect.assertions(1)

    emit.any("a", (): void => {
      expect(true).toBe(true)
    })

    emit.emit(["a", "b"])
  })

  test("returns value from async listener", (): Promise<void> => {
    expect.assertions(1)

    emit.any(["a"], async (): Promise<boolean> => {
      return true
    })

    return emit.emit(["a"]).then((out): void => {
      expect(out).toBe(true)
    })
  })

  test("doesn't call non-matching listener", (): void => {
    expect.assertions(0)

    emit.any("a", (): void => {
      expect(true).toBe(true)
    })

    emit.emit(["b"])
    emit.emit()
  })
})
