import * as assert from 'assert'
import * as t from '../src'

describe('printRuntime', () => {
  describe('taggedUnion', () => {
    it('should handle tag and types', () => {
      const declaration = t.typeDeclaration(
        'Foo',
        t.taggedUnionCombinator('type', [
          t.interfaceCombinator([t.property('type', t.literalCombinator('A'))]),
          t.interfaceCombinator([t.property('type', t.literalCombinator('B'))])
        ])
      )
      assert.strictEqual(
        t.printRuntime(declaration),
        `const Foo = t.taggedUnion('type', [
  t.interface({ type: t.literal('A') }),
  t.interface({ type: t.literal('B') })
])
`
      )
    })

    it('should handle name', () => {
      const declaration = t.typeDeclaration('Foo', t.taggedUnionCombinator('type', [], 'Foo'))
      assert.strictEqual(t.printRuntime(declaration), `const Foo = t.taggedUnion('type', [], 'Foo')\n`)
    })
  })

  describe('interface', () => {
    it('should handle required props', () => {
      const declaration = t.typeDeclaration(
        'Foo',
        t.interfaceCombinator([t.property('foo', t.stringType), t.property('bar', t.numberType)])
      )
      assert.strictEqual(
        t.printRuntime(declaration),
        `const Foo = t.interface({
  foo: t.string,
  bar: t.number
})\n`
      )
    })

    it('should handle optional props', () => {
      const declaration = t.typeDeclaration(
        'Foo',
        t.interfaceCombinator([t.property('foo', t.stringType), t.property('bar', t.numberType, true)])
      )
      assert.strictEqual(
        t.printRuntime(declaration),
        `const Foo = t.interface({
  foo: t.string,
  bar: t.union([t.number, t.undefined])
})
`
      )
    })

    it('should not add useless `undefinedType`s', () => {
      const declaration = t.typeDeclaration(
        'Foo',
        t.interfaceCombinator([
          t.property('foo', t.stringType),
          t.property('bar', t.unionCombinator([t.numberType, t.undefinedType]), true)
        ])
      )
      assert.strictEqual(
        t.printRuntime(declaration),
        `const Foo = t.interface({
  foo: t.string,
  bar: t.union([t.number, t.undefined])
})
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
      t.printRuntime(declaration),
      `const Foo = t.partial({
  foo: t.string,
  bar: t.number
})
`
    )
  })

  it('strict', () => {
    const declaration = t.typeDeclaration(
      'Foo',
      t.strictCombinator([t.property('foo', t.stringType), t.property('bar', t.numberType)])
    )
    assert.strictEqual(
      t.printRuntime(declaration),
      `const Foo = t.strict({
  foo: t.string,
  bar: t.number
})
`
    )
  })

  it('dictionary', () => {
    const declaration = t.typeDeclaration('Foo', t.dictionaryCombinator(t.stringType, t.numberType))
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.dictionary(t.string, t.number)\n`)
  })

  it('nested interface', () => {
    const declaration = t.typeDeclaration(
      'Foo',
      t.interfaceCombinator([
        t.property('foo', t.stringType),
        t.property('bar', t.interfaceCombinator([t.property('baz', t.numberType)]))
      ])
    )
    assert.strictEqual(
      t.printRuntime(declaration),
      `const Foo = t.interface({
  foo: t.string,
  bar: t.interface({ baz: t.number })
})
`
    )
  })

  it('interface with name', () => {
    const declaration = t.typeDeclaration('Foo', t.interfaceCombinator([t.property('foo', t.stringType)], 'Foo'))
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.interface({ foo: t.string }, 'Foo')\n`)
  })

  it('escape property', () => {
    const declaration = t.typeDeclaration(
      'Foo',
      t.interfaceCombinator([t.property('foo bar', t.stringType), t.property('image/jpeg', t.stringType)])
    )
    assert.strictEqual(
      t.printRuntime(declaration),
      `const Foo = t.interface({
  'foo bar': t.string,
  'image/jpeg': t.string
})
`
    )
  })

  it('exported interface', () => {
    const declaration = t.typeDeclaration('Foo', t.interfaceCombinator([t.property('foo', t.stringType)], 'Foo'), true)
    assert.strictEqual(t.printRuntime(declaration), `export const Foo = t.interface({ foo: t.string }, 'Foo')\n`)
  })

  it('readonly interface', () => {
    const declaration = t.typeDeclaration(
      'Foo',
      t.interfaceCombinator([t.property('foo', t.stringType)], 'Foo'),
      true,
      true
    )
    assert.strictEqual(
      t.printRuntime(declaration),
      `export const Foo = t.readonly(t.interface({ foo: t.string }, 'Foo'))\n`
    )
  })

  it('recursive', () => {
    const declaration = t.typeDeclaration(
      'Category',
      t.recursiveCombinator(
        t.identifier('CategoryT'),
        'Category',
        t.interfaceCombinator([
          t.property('name', t.stringType),
          t.property('categories', t.arrayCombinator(t.identifier('Category')))
        ])
      )
    )
    assert.strictEqual(
      t.printRuntime(declaration),
      `const Category = t.recursive<CategoryT>('Category', (Category: t.Any) =>
  t.interface({
    name: t.string,
    categories: t.array(Category)
  })
)
`
    )
  })

  it('readonly array', () => {
    const declaration = t.typeDeclaration(
      'Foo',
      t.interfaceCombinator([t.property('foo', t.readonlyArrayCombinator(t.stringType))], 'Foo'),
      true,
      true
    )
    assert.strictEqual(
      t.printRuntime(declaration),
      `export const Foo = t.readonly(
  t.interface({ foo: t.readonlyArray(t.string) }, 'Foo')
)
`
    )
  })

  it('CustomCombinator', () => {
    const optionCombinator = (type: t.TypeReference): t.CustomCombinator =>
      t.customCombinator(
        `Option<${t.printStaticWithoutFormatting(type)}>`,
        `createOptionFromNullable(${t.printRuntime(type)})
        `,
        t.getNodeDependencies(type)
      )

    const declaration = t.typeDeclaration('Foo', optionCombinator(t.stringType))

    assert.strictEqual(t.printRuntime(declaration), `const Foo = createOptionFromNullable(t.string)\n`)

    assert.strictEqual(t.printStatic(declaration), `type Foo = Option<string>\n`)
  })

  it('StringType', () => {
    const declaration = t.typeDeclaration('Foo', t.stringType)
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.string\n`)
  })

  it('NumberType', () => {
    const declaration = t.typeDeclaration('Foo', t.numberType)
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.number\n`)
  })

  it('BooleanType', () => {
    const declaration = t.typeDeclaration('Foo', t.booleanType)
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.boolean\n`)
  })

  it('NullType', () => {
    const declaration = t.typeDeclaration('Foo', t.nullType)
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.null\n`)
  })

  it('UndefinedType', () => {
    const declaration = t.typeDeclaration('Foo', t.undefinedType)
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.undefined\n`)
  })

  it('IntegerType', () => {
    const declaration = t.typeDeclaration('Foo', t.integerType)
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.Integer\n`)
  })

  it('AnyType', () => {
    const declaration = t.typeDeclaration('Foo', t.anyType)
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.any\n`)
  })

  it('AnyArrayType', () => {
    const declaration = t.typeDeclaration('Foo', t.anyArrayType)
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.Array\n`)
  })

  it('AnyDictionaryType', () => {
    const declaration = t.typeDeclaration('Foo', t.anyDictionaryType)
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.Dictionary\n`)
  })

  it('ObjectType', () => {
    const declaration = t.typeDeclaration('Foo', t.objectType)
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.object\n`)
  })

  it('FunctionType', () => {
    const declaration = t.typeDeclaration('Foo', t.functionType)
    assert.strictEqual(t.printRuntime(declaration), `const Foo = t.Function\n`)
  })
})
