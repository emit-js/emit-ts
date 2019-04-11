import { Emit } from "../"

let emit: Emit;

beforeEach(function () {
  emit = new Emit()
})

describe("any name", function () {
  test("calls listener", function () {
    expect.assertions(1)

    emit.any("a", function () {
      expect(true).toBe(true)
    })

    return emit.emit("a")
  })

  test("calls listener (broad id match)", function () {
    expect.assertions(1)

    emit.any("a", function () {
      expect(true).toBe(true)
    })

    return emit.emit(["a", "b"])
  })

  test("returns value from async listener", function () {
    expect.assertions(1)

    emit.any(["a"], async function () {
      return true
    })

    return emit.emit(["a"]).then(out => {
      expect(out).toBe(true)
    })
  })

  test("doesn't call non-matching listener", function () {
    expect.assertions(0)

    emit.any("a", function () {
      expect(true).toBe(true)
    })

    emit.emit(["b"])
    emit.emit()
  })
})
