import { Emit } from "../"

let emit: Emit;

beforeEach(function () {
  emit = new Emit()
})

describe("on no name", function () {
  test("calls listener", function () {
    expect.assertions(1)

    emit.on(null, function () {
      expect(true).toBe(true)
    })

    return emit.emit(null)
  })

  test("returns value from async listener", function () {
    expect.assertions(1)

    emit.on(null, async function () {
      return true
    })

    return emit.emit().then(out => {
      expect(out).toBe(true)
    })
  })

  test("doesn't call non-matching listener", function () {
    expect.assertions(0)

    emit.on(null, function () {
      expect(true).toBe(true)
    })

    return emit.emit("a")
  })
})
