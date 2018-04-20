import * as prettier from 'prettier'

export interface StringType {
  kind: 'StringType'
  name: 'string'
}

export interface NumberType {
  kind: 'NumberType'
  name: 'number'
}

export interface IntegerType {
  kind: 'IntegerType'
  name: 'Integer'
}

export interface BooleanType {
  kind: 'BooleanType'
  name: 'boolean'
}

export interface NullType {
  kind: 'NullType'
  name: 'null'
}

export interface UndefinedType {
  kind: 'UndefinedType'
  name: 'undefined'
}

export interface AnyType {
  kind: 'AnyType'
  name: 'any'
}

export interface AnyArrayType {
  kind: 'AnyArrayType'
  name: 'Array'
}

export interface AnyDictionaryType {
  kind: 'AnyDictionaryType'
  name: 'Dictionary'
}

export interface ObjectType {
  kind: 'ObjectType'
  name: 'object'
}

export interface FunctionType {
  kind: 'FunctionType'
  name: 'Function'
}

export interface Readonly {
  isReadonly: boolean
}

export interface Optional {
  isOptional: boolean
}

export interface Property extends Optional {
  kind: 'Property'
  key: string
  type: TypeReference
  description?: string
}

export interface LiteralCombinator {
  kind: 'LiteralCombinator'
  value: string | number | boolean
  name?: string
}

export interface InterfaceCombinator {
  kind: 'InterfaceCombinator'
  properties: Array<Property>
  name?: string
}

export interface PartialCombinator {
  kind: 'PartialCombinator'
  properties: Array<Property>
  name?: string
}

export interface StrictCombinator {
  kind: 'StrictCombinator'
  properties: Array<Property>
  name?: string
}

export interface UnionCombinator {
  kind: 'UnionCombinator'
  types: Array<TypeReference>
  name?: string
}

export interface TaggedUnionCombinator {
  kind: 'TaggedUnionCombinator'
  tag: string
  types: Array<TypeReference>
  name?: string
}

export interface IntersectionCombinator {
  kind: 'IntersectionCombinator'
  types: Array<TypeReference>
  name?: string
}

export interface KeyofCombinator {
  kind: 'KeyofCombinator'
  values: Array<string>
  name?: string
}

export interface ArrayCombinator {
  kind: 'ArrayCombinator'
  type: TypeReference
  name?: string
}

export interface ReadonlyArrayCombinator {
  kind: 'ReadonlyArrayCombinator'
  type: TypeReference
  name?: string
}

export interface DictionaryCombinator {
  kind: 'DictionaryCombinator'
  domain: TypeReference
  codomain: TypeReference
  name?: string
}

export interface TupleCombinator {
  kind: 'TupleCombinator'
  types: Array<TypeReference>
  name?: string
}

export interface RecursiveCombinator {
  kind: 'RecursiveCombinator'
  typeParameter: Identifier
  name: string
  type: TypeReference
}

export type Combinator =
  | InterfaceCombinator
  | UnionCombinator
  | LiteralCombinator
  | IntersectionCombinator
  | StrictCombinator
  | KeyofCombinator
  | ArrayCombinator
  | ReadonlyArrayCombinator
  | TupleCombinator
  | RecursiveCombinator
  | DictionaryCombinator
  | PartialCombinator
  | TaggedUnionCombinator
  | CustomCombinator

export interface Identifier {
  kind: 'Identifier'
  name: string
}

export type BasicType =
  | StringType
  | NumberType
  | BooleanType
  | NullType
  | UndefinedType
  | IntegerType
  | AnyType
  | AnyArrayType
  | AnyDictionaryType
  | ObjectType
  | FunctionType

export type TypeReference = BasicType | Combinator | Identifier

export interface TypeDeclaration extends Readonly {
  kind: 'TypeDeclaration'
  name: string
  type: TypeReference
  isExported: boolean
}

export interface CustomTypeDeclaration {
  kind: 'CustomTypeDeclaration'
  name: string
  static: string
  runtime: string
  dependencies: Array<string>
}

export interface CustomCombinator {
  kind: 'CustomCombinator'
  static: string
  runtime: string
  dependencies: Array<string>
}

export type Node = TypeReference | TypeDeclaration | CustomTypeDeclaration

export const stringType: StringType = {
  kind: 'StringType',
  name: 'string'
}

