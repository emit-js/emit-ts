import { Emit } from "../"

let emit: Emit;

beforeEach((): void => {
  emit = new Emit()
})

describe("from listener", (): void => {
  test("any", (): void => {
    expect.assertions(1)

    emit.any("a", function (e): void {
      e.emit.any("b", (): void => {
        expect(true).toBe(true)
      })
    })

    emit.emit("a")
    emit.emit("b")
  })

  test("emit", (): void => {
    expect.assertions(1)

    emit.any("a", (e): void => {
      e.emit.emit("b")
    })

    emit.any("b", (): void => {
      expect(true).toBe(true)
    })

    emit.emit("a")
  })
})
