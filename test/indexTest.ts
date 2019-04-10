import { Emit } from "../"
import { ext } from "../dist/ext"

let emit: Emit;

beforeEach(function () {
  emit = new Emit()
  ext(emit)
})

test("emit", function () {
  expect.assertions(2)
  emit.any("hello", (...args) => {
    console.log(args)
    expect(true).toBe(true)
  })
  emit.hello("word", true)
  emit.hello(["word", ["up"]], true)
})