export const numberType: NumberType = {
  kind: 'NumberType',
  name: 'number'
}

export const integerType: IntegerType = {
  kind: 'IntegerType',
  name: 'Integer'
}

export const booleanType: BooleanType = {
  kind: 'BooleanType',
  name: 'boolean'
}

export const nullType: NullType = {
  kind: 'NullType',
  name: 'null'
}

export const undefinedType: UndefinedType = {
  kind: 'UndefinedType',
  name: 'undefined'
}

export const anyType: AnyType = {
  kind: 'AnyType',
  name: 'any'
}

export const anyArrayType: AnyArrayType = {
  kind: 'AnyArrayType',
  name: 'Array'
}

export const anyDictionaryType: AnyDictionaryType = {
  kind: 'AnyDictionaryType',
  name: 'Dictionary'
}

export const objectType: ObjectType = {
  kind: 'ObjectType',
  name: 'object'
}

export const functionType: FunctionType = {
  kind: 'FunctionType',
  name: 'Function'
}

export function identifier(name: string): Identifier {
  return {
    kind: 'Identifier',
    name
  }
}

export function property(
  key: string,
  type: TypeReference,
  isOptional: boolean = false,
  description?: string
): Property {
  return {
    kind: 'Property',
    key,
    type,
    isOptional,
    description
  }
}

export function literalCombinator(value: string | boolean | number, name?: string): LiteralCombinator {
  return {
    kind: 'LiteralCombinator',
    value,
    name
  }
}

export function partialCombinator(properties: Array<Property>, name?: string): PartialCombinator {
  return {
    kind: 'PartialCombinator',
    properties,
    name
  }
}

export function interfaceCombinator(properties: Array<Property>, name?: string): InterfaceCombinator {
  return {
    kind: 'InterfaceCombinator',
    properties,
    name
  }
}

export function strictCombinator(properties: Array<Property>, name?: string): StrictCombinator {
  return {
    kind: 'StrictCombinator',
    properties,
    name
  }
}

export function unionCombinator(types: Array<TypeReference>, name?: string): UnionCombinator {
  return {
    kind: 'UnionCombinator',
    types,
    name
  }
}

export function taggedUnionCombinator(tag: string, types: Array<TypeReference>, name?: string): TaggedUnionCombinator {
  return {
    kind: 'TaggedUnionCombinator',
    tag,
    types,
    name
  }
}

export function intersectionCombinator(types: Array<TypeReference>, name?: string): IntersectionCombinator {
  return {
    kind: 'IntersectionCombinator',
    types,
    name
  }
}

export function keyofCombinator(values: Array<string>, name?: string): KeyofCombinator {
  return {
    kind: 'KeyofCombinator',
    values,
    name
  }
}

export function arrayCombinator(type: TypeReference, name?: string): ArrayCombinator {
  return {
    kind: 'ArrayCombinator',
    type,
    name
  }
}

export function readonlyArrayCombinator(type: TypeReference, name?: string): ReadonlyArrayCombinator {
  return {
    kind: 'ReadonlyArrayCombinator',
    type,
    name
  }
}

export function tupleCombinator(types: Array<TypeReference>, name?: string): TupleCombinator {
  return {
    kind: 'TupleCombinator',
    types,
    name
  }
}

export function recursiveCombinator(typeParameter: Identifier, name: string, type: TypeReference): RecursiveCombinator {
  return {
    kind: 'RecursiveCombinator',
    typeParameter,
    name,
    type
  }
}

export function dictionaryCombinator(
  domain: TypeReference,
  codomain: TypeReference,
  name?: string
): DictionaryCombinator {
  return {
    kind: 'DictionaryCombinator',
    domain,
    codomain,
    name
  }
}

export function typeDeclaration(
  name: string,
  type: TypeReference,
  isExported: boolean = false,
  isReadonly: boolean = false
): TypeDeclaration {
  return {
    kind: 'TypeDeclaration',
    name,
    type,
    isExported,
    isReadonly
  }
}

export function customTypeDeclaration(
  name: string,
  staticRepr: string,
  runtimeRepr: string,
  dependencies: Array<string> = []
): CustomTypeDeclaration {
  return {
    kind: 'CustomTypeDeclaration',
    name,
    static: staticRepr,
    runtime: runtimeRepr,
    dependencies
  }
}

