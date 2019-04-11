import { Emit } from "../"

let emit: Emit;

beforeEach(function () {
  emit = new Emit()
})

describe("any args", function () {
  test("null id", function () {
    expect.assertions(6)

    emit.any(null, function (e, ...args) {
      expect(args).toEqual([1, 2, 3])
      expect(e.args).toEqual([1, 2, 3])
      expect(e.id).toEqual(["b"])
      expect(e.name).toBe("a")
      expect(e.promises).toEqual(expect.any(Set))
      expect(e.state).toEqual({})
    })

    return emit.emit(["a", ["b"]], 1, 2, 3)
  })

  test("id", function () {
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
})
