import { Emit } from "../"

let emit: Emit;

beforeEach((): void => {
  emit = new Emit()
})

describe("on no name", (): void => {
  test("calls listener", (): void => {
    expect.assertions(1)

    emit.on(null, (): void => {
      expect(true).toBe(true)
    })

    emit.emit(null)
  })

  test("returns value from async listener", (): Promise<void> => {
    expect.assertions(1)

    emit.on(null, async (): Promise<boolean> => {
      return true
    })

    return emit.emit().then((out): void => {
      expect(out).toBe(true)
    })
  })

  test("doesn't call non-matching listener", (): void => {
    expect.assertions(0)

    emit.on(null, (): void => {
      expect(true).toBe(true)
    })

    emit.emit("a")
  })
})
