import * as assert from 'assert'
import * as t from '../src'

describe('printStatic', () => {
  describe('taggedUnion', () => {
    it('should print a union', () => {
      const declaration = t.typeDeclaration(
        'Foo',
        t.taggedUnionCombinator('type', [
          t.interfaceCombinator([t.property('type', t.literalCombinator('A'), false, 'description1')]),
          t.interfaceCombinator([t.property('type', t.literalCombinator('B'))])
        ])
      )
      assert.strictEqual(
        t.printStatic(declaration),
        `type Foo =
  | {
      /** description1 */
      type: 'A'
    }
  | { type: 'B' }
`
      )
    })
  })

  describe('interface', () => {
    it('should handle required properties', () => {
      const declaration = t.typeDeclaration(
        'Foo',
        t.interfaceCombinator([t.property('foo', t.stringType, false, 'description1'), t.property('bar', t.numberType)])
      )
      assert.strictEqual(
        t.printStatic(declaration),
        `interface Foo {
  /** description1 */
  foo: string
  bar: number
}
`
      )
    })

    it('should handle optional props', () => {
      const declaration = t.typeDeclaration(
        'Foo',
        t.interfaceCombinator([t.property('foo', t.stringType), t.property('bar', t.numberType, true)])
      )
      assert.strictEqual(
        t.printStatic(declaration),
        `interface Foo {
  foo: string
  bar?: number
}
`
      )
    })

    it('nested', () => {
      const declaration = t.typeDeclaration(
        'Foo',
        t.interfaceCombinator([
          t.property('foo', t.stringType),
          t.property('bar', t.interfaceCombinator([t.property('baz', t.numberType)]))
        ])
      )
      assert.strictEqual(
        t.printStatic(declaration),
        `interface Foo {
  foo: string
  bar: { baz: number }
}
`
      )
    })

    it('should escape properties', () => {
      const declaration = t.typeDeclaration(
        'Foo',
        t.interfaceCombinator([t.property('foo bar', t.stringType), t.property('image/jpeg', t.stringType)])
      )
      assert.strictEqual(
        t.printStatic(declaration),
        `interface Foo {
  'foo bar': string
  'image/jpeg': string
}
`
      )
    })

    it('exported', () => {
      const declaration = t.typeDeclaration(
        'Foo',
        t.interfaceCombinator([t.property('foo', t.stringType)], 'Foo'),
        true
      )
      assert.strictEqual(
        t.printStatic(declaration),
        `export interface Foo {
  foo: string
}
`
      )
    })
  })

  it('partial', () => {
    const declaration = t.typeDeclaration(
      'Foo',
      t.partialCombinator([t.property('foo', t.stringType), t.property('bar', t.numberType, true)])
    )
    assert.strictEqual(
      t.printStatic(declaration),
      `interface Foo {
  foo?: string
  bar?: number
}
`
    )
  })

  it('strict', () => {
    const declaration = t.typeDeclaration(
      'Foo',
      t.strictCombinator([t.property('foo', t.stringType), t.property('bar', t.numberType)])
    )
    assert.strictEqual(
      t.printStatic(declaration),
      `interface Foo {
  foo: string
  bar: number
}
`
    )
  })

  it('dictionary', () => {
    const declaration = t.typeDeclaration('Foo', t.dictionaryCombinator(t.stringType, t.numberType))
    assert.strictEqual(t.printStatic(declaration), `type Foo = { [key: string]: number }\n`)
  })

  it('readonly interface', () => {
    const declaration = t.typeDeclaration(
      'Foo',
      t.interfaceCombinator([t.property('foo', t.stringType)], 'Foo'),
      true,
      true
    )
    assert.strictEqual(t.printStatic(declaration), 'export type Foo = Readonly<{ foo: string }>\n')
  })

  it('readonly array', () => {
    const declaration = t.typeDeclaration(
      'Foo',
      t.interfaceCombinator([t.property('foo', t.readonlyArrayCombinator(t.stringType))], 'Foo'),
      true,
      false
    )
    assert.strictEqual(
      t.printStatic(declaration),
      `export interface Foo {
  foo: ReadonlyArray<string>
}
`
    )
  })

  it('StringType', () => {
    const declaration = t.typeDeclaration('Foo', t.stringType)
    assert.strictEqual(t.printStatic(declaration), `type Foo = string\n`)
  })

  it('NumberType', () => {
    const declaration = t.typeDeclaration('Foo', t.numberType)
    assert.strictEqual(t.printStatic(declaration), `type Foo = number\n`)
  })

  it('BooleanType', () => {
    const declaration = t.typeDeclaration('Foo', t.booleanType)
    assert.strictEqual(t.printStatic(declaration), `type Foo = boolean\n`)
  })

  it('NullType', () => {
    const declaration = t.typeDeclaration('Foo', t.nullType)
    assert.strictEqual(t.printStatic(declaration), `type Foo = null\n`)
  })

  it('UndefinedType', () => {
    const declaration = t.typeDeclaration('Foo', t.undefinedType)
    assert.strictEqual(t.printStatic(declaration), `type Foo = undefined\n`)
  })

  it('IntegerType', () => {
    const declaration = t.typeDeclaration('Foo', t.integerType)
    assert.strictEqual(t.printStatic(declaration), `type Foo = number\n`)
  })

  it('AnyType', () => {
    const declaration = t.typeDeclaration('Foo', t.anyType)
    assert.strictEqual(t.printStatic(declaration), `type Foo = any\n`)
  })

  it('AnyArrayType', () => {
    const declaration = t.typeDeclaration('Foo', t.anyArrayType)
    assert.strictEqual(t.printStatic(declaration), `type Foo = Array<t.mixed>\n`)
  })

  it('AnyDictionaryType', () => {
    const declaration = t.typeDeclaration('Foo', t.anyDictionaryType)
    assert.strictEqual(t.printStatic(declaration), `type Foo = { [key: string]: t.mixed }\n`)
  })

  it('ObjectType', () => {
    const declaration = t.typeDeclaration('Foo', t.objectType)
    assert.strictEqual(t.printStatic(declaration), `type Foo = object\n`)
  })

  it('FunctionType', () => {
    const declaration = t.typeDeclaration('Foo', t.functionType)
    assert.strictEqual(t.printStatic(declaration), `type Foo = Function\n`)
  })
})
