import { expect } from 'chai'
import { R } from '../../../language/typescript'
describe('R',()=>{
    describe('intend right',()=> {
        it('should append tab to shift the contnet to right',()=>{
            let text = 'hello'
            let result = R.$indentRight(`${text}`)
            expect(result).be.equal(`\t${text}`)
        })
        it('should append tab to the start of each line to shift the contnet to right',()=>{
            let texts = ['hello','indent']
            let result = R.$indentRight(`${texts.join('\n')}`).split('\n')
            expect(result[0]).be.equal(`\t${texts[0]}`)
            expect(result[1]).be.equal(`\t${texts[1]}`)
        })
    })
})