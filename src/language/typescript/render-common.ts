export namespace R {
    export const tab = '\t'
    export const newLine = '\n'
    
    interface ParamConfig {
        name:string,
        type:string
    }

    export function indentRight(code:string):string {
        return code.replace(/^/gm, `${R.tab}`);
    }

    export function $parameters(params:any[]): string[] {
        return params.map(param => {
            if (typeof param === 'string') {
                return (param as string);
            }
            let parameter:ParamConfig = param as ParamConfig;
            return `${parameter.name}: ${parameter.type}`
        })
    }

    export function $export(statement:string): string {
        return `export ${statement}`
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

}


export namespace RVariables {
    export function $def(name: string, type?: string, ...expr: string[]): string {
        return $create(name, '', type, ...expr);
    }

    export function $let(name: string, type?: string, ...expr: string[]): string {
        return $create(name, 'let', type, ...expr);
    }

    export function $var(name: string, type?: string, ...expr: string[]): string {
        return $create(name, 'var', type, ...expr);
    }

    export function $const(name: string, type?: string, ...expr: string[]): string {
        return $create(name, 'const', type, ...expr);
    }

    export function $optional(name: string, type?: string, ...expr: string[]): string {
        return $create(`${name}?`, '', type, ...expr);
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
        let content = statements ? `${statements.join('\n')}` : ''
        let returnObj = returnType? `: ${returnType}`: ''
        return [`function ${name}(${R.$parameters(params).join(', ')})${returnObj} {`,
                `${R.indentRight(content)}`,
                `}`,
                ' ']
                .join('\n')
    }

    export function $arrow(params: any[], returnType?:string, ...statements:string[]): string {
        let returnObj = returnType? `: ${returnType}`: ''
        let content = statements ? `${statements.join('\n')}` : ''
        if (statements.length == 1) return `(${R.$parameters(params).join(' ,')}) => ${statements[0]}`
        return [`( ${R.$parameters(params).join(', ')} )${returnObj} => {`,
                `${R.indentRight(content)}`,
                `}`]
                .join('\n')
    }

    export function $anonymus(params: any[], returnType?:string, ...statements:string[]): string {
        let returnObj = returnType? `: ${returnType}`: ''
        let content = statements ? `${statements.join('\n')}` : ''
        return [`function (${R.$parameters(params).join(', ')})${returnObj} {`,
                `${R.indentRight(content)}`,
                `}`,
                ' ']
                .join('\n')
    }

}

export namespace RMethod {
    export function $def(name: string, params: any[], returnType?:string, ...statements:string[]): string {
        let returnObj = returnType? `: ${returnType}`: ''
        let content = statements ? `${statements.join('\n')}` : ''
        return [`${name}(${R.$parameters(params).join(', ')})${returnObj} {`,
                `${R.indentRight(content)}`,
                `}`,
                '']
                .join('\n')
    }
}


export namespace RClass {

    export function $def(name: string,superClass: string, ...statements:string[]): string {
        let extendClass = superClass ? `extends ${superClass}` : ''
        let content = statements ? `${statements.join('\n')}` : ''
        return [`class ${name} ${extendClass} {`,
                '',
                `${R.indentRight(content)}`,
                `}`,
                '']
                .join('\n')
    }
}