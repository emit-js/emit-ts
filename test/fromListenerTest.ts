import { Emit } from "../"

let emit: Emit;

beforeEach(function () {
  emit = new Emit()
})

describe("from listener", function () {
  test("any", function () {
    expect.assertions(1)

    emit.any("a", function (e) {
      e.any("b", function () {
        expect(true).toBe(true)
      })
    })

    emit.emit("a")
    emit.emit("b")
  })

  test("emit", function () {
    expect.assertions(1)

    emit.any("a", function (e) {
      e.emit("b")
    })

    emit.any("b", function (e) {
      expect(true).toBe(true)
    })

    return emit.emit("a")
  })
})
