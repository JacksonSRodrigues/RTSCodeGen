import {R} from './r-swift-common'

export namespace RComparison {

    export function $equalTo(lhs:string, rhs:string):string {
        return `${lhs} == ${rhs}`
    }

    export function $notEqualTo(lhs:string, rhs:string):string {
        return `${lhs} != ${rhs}`
    }
}

export namespace RConditonal {
    export function $if(expression:string, ...statements:string[]): string {
        return `if (${expression}) ${R.$block(...statements)}`
    }

    export function $else(...statements:string[]): string {
        return `else ${R.$block(...statements)}`
    }

    export function $elseIf(expression:string, ...statements:string[]): string {
        return `else if (${expression}) ${R.$block(...statements)}`
    }
}