import * as assert from 'assert'
import { printStaticWithoutFormatting, printRuntime } from '../src'
import { to, JSONSchema } from '../examples/json-schema'

describe('json-schema', () => {
  it('string', () => {
    assert.strictEqual(
      printStaticWithoutFormatting(
        to({
          type: 'string'
        })
      ),
      `string`
    )
  })

  it('enum', () => {
    assert.strictEqual(
      printStaticWithoutFormatting(
        to({
          type: 'string',
          enum: ['a', 'b']
        })
      ),
      `| 'a' | 'b'`
    )
  })

  it('number', () => {
    assert.strictEqual(
      printStaticWithoutFormatting(
        to({
          type: 'number'
        })
      ),
      `number`
    )
  })

  it('boolean', () => {
    assert.strictEqual(
      printStaticWithoutFormatting(
        to({
          type: 'boolean'
        })
      ),
      `boolean`
    )
  })

  it('object', () => {
    const schema: JSONSchema = {
      type: 'object',
      properties: {
        foo: {
          type: 'string'
        }
      },
      required: ['foo']
    }
    assert.strictEqual(printStaticWithoutFormatting(to(schema)), '{foo: string}')

    assert.strictEqual(printRuntime(to(schema)), `t.interface({ foo: t.string })\n`)
  })
})
