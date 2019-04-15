import { Emit } from "../"

let emit: Emit;

beforeEach((): void => {
  emit = new Emit()
})

describe("any args", (): void => {
  test("no name", (): void => {
    expect.assertions(5)

    emit.any(null, (e, ...args): void => {
      expect(args).toEqual([1, 2, 3])
      expect(e.args).toEqual([1, 2, 3])
      expect(e.id).toEqual([])
      expect(e.name).toBeUndefined()
      expect(e.promises).toEqual(expect.any(Set))
    })

    emit.emit(null, 1, 2, 3)
  })

  test("no name, no args", (): void => {
    expect.assertions(5)

    emit.any(null, (e, ...args): void => {
      expect(args).toEqual([])
      expect(e.args).toEqual([])
      expect(e.id).toEqual([])
      expect(e.name).toBeUndefined()
      expect(e.promises).toEqual(expect.any(Set))
    })

    emit.emit(null)
  })

  test("name", (): void => {
    expect.assertions(5)

    emit.any(null, (e, ...args): void => {
      expect(args).toEqual([1, 2, 3])
      expect(e.args).toEqual([1, 2, 3])
      expect(e.id).toEqual([])
      expect(e.name).toBe("a")
      expect(e.promises).toEqual(expect.any(Set))
    })

    emit.emit("a", 1, 2, 3)
  })

  test("id & name", (): void => {
    expect.assertions(5)

    emit.any(null, (e, ...args): void => {
      expect(args).toEqual([1, 2, 3])
      expect(e.args).toEqual([1, 2, 3])
      expect(e.id).toEqual(["b"])
      expect(e.name).toBe("a")
      expect(e.promises).toEqual(expect.any(Set))
    })

    emit.emit(["a", ["b"]], 1, 2, 3)
  })
})
