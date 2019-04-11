import { Emit } from "../"

let emit: Emit;

beforeEach(function () {
  emit = new Emit()
})

describe("any no name", function () {
  test("calls listener", function () {
    expect.assertions(1)

    emit.any(null, function () {
      expect(true).toBe(true)
    })

    return emit.emit(null)
  })

  test("calls listener (broad name match)", function () {
    expect.assertions(1)

    emit.any(null, function () {
      expect(true).toBe(true)
    })

    return emit.emit("a")
  })

  test("calls listener (broad id match)", function () {
    expect.assertions(1)

    emit.any(null, function () {
      expect(true).toBe(true)
    })

    return emit.emit(["a", "b"])
  })

  test("returns value from async listener", function () {
    expect.assertions(1)

    emit.any(null, async function () {
      return true
    })

    return emit.emit().then(out => {
      expect(out).toBe(true)
    })
  })
})
