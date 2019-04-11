import { Emit } from "../"

let emit: Emit;

beforeEach(function () {
  emit = new Emit()
})

describe("on name", function () {
  test("calls listener", function () {
    expect.assertions(1)

    emit.on("a", function () {
      expect(true).toBe(true)
    })

    return emit.emit("a")
  })

  test("returns value from async listener", function () {
    expect.assertions(1)

    emit.on("a", async function () {
      return true
    })

    return emit.emit("a").then(out => {
      expect(out).toBe(true)
    })
  })

  test("doesn't call non-matching listener", function () {
    expect.assertions(0)

    emit.on("a", function () {
      expect(true).toBe(true)
    })

    return emit.emit(["a", "b"])
  })
})
