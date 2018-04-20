"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var prettier = require("prettier");
exports.stringType = {
    kind: 'StringType',
    name: 'string'
};
exports.numberType = {
    kind: 'NumberType',
    name: 'number'
};
exports.integerType = {
    kind: 'IntegerType',
    name: 'Integer'
};
exports.booleanType = {
    kind: 'BooleanType',
    name: 'boolean'
};
exports.nullType = {
    kind: 'NullType',
    name: 'null'
};
exports.undefinedType = {
    kind: 'UndefinedType',
    name: 'undefined'
};
exports.anyType = {
    kind: 'AnyType',
    name: 'any'
};
exports.anyArrayType = {
    kind: 'AnyArrayType',
    name: 'Array'
};
exports.anyDictionaryType = {
    kind: 'AnyDictionaryType',
    name: 'Dictionary'
};
exports.objectType = {
    kind: 'ObjectType',
    name: 'object'
};
exports.functionType = {
    kind: 'FunctionType',
    name: 'Function'
};
function identifier(name) {
    return {
        kind: 'Identifier',
        name: name
    };
}
exports.identifier = identifier;
function property(key, type, isOptional, description) {
    if (isOptional === void 0) { isOptional = false; }
    return {
        kind: 'Property',
        key: key,
        type: type,
        isOptional: isOptional,
        description: description
    };
}
exports.property = property;
function literalCombinator(value, name) {
    return {
        kind: 'LiteralCombinator',
        value: value,
        name: name
    };
}
exports.literalCombinator = literalCombinator;
function partialCombinator(properties, name) {
    return {
        kind: 'PartialCombinator',
        properties: properties,
        name: name
    };
}
exports.partialCombinator = partialCombinator;
function interfaceCombinator(properties, name) {
    return {
        kind: 'InterfaceCombinator',
        properties: properties,
        name: name
    };
}
exports.interfaceCombinator = interfaceCombinator;
function strictCombinator(properties, name) {
    return {
        kind: 'StrictCombinator',
        properties: properties,
        name: name
    };
}
exports.strictCombinator = strictCombinator;
function unionCombinator(types, name) {
    return {
        kind: 'UnionCombinator',
        types: types,
        name: name
    };
}
exports.unionCombinator = unionCombinator;
function taggedUnionCombinator(tag, types, name) {
    return {
        kind: 'TaggedUnionCombinator',
        tag: tag,
        types: types,
        name: name
    };
}
exports.taggedUnionCombinator = taggedUnionCombinator;
function intersectionCombinator(types, name) {
    return {
        kind: 'IntersectionCombinator',
        types: types,
        name: name
    };
}
exports.intersectionCombinator = intersectionCombinator;
function keyofCombinator(values, name) {
    return {
        kind: 'KeyofCombinator',
        values: values,
        name: name
    };
}
exports.keyofCombinator = keyofCombinator;
function arrayCombinator(type, name) {
    return {
        kind: 'ArrayCombinator',
        type: type,
        name: name
    };
}
exports.arrayCombinator = arrayCombinator;
function readonlyArrayCombinator(type, name) {
    return {
        kind: 'ReadonlyArrayCombinator',
        type: type,
        name: name
    };
}
exports.readonlyArrayCombinator = readonlyArrayCombinator;
function tupleCombinator(types, name) {
    return {
        kind: 'TupleCombinator',
        types: types,
        name: name
    };
}
exports.tupleCombinator = tupleCombinator;
function recursiveCombinator(typeParameter, name, type) {
    return {
        kind: 'RecursiveCombinator',
        typeParameter: typeParameter,
        name: name,
        type: type
    };
}
exports.recursiveCombinator = recursiveCombinator;
function dictionaryCombinator(domain, codomain, name) {
    return {
        kind: 'DictionaryCombinator',
        domain: domain,
        codomain: codomain,
        name: name
    };
}
exports.dictionaryCombinator = dictionaryCombinator;
function typeDeclaration(name, type, isExported, isReadonly) {
    if (isExported === void 0) { isExported = false; }
    if (isReadonly === void 0) { isReadonly = false; }
    return {
        kind: 'TypeDeclaration',
        name: name,
        type: type,
        isExported: isExported,
        isReadonly: isReadonly
    };
}
exports.typeDeclaration = typeDeclaration;
function customTypeDeclaration(name, staticRepr, runtimeRepr, dependencies) {
    if (dependencies === void 0) { dependencies = []; }
    return {
        kind: 'CustomTypeDeclaration',
        name: name,
        static: staticRepr,
        runtime: runtimeRepr,
        dependencies: dependencies
    };
}
exports.customTypeDeclaration = customTypeDeclaration;
function customCombinator(staticRepr, runtimeRepr, dependencies) {
    if (dependencies === void 0) { dependencies = []; }
    return {
        kind: 'CustomCombinator',
        static: staticRepr,
        runtime: runtimeRepr,
        dependencies: dependencies
    };
}
exports.customCombinator = customCombinator;
var Vertex = /** @class */ (function () {
    function Vertex(id) {
        this.id = id;
        this.afters = [];
    }
    return Vertex;
}());
exports.Vertex = Vertex;
/** topological sort */
function tsort(graph) {
    var sorted = [];
    var visited = {};
    var recursive = {};
    Object.keys(graph).forEach(function visit(id, ancestors) {
        if (visited[id]) {
            return;
        }
        if (!graph.hasOwnProperty(id)) {
            return;
        }
        var vertex = graph[id];
        if (!Array.isArray(ancestors)) {
            ancestors = [];
        }
        ancestors.push(id);
        visited[id] = true;
        vertex.afters.forEach(function (afterId) {
            if (ancestors.indexOf(afterId) >= 0) {
                recursive[id] = true;
                recursive[afterId] = true;
            }
            else {
                visit(afterId, ancestors.slice());
            }
        });
        sorted.unshift(id);
    });
    return {
        sorted: sorted.filter(function (id) { return !recursive.hasOwnProperty(id); }),
        recursive: recursive
    };
}
exports.tsort = tsort;
function getTypeDeclarationMap(declarations) {
    var map = {};
    declarations.forEach(function (d) {
        map[d.name] = d;
    });
    return map;
}
exports.getTypeDeclarationMap = getTypeDeclarationMap;
var flatten = function (aas) {
    var r = [];
    aas.forEach(function (as) {
        r.push.apply(r, as);
    });
    return r;
};
exports.getNodeDependencies = function (node) {
    switch (node.kind) {
        case 'Identifier':
            return [node.name];
        case 'InterfaceCombinator':
        case 'StrictCombinator':
        case 'PartialCombinator':
            return flatten(node.properties.map(function (p) { return exports.getNodeDependencies(p.type); }));
        case 'TaggedUnionCombinator':
        case 'UnionCombinator':
        case 'IntersectionCombinator':
        case 'TupleCombinator':
            return flatten(node.types.map(function (type) { return exports.getNodeDependencies(type); }));
        case 'DictionaryCombinator':
            return exports.getNodeDependencies(node.domain).concat(exports.getNodeDependencies(node.codomain));
        case 'ArrayCombinator':
        case 'ReadonlyArrayCombinator':
        case 'TypeDeclaration':
        case 'RecursiveCombinator':
            return exports.getNodeDependencies(node.type);
        case 'CustomTypeDeclaration':
        case 'CustomCombinator':
            return node.dependencies;
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
            return [];
    }
};
function getTypeDeclarationGraph(declarations) {
    var graph = {};
    declarations.forEach(function (d) {
        var vertex = (graph[d.name] = new Vertex(d.name));
        (_a = vertex.afters).push.apply(_a, exports.getNodeDependencies(d));
        var _a;
    });
    return graph;
}
exports.getTypeDeclarationGraph = getTypeDeclarationGraph;
function escapeString(s) {
    return "'" + s.replace(/'/g, "\\'") + "'";
}
function isValidPropertyKey(s) {
    return /[-\/\s]/.exec(s) === null;
}
function addRuntimeName(s, name) {
    if (name) {
        return s + ', ' + escapeString(name);
    }
    return s;
}
function escapePropertyKey(key) {
    return isValidPropertyKey(key) ? key : escapeString(key);
}
function printRuntimeLiteralCombinator(literalCombinator) {
    var value = typeof literalCombinator.value === 'string' ? escapeString(literalCombinator.value) : literalCombinator.value;
    var s = "t.literal(" + value;
    s = addRuntimeName(s, literalCombinator.name);
    s += ')';
    return s;
}
function printDescription(description) {
    if (description) {
        return "/** " + description + " */\n";
    }
    return '';
}
function containsUndefined(type) {
    if (type.kind === 'UnionCombinator') {
        return type.types.some(containsUndefined);
    }
    else {
        return type.kind === 'UndefinedType';
    }
}
function getRuntimePropertyType(p) {
    if (p.isOptional && !containsUndefined(p.type)) {
        return unionCombinator([p.type, exports.undefinedType]);
    }
    else {
        return p.type;
    }
}
function printRuntimeProperty(p) {
    var type = getRuntimePropertyType(p);
    return "" + printDescription(p.description) + escapePropertyKey(p.key) + ": " + printRuntimeWithoutFormatting(type);
}
function printRuntimeInterfaceCombinator(interfaceCombinator) {
    var s = 't.interface({';
    s += interfaceCombinator.properties.map(function (p) { return printRuntimeProperty(p); }).join(',\n');
    s += "}";
    s = addRuntimeName(s, interfaceCombinator.name);
    s += ')';
    return s;
}
function printRuntimePartialCombinator(partialCombinator) {
    var s = 't.partial({';
    s += partialCombinator.properties.map(function (p) { return printRuntimeProperty(__assign({}, p, { isOptional: false })); }).join(',\n');
    s += "}";
    s = addRuntimeName(s, partialCombinator.name);
    s += ')';
    return s;
}
function printRuntimeStrictCombinator(strictCombinator) {
    var s = 't.strict({';
    s += strictCombinator.properties.map(function (p) { return printRuntimeProperty(p); }).join(',\n');
    s += "}";
    s = addRuntimeName(s, strictCombinator.name);
    s += ')';
    return s;
}
function printRuntimeTypesCombinator(combinatorKind, types, combinatorName) {
    var s = "t." + combinatorKind + "([";
    s += types.map(function (t) { return "" + printRuntimeWithoutFormatting(t); }).join(',');
    s += "]";
    s = addRuntimeName(s, combinatorName);
    s += ')';
    return s;
}
function printRuntimeUnionCombinator(c) {
    return printRuntimeTypesCombinator('union', c.types, c.name);
}
function printRuntimeTaggedUnionCombinator(c) {
    var s = "t.taggedUnion(" + escapeString(c.tag) + ", [";
    s += c.types.map(function (t) { return printRuntimeWithoutFormatting(t); }).join(',');
    s += "]";
    s = addRuntimeName(s, c.name);
    s += ')';
    return s;
}
function printRuntimeIntersectionCombinator(c) {
    return printRuntimeTypesCombinator('intersection', c.types, c.name);
}
function printRuntimeKeyofCombinator(c) {
    var s = "t.keyof({";
    s += c.values.map(function (v) { return escapePropertyKey(v) + ": true"; }).join(',');
    s += "}";
    s = addRuntimeName(s, c.name);
    s += ')';
    return s;
}
function printRuntimeArrayCombinator(c) {
    var s = "t.array(" + printRuntimeWithoutFormatting(c.type);
    s = addRuntimeName(s, c.name);
    s += ')';
    return s;
}
function printRuntimeReadonlyArrayCombinator(c) {
    var s = "t.readonlyArray(" + printRuntimeWithoutFormatting(c.type);
    s = addRuntimeName(s, c.name);
    s += ')';
    return s;
}
function printRuntimeTupleCombinator(c) {
    return printRuntimeTypesCombinator('tuple', c.types, c.name);
}
function printRuntimeTypeDeclaration(declaration) {
    var s = printRuntimeWithoutFormatting(declaration.type);
    if (declaration.isReadonly) {
        s = "t.readonly(" + s + ")";
    }
    s = "const " + declaration.name + " = " + s;
    if (declaration.isExported) {
        s = "export " + s;
    }
    return s;
}
function printRuntimeRecursiveCombinator(c) {
    var s = "t.recursive<" + c.typeParameter.name + ">(" + escapeString(c.name) + ", (" + c.name + ": t.Any) => " + printRuntimeWithoutFormatting(c.type) + ")";
    return s;
}
function printRuntimeDictionaryCombinator(c) {
    var s = "t.dictionary(" + printRuntimeWithoutFormatting(c.domain) + ", " + printRuntimeWithoutFormatting(c.codomain);
    s = addRuntimeName(s, c.name);
    s += ')';
    return s;
}
function printRuntimeWithoutFormatting(node) {
    switch (node.kind) {
        case 'Identifier':
            return node.name;
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
            return "t." + node.name;
        case 'LiteralCombinator':
            return printRuntimeLiteralCombinator(node);
        case 'InterfaceCombinator':
            return printRuntimeInterfaceCombinator(node);
        case 'PartialCombinator':
            return printRuntimePartialCombinator(node);
        case 'StrictCombinator':
            return printRuntimeStrictCombinator(node);
        case 'UnionCombinator':
            return printRuntimeUnionCombinator(node);
        case 'TaggedUnionCombinator':
            return printRuntimeTaggedUnionCombinator(node);
        case 'IntersectionCombinator':
            return printRuntimeIntersectionCombinator(node);
        case 'KeyofCombinator':
            return printRuntimeKeyofCombinator(node);
        case 'ArrayCombinator':
            return printRuntimeArrayCombinator(node);
        case 'ReadonlyArrayCombinator':
            return printRuntimeReadonlyArrayCombinator(node);
        case 'TupleCombinator':
            return printRuntimeTupleCombinator(node);
        case 'RecursiveCombinator':
            return printRuntimeRecursiveCombinator(node);
        case 'DictionaryCombinator':
            return printRuntimeDictionaryCombinator(node);
        case 'TypeDeclaration':
            return printRuntimeTypeDeclaration(node);
        case 'CustomTypeDeclaration':
        case 'CustomCombinator':
            return node.runtime;
    }
}
exports.printRuntimeWithoutFormatting = printRuntimeWithoutFormatting;
function printRuntime(node, options) {
    if (options === void 0) { options = exports.defaultOptions; }
    return prettier.format(printRuntimeWithoutFormatting(node), options);
}
exports.printRuntime = printRuntime;
function getRecursiveTypeDeclaration(declaration) {
    var name = declaration.name;
    var recursive = recursiveCombinator(identifier(name), name, declaration.type);
    return typeDeclaration(name, recursive, declaration.isExported, declaration.isReadonly);
}
function sort(declarations) {
    var map = getTypeDeclarationMap(declarations);
    var graph = getTypeDeclarationGraph(declarations);
    var _a = tsort(graph), sorted = _a.sorted, recursive = _a.recursive;
    var keys = Object.keys(recursive);
    var recursions = [];
    for (var i = 0; i < keys.length; i++) {
        var td = map[name];
        if (td.kind === 'TypeDeclaration') {
            recursions.push(getRecursiveTypeDeclaration(td));
        }
    }
    return sorted
        .reverse()
        .map(function (name) { return map[name]; })
        .concat(recursions);
}
exports.sort = sort;
function printStaticProperty(p) {
    var optional = p.isOptional ? '?' : '';
    return "" + printDescription(p.description) + escapePropertyKey(p.key) + optional + ": " + printStaticWithoutFormatting(p.type);
}
function printStaticLiteralCombinator(c) {
    return typeof c.value === 'string' ? escapeString(c.value) : String(c.value);
}
function printStaticInterfaceCombinator(c) {
    var s = '{';
    s += c.properties.map(function (p) { return printStaticProperty(p); }).join(',\n');
    s += "}";
    return s;
}
function printStaticPartialCombinator(c) {
    var s = '{';
    s += c.properties.map(function (p) { return printStaticProperty(__assign({}, p, { isOptional: true })); }).join(',\n');
    s += "}";
    return s;
}
function printStaticStrictCombinator(c) {
    var s = '{';
    s += c.properties.map(function (p) { return printStaticProperty(p); }).join(',\n');
    s += "}";
    return s;
}
function printStaticTypesCombinator(types, separator) {
    return types.map(function (t) { return separator + " " + printStaticWithoutFormatting(t); }).join(' ');
}
function printStaticUnionCombinator(c) {
    return printStaticTypesCombinator(c.types, '|');
}
function printStaticTaggedUnionCombinator(c) {
    return printStaticTypesCombinator(c.types, '|');
}
function printStaticIntersectionCombinator(c) {
    return printStaticTypesCombinator(c.types, '&');
}
function printStaticKeyofCombinator(c) {
    return printStaticWithoutFormatting(unionCombinator(c.values.map(function (value) { return literalCombinator(value); })));
}
function printStaticArrayCombinator(c) {
    return "Array<" + printStaticWithoutFormatting(c.type) + ">";
}
function printStaticReadonlyArrayCombinator(c) {
    return "ReadonlyArray<" + printStaticWithoutFormatting(c.type) + ">";
}
function printStaticDictionaryCombinator(c) {
    return "{[ key: " + printStaticWithoutFormatting(c.domain) + "]: " + printStaticWithoutFormatting(c.codomain) + " }";
}
function printStaticTupleCombinator(c) {
    var s = '[';
    s += c.types.map(function (t) { return "" + printStaticWithoutFormatting(t); }).join(',');
    s += "]";
    return s;
}
function printStaticTypeDeclaration(declaration) {
    var s = printStaticWithoutFormatting(declaration.type);
    if ((declaration.type.kind === 'InterfaceCombinator' ||
        declaration.type.kind === 'StrictCombinator' ||
        declaration.type.kind === 'PartialCombinator') &&
        !declaration.isReadonly) {
        s = "interface " + declaration.name + " " + s;
    }
    else {
        if (declaration.isReadonly) {
            s = "Readonly<" + s + ">";
        }
        s = "type " + declaration.name + " = " + s;
    }
    if (declaration.isExported) {
        s = "export " + s;
    }
    return s;
}
function printStaticWithoutFormatting(node) {
    switch (node.kind) {
        case 'Identifier':
            return node.name;
        case 'StringType':
        case 'NumberType':
        case 'BooleanType':
        case 'NullType':
        case 'UndefinedType':
        case 'AnyType':
        case 'ObjectType':
        case 'FunctionType':
            return node.name;
        case 'IntegerType':
            return 'number';
        case 'AnyArrayType':
            return 'Array<t.mixed>';
        case 'AnyDictionaryType':
            return '{ [key: string]: t.mixed }';
        case 'LiteralCombinator':
            return printStaticLiteralCombinator(node);
        case 'InterfaceCombinator':
            return printStaticInterfaceCombinator(node);
        case 'PartialCombinator':
            return printStaticPartialCombinator(node);
        case 'StrictCombinator':
            return printStaticStrictCombinator(node);
        case 'UnionCombinator':
            return printStaticUnionCombinator(node);
        case 'TaggedUnionCombinator':
            return printStaticTaggedUnionCombinator(node);
        case 'IntersectionCombinator':
            return printStaticIntersectionCombinator(node);
        case 'KeyofCombinator':
            return printStaticKeyofCombinator(node);
        case 'ArrayCombinator':
            return printStaticArrayCombinator(node);
        case 'ReadonlyArrayCombinator':
            return printStaticReadonlyArrayCombinator(node);
        case 'TupleCombinator':
            return printStaticTupleCombinator(node);
        case 'RecursiveCombinator':
            return printStaticWithoutFormatting(node.type);
        case 'DictionaryCombinator':
            return printStaticDictionaryCombinator(node);
        case 'TypeDeclaration':
            return printStaticTypeDeclaration(node);
        case 'CustomTypeDeclaration':
        case 'CustomCombinator':
            return node.static;
    }
}
exports.printStaticWithoutFormatting = printStaticWithoutFormatting;
exports.defaultOptions = {
    parser: 'typescript',
    semi: false,
    singleQuote: true
};
function printStatic(node, options) {
    if (options === void 0) { options = exports.defaultOptions; }
    return prettier.format(printStaticWithoutFormatting(node), options);
}
exports.printStatic = printStatic;
//# sourceMappingURL=index.js.map