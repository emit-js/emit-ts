import { Emit } from "../"

let emit: Emit;

beforeEach(function () {
  emit = new Emit()
})

describe("any (no props)", function () {
  test("calls listener", function () {
    expect.assertions(1)

    emit.any(null, function () {
      expect(true).toBe(true)
    })

    return emit.emit(null)
  })

  test("returns value from async listener", function () {
    expect.assertions(1)

    emit.any(null, async function () {
      return true
    })

    return emit.emit(null).then(out => {
      expect(out).toBe(true)
    })
  })

  test("calls listener for any prop", function () {
    expect.assertions(1)

    emit.any(null, function () {
      expect(true).toBe(true)
    })

    return emit.emit(["a"])
  })

  test("calls listener with arguments", function () {
    expect.assertions(6)

    emit.any(null, function (e, ...args) {
      expect(args).toEqual([1, 2, 3])
      expect(e.args).toEqual([1, 2, 3])
      expect(e.emit).toEqual(emit)
      expect(e.id).toEqual(["b"])
      expect(e.name).toBe("a")
      expect(e.promises).toEqual(expect.any(Set))
    })

    return emit.emit(["a", ["b"]], 1, 2, 3)
  })
})
