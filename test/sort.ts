import * as assert from 'assert'
import * as t from '../src'

describe('sort', () => {
  it('should handle custom type declarations', () => {
    const declarations = [
      t.typeDeclaration('Person', t.interfaceCombinator([t.property('id', t.identifier('UserId'))]), true),
      t.customTypeDeclaration(
        'UserId',
        `export interface UserId extends Newtype<'UserId', string> {}`,
        `export const UserId = fromNewtype<UserId>(t.string)
export const userIdIso = iso<UserId>()`
      )
    ]
    const tds = t.sort(declarations)
    assert.strictEqual(
      tds.map(td => t.printStatic(td)).join('\n'),
      `export interface UserId extends Newtype<'UserId', string> {}

export interface Person {
  id: UserId
}
`
    )

    assert.strictEqual(
      tds.map(td => t.printRuntime(td)).join('\n'),
      `export const UserId = fromNewtype<UserId>(t.string)
export const userIdIso = iso<UserId>()

export const Person = t.interface({ id: UserId })
`
    )
  })

  it('should handle dependencies in custom type declarations', () => {
    const declarations = [
      t.typeDeclaration('Persons', t.arrayCombinator(t.identifier('Person')), true),
      t.typeDeclaration('RawPerson', t.interfaceCombinator([t.property('id', t.stringType)]), true),
      t.customTypeDeclaration(
        'Person',
        `export interface Person extends Newtype<'Person', RawPerson> {}`,
        `export const Person = fromNewtype<Person>(RawPerson)
export const personIso = iso<Person>()`,
        ['RawPerson']
      )
    ]
    const tds = t.sort(declarations)
    assert.strictEqual(
      tds.map(td => t.printStatic(td)).join('\n'),
      `export interface RawPerson {
  id: string
}

export interface Person extends Newtype<'Person', RawPerson> {}

export type Persons = Array<Person>
`
    )

    assert.strictEqual(
      tds.map(td => t.printRuntime(td)).join('\n'),
      `export const RawPerson = t.interface({ id: t.string })

export const Person = fromNewtype<Person>(RawPerson)
export const personIso = iso<Person>()

export const Persons = t.array(Person)
`
    )
  })

  it('real world test case', () => {
    const declarations: (t.TypeDeclaration | t.CustomTypeDeclaration)[] = [
      {
        kind: 'TypeDeclaration',
        name: 'NotificationPayload',
        type: {
          kind: 'InterfaceCombinator',
          properties: [
            {
              kind: 'Property',
              key: 'userLanguage',
              type: {
                kind: 'StringType',
                name: 'string'
              },
              isOptional: true
            },
            {
              kind: 'Property',
              key: 'notificationKind',
              type: {
                kind: 'Identifier',
                name: 'NotificationKind'
              },
              isOptional: false
            },
            {
              kind: 'Property',
              key: 'params',
              type: {
                kind: 'DictionaryCombinator',
                domain: {
                  kind: 'StringType',
                  name: 'string'
                },
                codomain: {
                  kind: 'AnyType',
                  name: 'any'
                }
              },
              isOptional: false
            },
            {
              kind: 'Property',
              key: 'workcellSerialNumber',
              type: {
                kind: 'StringType',
                name: 'string'
              },
              isOptional: false
            },
            {
              kind: 'Property',
              key: 'workcellType',
              type: {
                kind: 'Identifier',
                name: 'InstrumentType'
              },
              isOptional: false
            }
          ],
          name: 'NotificationPayload'
        },
        isExported: true,
        isReadonly: false
      }
    ]
    const tds = t.sort(declarations)
    assert.strictEqual(
      tds.map(td => t.printStatic(td)).join('\n'),
      `export interface NotificationPayload {
  userLanguage?: string
  notificationKind: NotificationKind
  params: { [key: string]: any }
  workcellSerialNumber: string
  workcellType: InstrumentType
}
`
    )
  })
})
