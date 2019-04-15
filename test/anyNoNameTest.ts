import { Emit } from "../"

let emit: Emit;

beforeEach((): void => {
  emit = new Emit()
})

describe("any no name", (): void => {
  test("calls listener", (): void => {
    expect.assertions(1)

    emit.any(null, (): void => {
      expect(true).toBe(true)
    })

    emit.emit(null)
  })

  test("calls listener (broad name match)", (): void => {
    expect.assertions(1)

    emit.any(null, (): void => {
      expect(true).toBe(true)
    })

    emit.emit("a")
  })

  test("calls listener (broad id match)", (): void => {
    expect.assertions(1)

    emit.any(null, (): void => {
      expect(true).toBe(true)
    })

    emit.emit(["a", "b"])
  })

  test("returns value from async listener", (): Promise<void> => {
    expect.assertions(1)

    emit.any(null, async (): Promise<boolean> => {
      return true
    })

    return emit.emit().then((out): void => {
      expect(out).toBe(true)
    })
  })
})
