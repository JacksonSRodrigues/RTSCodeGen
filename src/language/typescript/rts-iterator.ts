import { R, RFunction } from './rts-common'
export namespace RIterator {

    export namespace RFor {

        export function $of(source: string, parameter: string, ...statements: string[]): string {
            return $(`let ${parameter} of ${source}`, ...statements)
        }

        export function $in(source: string, index: string, ...statements: string[]): string {
            return $(`let ${index} in ${source}`, ...statements)
        }

        export function $each(source: string, parameter: string, ...statements: string[]) {
            return `${source}.forEach( ${RFunction.$arrow([parameter], undefined, ...statements)})`
        }

        function $(expression: string, ...statements: string[]): string {
            let content = statements ? `${statements.join('\n')}` : ''
            return [`for (${expression}) {`,
            `${R.$indentRight(content)}`,
                `}`].join('\n')
        }

    }



    export function $map(source: string, contentType: string, parms: any[], ...expressions: string[]): string {
        return `${source}.map(${RFunction.$arrow(parms, undefined, ...expressions)})`
    }

    export function $filter(source: string, contentType: string, parms: any[], ...expressions: string[]): string {
        return `${source}.filter(${RFunction.$arrow(parms, undefined, ...expressions)})`
    }

    export function $reduce(source: string, contentType: string, parms: any[], initialVal?: any, ...expressions: string[]): string {
        return `${source}.reduce(${RFunction.$arrow(parms, undefined, ...expressions)},${initialVal})`
    }

}
