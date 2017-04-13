namespace R {
    export const tab = '\t'    
    
    interface ParamConfig {
        name:string,
        type:string
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

}


export namespace RVariables {
    export function $def(name: string, type?: string, ...expr: string[]): string {
        return $create(name, '', type, expr);
    }

    export function $let(name: string, type?: string, ...expr: string[]): string {
        return $create(name, 'let', type, expr);
    }

    export function $var(name: string, type?: string, ...expr: string[]): string {
        return $create(name, 'var', type, expr);
    }

    export function $const(name: string, type?: string, ...expr: string[]): string {
        return $create(name, 'const', type, expr);
    }

    export function $optional(name: string, type?: string, ...expr: string[]): string {
        return $create(`${name}?`, '', type, expr.length>0?expr:undefined);
    }

    export function $create(name: string, decl?: string, type?: string, expr?: string[]): string {
        let declaration = decl ? `${decl} ` : ''
        let variableType = type ? `: ${type}` : ''
        let expression = expr ? `= ${expr.join('\n')}` : ''
        return `${declaration} ${name}${variableType} ${expression}`
    }
}


export namespace RFunction {

    export function $def(name: string, params: any[], returnType?:string, ...statements:string[]): string {
        let content = statements ? `${statements.join('\n').replace('\n',`\n+${R.tab}`)}` : ''
        let returnObj = returnType? `: ${returnType}`: ''
        return [`function ${name}(${R.$parameters(params).join(', ')})${returnObj} {`,
                `${R.tab}${content}`,
                `}`]
                .join('\n')
    }

    export function $arrow(params: any[], returnType?:string, ...statements:string[]): string {
        let returnObj = returnType? `: ${returnType}`: ''
        let content = statements ? `${statements.join('\n').replace('\n',`\n+${R.tab}`)}` : ''
        if (statements.length == 1) return `(${R.$parameters(params).join(' ,')}) => ${statements[0]}`
        return [`( ${R.$parameters(params).join(', ')} )${returnObj} => {`,
                `${R.tab}${content}`,
                `}`]
                .join('\n')
    }

    export function $anonymus(params: any[], returnType?:string, ...statements:string[]): string {
        let returnObj = returnType? `: ${returnType}`: ''
        let content = statements ? `${statements.join('\n').replace('\n',`\n+${R.tab}`)}` : ''
        return [`function (${R.$parameters(params).join(', ')})${returnObj} {`,
                `${R.tab}${content}`,
                `}`]
                .join('\n')
    }

}

export namespace RMethod {
    export function $def(name: string, params: any[], returnType?:string, ...statements:string[]): string {
        let returnObj = returnType? `: ${returnType}`: ''
        let content = statements ? `${statements.join('\n').replace('\n',`\n+${R.tab}`)}` : ''
        return [`${name}(${R.$parameters(params).join(', ')})${returnObj} {`,
                `${R.tab}${content}`,
                `}`]
                .join('\n')
    }
}


export namespace RClass {

    export function $def(name: string,superClass: string, ...statements:string[]): string {
        let extendClass = superClass ? `extends ${superClass}` : ''
        let content = statements ? `${statements.join('\n').replace('\n',`\n+${R.tab}`)}` : ''
        return [`class ${name} ${extendClass} {`,
                `${R.tab}${content}`,
                `}`]
                .join('\n')
    }
}