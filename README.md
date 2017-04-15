# Typescript CodeGen
A project written in Typescript to generate Typescript Code from Models/Entites

### Generted File
``` Typescript
import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Application extends React.Component {

  public instance: number
  private props: string
  protected state: Model

  listner(event: string , args = 1 , params?: string[] ): string {
    let index: number = 10
    params.map(( event: string ) =>  {
      let append = 'New ::'
      return append + event
    })
    return params.join(" ,")
  }

  render() {
    return (
      <div className="Application">
        <Header \>
        <Content \>
        <Footer \>
      </div>
    )
  }
}
```

### Source
```  typescript
R.$file(
    RImport.$as('React', 'react'),     // IMPORTS
    RImport.$as('ReactDOM', 'react-dom'),

    RClass.$def('Application', 'React.Component',     // NAME , SUPER CLASS & below are its STATEMENTS

      R.$public(RVariables.$def('instance', RTypes.$Number)),   // PROPTERTIES
      R.$private(RVariables.$def('props', RTypes.$String)),
      R.$protected(RVariables.$def('state', 'Model')),    // PROPERTIES end
      '',
      RMethod.$def('listner',                             // NAME
        [                                                 // PARAMS
          { name: 'event', type: 'string' },
          RVariables.$def('args', undefined, '1'),
          RVariables.$optional('params', `${RTypes.$String}[]`)
        ],                                                // PARAMS end
        'string',                                         // RETRUN TYPE
        RVariables.$let('index', RTypes.$Number, '10'),         // STATEMENTS
        RIterator.$map('params', undefined, [{ name: 'event', type: RTypes.$String }],
          "let append = 'New ::'",
          "return append + event"
        ),
        'return params.join(" ,")'                        // STATEMENTS end
      ),

      RMethod.$def('render', [], undefined,               // NAME, PARAMS, RETRUN TYPE,
        `return (`,  // STATEMENTS
        RTSX.$def('div', [{ name: "className", value: 'Application' }],
          RTSX.$def('Header', []),
          RTSX.$def('Content', []),
          RTSX.$def('Footer', [])
        ),
        ')'
      ),
    )
  )
```
