# ReactRenderer
A project written in Typescript to generate Typescript Code from Models/Entites

### Generted File
``` typescript
import * as React from 'react'
import * as ReactDOM from 'react-dom'

class MyApplication extends React.Component {
        public  instance: number
        private  props: string
        protected  state: Model

        render() {
                return "Hello, how are you"
        }

        listner(event: string , args = 1 , params?: string[] ): string {
                let  index: number = 10
                params.map(( event: string ) =>  {
                        let append = 'New :'
                        return append + event
                })
                return params.join(" ,")
        }

}
```

### Source
```  typescript
R.$file(
      RImport.$as('React', 'react'),     // IMPORTS
      RImport.$as('ReactDOM', 'react-dom'),

      RClass.$def('MyApplication', 'React.Component',     // NAME , SUPER CLASS & below are its STATEMENTS

        R.$public(RVariables.$def('instance', 'number')),   // PROPTERTIES
        R.$private(RVariables.$def('props', 'string')),
        R.$protected(RVariables.$def('state', 'Model')),    // PROPERTIES end
        '',
        RMethod.$def('render', [], undefined,               // NAME, PARAMS, RETRUN TYPE,
         'return "Hello, how are you"'),                    // STATEMENTS

        RMethod.$def('listner',                             // NAME
          [                                                 // PARAMS
            { name: 'event', type: 'string' },
            RVariables.$def('args', undefined, '1'),
            RVariables.$optional('params', 'string[]')
          ],                                                // PARAMS end
          'string',                                         // RETRUN TYPE
          RVariables.$let('index', 'number', '10'),         // STATEMENTS
          RIterator.$map('params', undefined, [{ name: 'event', type: 'string' }],
            "let append = 'New :'",
            "return append + event"
          ),
          'return params.join(" ,")'                        // STATEMENTS end
        )
      )
    )
```