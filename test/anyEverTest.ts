import { Emit } from "../"

let emit: Emit;

beforeEach((): void => {
  emit = new Emit()
})

describe("any ever", (): void => {
  test("calls listener", (): void => {
    expect.assertions(1)

    emit.emit(["a", "b"])

    emit.any("a", (): void => {
      expect(true).toBe(true)
    }, true)
  })
})