export function customCombinator(
  staticRepr: string,
  runtimeRepr: string,
  dependencies: Array<string> = []
): CustomCombinator {
  return {
    kind: 'CustomCombinator',
    static: staticRepr,
    runtime: runtimeRepr,
    dependencies
  }
}

export class Vertex {
  public afters: Array<string> = []
  constructor(public id: string) {}
}

export type Graph = { [key: string]: Vertex }

/** topological sort */
export function tsort(graph: Graph): { sorted: Array<string>; recursive: { [key: string]: true } } {
  const sorted: Array<string> = []
  const visited: { [key: string]: true } = {}
  const recursive: { [key: string]: true } = {}

  Object.keys(graph).forEach(function visit(id, ancestors: any) {
    if (visited[id]) {
      return
    }
    if (!graph.hasOwnProperty(id)) {
      return
    }

    const vertex = graph[id]

    if (!Array.isArray(ancestors)) {
      ancestors = []
    }

    ancestors.push(id)
    visited[id] = true

    vertex.afters.forEach(afterId => {
      if (ancestors.indexOf(afterId) >= 0) {
        recursive[id] = true
        recursive[afterId] = true
      } else {
        visit(afterId, ancestors.slice())
      }
    })

    sorted.unshift(id)
  })

  return {
    sorted: sorted.filter(id => !recursive.hasOwnProperty(id)),
    recursive
  }
}

export function getTypeDeclarationMap(
  declarations: Array<TypeDeclaration | CustomTypeDeclaration>
): { [key: string]: TypeDeclaration | CustomTypeDeclaration } {
  const map: { [key: string]: TypeDeclaration | CustomTypeDeclaration } = {}
  declarations.forEach(d => {
    map[d.name] = d
  })
  return map
}

const flatten = <A>(aas: Array<Array<A>>): Array<A> => {
  const r: Array<A> = []
  aas.forEach(as => {
    r.push(...as)
  })
  return r
}

export const getNodeDependencies = (node: Node): Array<string> => {
  switch (node.kind) {
    case 'Identifier':
      return [node.name]
    case 'InterfaceCombinator':
    case 'StrictCombinator':
    case 'PartialCombinator':
      return flatten(node.properties.map(p => getNodeDependencies(p.type)))
    case 'TaggedUnionCombinator':
    case 'UnionCombinator':
    case 'IntersectionCombinator':
    case 'TupleCombinator':
      return flatten(node.types.map(type => getNodeDependencies(type)))
    case 'DictionaryCombinator':
      return getNodeDependencies(node.domain).concat(getNodeDependencies(node.codomain))
    case 'ArrayCombinator':
    case 'ReadonlyArrayCombinator':
    case 'TypeDeclaration':
    case 'RecursiveCombinator':
      return getNodeDependencies(node.type)
    case 'CustomTypeDeclaration':
    case 'CustomCombinator':
      return node.dependencies
    case 'StringType':
    case 'NumberType':
    case 'BooleanType':
    case 'NullType':
    case 'UndefinedType':
    case 'IntegerType':
    case 'AnyType':
    case 'AnyArrayType':
    case 'AnyDictionaryType':
    case 'ObjectType':
    case 'FunctionType':
    case 'LiteralCombinator':
    case 'KeyofCombinator':
      return []
  }
}

export function getTypeDeclarationGraph(
  declarations: Array<TypeDeclaration | CustomTypeDeclaration>,
  map: { [key: string]: TypeDeclaration | CustomTypeDeclaration }
): Graph {
  const graph: Graph = {}
  declarations.forEach(d => {
    const vertex = (graph[d.name] = new Vertex(d.name))
    vertex.afters.push(...getNodeDependencies(d))
  })
  return graph
}

