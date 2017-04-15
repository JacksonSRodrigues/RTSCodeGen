import {R} from './rts-common'

function $expandProperties(props:any[]):string {
    let properties:string = ''
    if(props.length > 0) {
        properties = props.map( (prop)=> `${prop.name}="${prop.value}"`).join(' ')
    }
    return properties;
}

export namespace RTSX {
    export function $def(tag:string, props:any[], ...statements:string[]):string {
        let properties:string = $expandProperties(props)
        let content:string = statements? statements.join('\n') : ''
        if (!statements || statements.length==0) return `<${tag} ${properties}\\>`
        return [`<${tag} ${properties}\>`,
                `${R.$indentRight(content)}`,
                `</${tag}>`].join('\n')

    }
} 

export namespace RDecorator {
    export function $call(name:string, hasBlock = false, ...args:any[]): string {
        
        let properties:string = `${R.$parameters(args).replace(' ,',', \r\n')}`;
        if (hasBlock) {
            properties = ['{',
                            `${R.$indentRight(properties)}`,
                          '}'].join('\n')
        }

        properties = args.length>0? `(${properties})`: ''
        return `@${name}${properties}`
    }
}