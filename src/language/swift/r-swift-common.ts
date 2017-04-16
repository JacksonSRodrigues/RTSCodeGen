export namespace R {

    export const tab = '\t'

    export function $file(...statements:string[]): string {
        return statements.join('\n\n')
    }

    export function $indentRight(code:string):string {
        return code.replace(/^/gm, `${R.tab}`);
    }

    export function $block(...statements:string[]):string {
        let content = statements ? `${statements.join('\n')}` : ''
        return [`{`,
                `${R.$indentRight(content)}`,
                `}`
               ].join('\n')
    }

    interface ParamConfig {
        name:string,
        type:string,
        altName?:string,
        value?:string
    }

    export function $parameters(params:any[]): string {
        if (!params) return ''
        
        return params.map(param => {
            if (typeof param === 'string') {
                return (param as string);
            }
            let parameter:ParamConfig = param as ParamConfig;
            return `${parameter.name}: ${parameter.type}`
        })
        .join(' ,')
    }

     export function $expandParameters(params:any[]):string {
        if (!params) return ''
        
        return params.map(param => {
            if (typeof param === 'string') {
                return (param as string);
            }
            let parameter:ParamConfig = param as ParamConfig;
            return `${parameter.name}: ${parameter.value}`
        })
        .join(' ,')
    }

    export function $export(statement:string): string {
        return `${statement}`
    }

    export function $default(statement:string): string {
        return `${statement}`
    }

    export function $static(statement:string): string {
        return `static ${statement}`
    }

    export function $public(statement:string): string {
        return `public ${statement}`
    }

    export function $private(statement:string): string {
        return `private ${statement}`
    }

    export function $protected(statement:string): string {
        return `protected ${statement}`
    }

    export function $namespace(name:string, ...statements:string[]) {
        return `namespace ${name} ${R.$block(...statements)}`
    }

}

export namespace RTypes {
    export const $String = 'String'
    export const $Number = 'Double'
    export const $Boolean = 'Bool'
    export const $Array = 'Array'
    export const $Any = 'any'
    export const $Void = 'void'
    export const $Null = 'null'
    export const $Undefined = 'undefined'
}


export namespace RVariables {
    export function $def(name: string, type?: string, ...expr: string[]): string {
        return $create(name, '', type, ...expr);
    }

    export function $let(name: string, type?: string, ...expr: string[]): string {
        return $create(name, 'var', type, ...expr); 
    }

    export function $var(name: string, type?: string, ...expr: string[]): string {
        return $create(name, 'var', type, ...expr);
    }

    export function $const(name: string, type?: string, ...expr: string[]): string {
        return $create(name, 'let', type, ...expr);
    }

    export function $optional(name: string, type?: string, ...expr: string[]): string {
        return $create(`${name}`, '', `${type}?`, ...expr);
    }

    export function $assign(lhs:string,rhs:string) {
        return $def(lhs,undefined,rhs);
    }

    function $create(name: string, decl?: string, type?: string, ...expr: string[]): string {
        let declaration = decl ? `${decl} ` : ''
        let variableType = type ? `: ${type}` : ''
        let expression = (expr && expr.length>0) ? `= ${expr.join('\n')}` : ''
        return `${declaration} ${name}${variableType} ${expression}`
    }
}


export namespace RFunction {

    export function $def(name: string, params: any[], returnType?:string, ...statements:string[]): string {
        let returnObj = returnType? ` -> ${returnType}`: ''
        return [`func ${name}(${R.$parameters(params)})${returnObj}  ${R.$block(...statements)}`,
                ' ']
                .join('\n')
    }

    export function $arrow(params: any[], returnType?:string, ...statements:string[]): string {
        let returnObj = returnType? `-> ${returnType}`: ''
        let content = statements ? `${statements.join('\n')}` : ''
        if (statements.length == 1) return `(${R.$parameters(params)}) in ${statements[0]}`
        return [`{ (${R.$parameters(params)})${returnObj} in`,
                     `${R.$indentRight(content)}`,
                `}`]
                .join('\n')
    }

    // NEED TO MODIFY
    export function $anonymus(params: any[], returnType?:string, ...statements:string[]): string {
        let returnObj = returnType? `: ${returnType}`: ''
        return [`func (${R.$parameters(params)})${returnObj}  ${R.$block(...statements)}`,
                ' ']
                .join('\n')
    }

}

export namespace RProperties {
    export function $def(name:string,type:string,expression:string) :string {
        return RVariables.$let(name,type,expression)
    }
}

export namespace RMethod {
    export function $def(name: string, params: any[], returnType?:string, ...statements:string[]): string {
        let returnObj = returnType? `: ${returnType}`: ''
        return [`func ${name}(${R.$parameters(params)})${returnObj} ${R.$block(...statements)}`,
                '']
                .join('\n')
    }

    export function $call(object:string,...params:any[]): string {
        return `${object}(${R.$expandParameters(params)})`
    }
}


export namespace RClass {
    export function $ref(name:string) : string {
        return `self.${name}`
    }

    export function $constructor(params: any[], returnType?:string, ...statements:string[]) : string {
        return RMethod.$def('init',params , returnType, ...statements)
    }

    export function $def(name: string,superClass: string, ...statements:string[]): string {
        let extendClass = superClass ? `: ${superClass}` : ''
        return [`class ${name} ${extendClass} ${R.$block(...statements)}`,
                '']
                .join('\n')
    }
}

export namespace RImport {
    export function $def(imports:string[], path:string): string {
        return imports.map( (imp:string) => `import ${imp}`).join('\n')
    }

    export function $default(imports:string, path:string): string {
        return `import ${R.$parameters([imports])}`
    }

    export function $as(newName:string, path:string): string {
        return $default(newName,path)
    }
}