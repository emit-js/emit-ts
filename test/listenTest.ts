import { Emit, ListenType } from "../"

let emit: Emit;

beforeEach((): void => {
  emit = new Emit()
})

describe("listen", (): void => {
  test("adds listeners", async (): Promise<void> => {
    expect.assertions(1)

    await emit.listen(
      (async (): Promise<{ listen: ListenType }> => {
        return {
          listen: async (emit: Emit): Promise<void> => {
            expect(emit).toBeInstanceOf(Emit)
          }
        }
      })()
    )
  })
})
