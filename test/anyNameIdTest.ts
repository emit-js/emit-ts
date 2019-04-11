import { Emit } from "../"

let emit: Emit;

beforeEach(function () {
  emit = new Emit()
})

describe("any name & id", function () {
  test("calls listener", function () {
    expect.assertions(1)

    emit.any(["a", "b"], function () {
      expect(true).toBe(true)
    })

    return emit.emit(["a", "b"])
  })

  test("calls listener (broad id match)", function () {
    expect.assertions(1)

    emit.any(["a", "b"], function () {
      expect(true).toBe(true)
    })

    return emit.emit(["a", "b", "c"])
  })

  test("returns value from async listener", function () {
    expect.assertions(1)

    emit.any(["a", "b"], async function () {
      return true
    })

    return emit.emit(["a", "b", "c"]).then(out => {
      expect(out).toBe(true)
    })
  })

  test("doesn't call non-matching listener", function () {
    expect.assertions(0)

    emit.any(["a", "b"], function () {
      expect(true).toBe(true)
    })

    emit.emit(["a", "c"])
    emit.emit(["a"])
    emit.emit()
  })
})
