import {R,RFunction} from './render-common'
export namespace RIterator {

    export function $map(source:string,contentType:string, parms:any[], ...expressions:string[]): string {
        return `${source}.map(${RFunction.$arrow(parms,undefined,...expressions)})`
    }

    export function $filter(source:string,contentType:string, parms:any[], ...expressions:string[]): string {
        return `${source}.filter(${RFunction.$arrow(parms,undefined,...expressions)})`
    }

    export function $reduce(source:string,contentType:string, parms:any[], initialVal?:any, ...expressions:string[]): string {
        return `${source}.reduce(${RFunction.$arrow(parms,undefined,...expressions)},${initialVal})`
    }

}
