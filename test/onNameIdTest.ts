import { Emit } from "../"

let emit: Emit;

beforeEach(function () {
  emit = new Emit()
})

describe("on name & id", function () {
  test("calls listener", function () {
    expect.assertions(1)

    emit.on(["a", "b"], function () {
      expect(true).toBe(true)
    })

    return emit.emit(["a", "b"])
  })

  test("returns value from async listener", function () {
    expect.assertions(1)

    emit.on(["a", "b"], async function () {
      return true
    })

    return emit.emit(["a", "b"]).then(out => {
      expect(out).toBe(true)
    })
  })

  test("doesn't call non-matching listener", function () {
    expect.assertions(0)

    emit.on(["a", "b"], function () {
      expect(true).toBe(true)
    })

    return emit.emit(["a", "b", "c"])
  })
})
