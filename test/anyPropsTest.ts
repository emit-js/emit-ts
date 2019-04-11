import { Emit } from "../"

let emit: Emit;

beforeEach(function () {
  emit = new Emit()
})

describe("any (props)", function () {
  test("calls listener", function () {
    expect.assertions(1)

    emit.any("a", function () {
      expect(true).toBe(true)
    })

    return emit.emit(["a", "b"])
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

  test("calls listener with arguments", function () {
    expect.assertions(6)

    emit.any("a", function (e, ...args) {
      expect(args).toEqual([1, 2, 3])
      expect(e.args).toEqual([1, 2, 3])
      expect(e.id).toEqual(["b"])
      expect(e.name).toBe("a")
      expect(e.promises).toEqual(expect.any(Set))
      expect(e.state).toEqual({})
    })

    return emit.emit(["a", ["b"]], 1, 2, 3)
  })

  test("doesn't call non-matching listener", function () {
    expect.assertions(0)

    emit.any(["a", "b"], function () {
      expect(true).toBe(true)
    })

    return emit.emit(["a", "c"])
  })
})