function escapeString(s: string): string {
  return "'" + s.replace(/'/g, "\\'") + "'"
}

function isValidPropertyKey(s: string): boolean {
  return /[-\/\s]/.exec(s) === null
}

function addRuntimeName(s: string, name?: string): string {
  if (name) {
    return s + ', ' + escapeString(name)
  }
  return s
}

function escapePropertyKey(key: string): string {
  return isValidPropertyKey(key) ? key : escapeString(key)
}

function printRuntimeLiteralCombinator(literalCombinator: LiteralCombinator): string {
  const value =
    typeof literalCombinator.value === 'string' ? escapeString(literalCombinator.value) : literalCombinator.value
  let s = `t.literal(${value}`
  s = addRuntimeName(s, literalCombinator.name)
  s += ')'
  return s
}

function printDescription(description: string | undefined): string {
  if (description) {
    return `/** ${description} */\n`
  }
  return ''
}

function containsUndefined(type: TypeReference): boolean {
  if (type.kind === 'UnionCombinator') {
    return type.types.some(containsUndefined)
  } else {
    return type.kind === 'UndefinedType'
  }
}

function getRuntimePropertyType(p: Property): TypeReference {
  if (p.isOptional && !containsUndefined(p.type)) {
    return unionCombinator([p.type, undefinedType])
  } else {
    return p.type
  }
}

function printRuntimeProperty(p: Property): string {
  const type = getRuntimePropertyType(p)
  return `${printDescription(p.description)}${escapePropertyKey(p.key)}: ${printRuntimeWithoutFormatting(type)}`
}

function printRuntimeInterfaceCombinator(interfaceCombinator: InterfaceCombinator): string {
  let s = 't.interface({'
  s += interfaceCombinator.properties.map(p => printRuntimeProperty(p)).join(',\n')
  s += `}`
  s = addRuntimeName(s, interfaceCombinator.name)
  s += ')'
  return s
}

function printRuntimePartialCombinator(partialCombinator: PartialCombinator): string {
  let s = 't.partial({'
  s += partialCombinator.properties.map(p => printRuntimeProperty({ ...p, isOptional: false })).join(',\n')
  s += `}`
  s = addRuntimeName(s, partialCombinator.name)
  s += ')'
  return s
}

function printRuntimeStrictCombinator(strictCombinator: StrictCombinator): string {
  let s = 't.strict({'
  s += strictCombinator.properties.map(p => printRuntimeProperty(p)).join(',\n')
  s += `}`
  s = addRuntimeName(s, strictCombinator.name)
  s += ')'
  return s
}

function printRuntimeTypesCombinator(
  combinatorKind: string,
  types: Array<TypeReference>,
  combinatorName: string | undefined
): string {
  let s = `t.${combinatorKind}([`
  s += types.map(t => `${printRuntimeWithoutFormatting(t)}`).join(',')
  s += `]`
  s = addRuntimeName(s, combinatorName)
  s += ')'
  return s
}

function printRuntimeUnionCombinator(c: UnionCombinator): string {
  return printRuntimeTypesCombinator('union', c.types, c.name)
}

function printRuntimeTaggedUnionCombinator(c: TaggedUnionCombinator): string {
  let s = `t.taggedUnion(${escapeString(c.tag)}, [`
  s += c.types.map(t => printRuntimeWithoutFormatting(t)).join(',')
  s += `]`
  s = addRuntimeName(s, c.name)
  s += ')'
  return s
}

function printRuntimeIntersectionCombinator(c: IntersectionCombinator): string {
  return printRuntimeTypesCombinator('intersection', c.types, c.name)
}

function printRuntimeKeyofCombinator(c: KeyofCombinator): string {
  let s = `t.keyof({`
  s += c.values.map(v => `${escapePropertyKey(v)}: true`).join(',')
  s += `}`
  s = addRuntimeName(s, c.name)
  s += ')'
  return s
}

function printRuntimeArrayCombinator(c: ArrayCombinator): string {
  let s = `t.array(${printRuntimeWithoutFormatting(c.type)}`
  s = addRuntimeName(s, c.name)
  s += ')'
  return s
}

function printRuntimeReadonlyArrayCombinator(c: ReadonlyArrayCombinator): string {
  let s = `t.readonlyArray(${printRuntimeWithoutFormatting(c.type)}`
  s = addRuntimeName(s, c.name)
  s += ')'
  return s
}

function printRuntimeTupleCombinator(c: TupleCombinator): string {
  return printRuntimeTypesCombinator('tuple', c.types, c.name)
}

function printRuntimeTypeDeclaration(declaration: TypeDeclaration): string {
  let s = printRuntimeWithoutFormatting(declaration.type)
  if (declaration.isReadonly) {
    s = `t.readonly(${s})`
  }
  s = `const ${declaration.name} = ${s}`
  if (declaration.isExported) {
    s = `export ${s}`
  }
  return s
}

function printRuntimeRecursiveCombinator(c: RecursiveCombinator): string {
  let s = `t.recursive<${c.typeParameter.name}>(${escapeString(c.name)}, (${
    c.name
  }: t.Any) => ${printRuntimeWithoutFormatting(c.type)})`
  return s
}

function printRuntimeDictionaryCombinator(c: DictionaryCombinator): string {
  let s = `t.dictionary(${printRuntimeWithoutFormatting(c.domain)}, ${printRuntimeWithoutFormatting(c.codomain)}`
  s = addRuntimeName(s, c.name)
  s += ')'
  return s
}

export function printRuntimeWithoutFormatting(node: Node): string {
  switch (node.kind) {
    case 'Identifier':
      return node.name
    case 'StringType':
    case 'NumberType':
    case 'BooleanType':
    case 'NullType':
    case 'UndefinedType':
    case 'IntegerType':
    case 'AnyType':
    case 'AnyArrayType':
    case 'AnyDictionaryType':
    case 'ObjectType':
    case 'FunctionType':
      return `t.${node.name}`
    case 'LiteralCombinator':
      return printRuntimeLiteralCombinator(node)
    case 'InterfaceCombinator':
      return printRuntimeInterfaceCombinator(node)
    case 'PartialCombinator':
      return printRuntimePartialCombinator(node)
    case 'StrictCombinator':
      return printRuntimeStrictCombinator(node)
    case 'UnionCombinator':
      return printRuntimeUnionCombinator(node)
    case 'TaggedUnionCombinator':
      return printRuntimeTaggedUnionCombinator(node)
    case 'IntersectionCombinator':
      return printRuntimeIntersectionCombinator(node)
    case 'KeyofCombinator':
      return printRuntimeKeyofCombinator(node)
    case 'ArrayCombinator':
      return printRuntimeArrayCombinator(node)
    case 'ReadonlyArrayCombinator':
      return printRuntimeReadonlyArrayCombinator(node)
    case 'TupleCombinator':
      return printRuntimeTupleCombinator(node)
    case 'RecursiveCombinator':
      return printRuntimeRecursiveCombinator(node)
    case 'DictionaryCombinator':
      return printRuntimeDictionaryCombinator(node)
    case 'TypeDeclaration':
      return printRuntimeTypeDeclaration(node)
    case 'CustomTypeDeclaration':
    case 'CustomCombinator':
      return node.runtime
  }
}

export function printRuntime(node: Node, options: Options = defaultOptions): string {
  return prettier.format(printRuntimeWithoutFormatting(node), options)
}

function getRecursiveTypeDeclaration(declaration: TypeDeclaration): TypeDeclaration {
  const name = declaration.name
  const recursive = recursiveCombinator(identifier(name), name, declaration.type)
  return typeDeclaration(name, recursive, declaration.isExported, declaration.isReadonly)
}

export function sort(
  declarations: Array<TypeDeclaration | CustomTypeDeclaration>
): Array<TypeDeclaration | CustomTypeDeclaration> {
  const map = getTypeDeclarationMap(declarations)
  const graph = getTypeDeclarationGraph(declarations, map)
  const { sorted, recursive } = tsort(graph)
  const keys = Object.keys(recursive)
  const recursions: Array<TypeDeclaration> = []
  for (let i = 0; i < keys.length; i++) {
    const td = map[name]
    if (td.kind === 'TypeDeclaration') {
      recursions.push(getRecursiveTypeDeclaration(td))
    }
  }
  return sorted
    .reverse()
    .map(name => map[name])
    .concat(recursions)
}

function printStaticProperty(p: Property): string {
  const optional = p.isOptional ? '?' : ''
  return `${printDescription(p.description)}${escapePropertyKey(p.key)}${optional}: ${printStaticWithoutFormatting(
    p.type
  )}`
}

function printStaticLiteralCombinator(c: LiteralCombinator): string {
  return typeof c.value === 'string' ? escapeString(c.value) : String(c.value)
}

function printStaticInterfaceCombinator(c: InterfaceCombinator): string {
  let s = '{'
  s += c.properties.map(p => printStaticProperty(p)).join(',\n')
  s += `}`
  return s
}

function printStaticPartialCombinator(c: PartialCombinator): string {
  let s = '{'
  s += c.properties.map(p => printStaticProperty({ ...p, isOptional: true })).join(',\n')
  s += `}`
  return s
}

function printStaticStrictCombinator(c: StrictCombinator): string {
  let s = '{'
  s += c.properties.map(p => printStaticProperty(p)).join(',\n')
  s += `}`
  return s
}

function printStaticTypesCombinator(types: Array<TypeReference>, separator: string): string {
  return types.map(t => `${separator} ${printStaticWithoutFormatting(t)}`).join(' ')
}

function printStaticUnionCombinator(c: UnionCombinator): string {
  return printStaticTypesCombinator(c.types, '|')
}

function printStaticTaggedUnionCombinator(c: TaggedUnionCombinator): string {
  return printStaticTypesCombinator(c.types, '|')
}

function printStaticIntersectionCombinator(c: IntersectionCombinator): string {
  return printStaticTypesCombinator(c.types, '&')
}

function printStaticKeyofCombinator(c: KeyofCombinator): string {
  return printStaticWithoutFormatting(unionCombinator(c.values.map(value => literalCombinator(value))))
}

function printStaticArrayCombinator(c: ArrayCombinator): string {
  return `Array<${printStaticWithoutFormatting(c.type)}>`
}

function printStaticReadonlyArrayCombinator(c: ReadonlyArrayCombinator): string {
  return `ReadonlyArray<${printStaticWithoutFormatting(c.type)}>`
}

function printStaticDictionaryCombinator(c: DictionaryCombinator): string {
  return `{[ key: ${printStaticWithoutFormatting(c.domain)}]: ${printStaticWithoutFormatting(c.codomain)} }`
}

function printStaticTupleCombinator(c: TupleCombinator): string {
  let s = '['
  s += c.types.map(t => `${printStaticWithoutFormatting(t)}`).join(',')
  s += `]`
  return s
}

function printStaticTypeDeclaration(declaration: TypeDeclaration): string {
  let s = printStaticWithoutFormatting(declaration.type)
  if (
    (declaration.type.kind === 'InterfaceCombinator' ||
      declaration.type.kind === 'StrictCombinator' ||
      declaration.type.kind === 'PartialCombinator') &&
    !declaration.isReadonly
  ) {
    s = `interface ${declaration.name} ${s}`
  } else {
    if (declaration.isReadonly) {
      s = `Readonly<${s}>`
    }
    s = `type ${declaration.name} = ${s}`
  }
  if (declaration.isExported) {
    s = `export ${s}`
  }
  return s
}

export function printStaticWithoutFormatting(node: Node): string {
  switch (node.kind) {
    case 'Identifier':
      return node.name
    case 'StringType':
    case 'NumberType':
    case 'BooleanType':
    case 'NullType':
    case 'UndefinedType':
    case 'AnyType':
    case 'ObjectType':
    case 'FunctionType':
      return node.name
    case 'IntegerType':
      return 'number'
    case 'AnyArrayType':
      return 'Array<t.mixed>'
    case 'AnyDictionaryType':
      return '{ [key: string]: t.mixed }'
    case 'LiteralCombinator':
      return printStaticLiteralCombinator(node)
    case 'InterfaceCombinator':
      return printStaticInterfaceCombinator(node)
    case 'PartialCombinator':
      return printStaticPartialCombinator(node)
    case 'StrictCombinator':
      return printStaticStrictCombinator(node)
    case 'UnionCombinator':
      return printStaticUnionCombinator(node)
    case 'TaggedUnionCombinator':
      return printStaticTaggedUnionCombinator(node)
    case 'IntersectionCombinator':
      return printStaticIntersectionCombinator(node)
    case 'KeyofCombinator':
      return printStaticKeyofCombinator(node)
    case 'ArrayCombinator':
      return printStaticArrayCombinator(node)
    case 'ReadonlyArrayCombinator':
      return printStaticReadonlyArrayCombinator(node)
    case 'TupleCombinator':
      return printStaticTupleCombinator(node)
    case 'RecursiveCombinator':
      return printStaticWithoutFormatting(node.type)
    case 'DictionaryCombinator':
      return printStaticDictionaryCombinator(node)
    case 'TypeDeclaration':
      return printStaticTypeDeclaration(node)
    case 'CustomTypeDeclaration':
    case 'CustomCombinator':
      return node.static
  }
}

export const defaultOptions: Options = {
  parser: 'typescript',
  semi: false,
  singleQuote: true
}

export interface Options extends prettier.Options {
  parser: 'typescript'
}

export function printStatic(node: Node, options: Options = defaultOptions): string {
  return prettier.format(printStaticWithoutFormatting(node), options)
}
