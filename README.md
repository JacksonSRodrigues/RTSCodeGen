# ReactRenderer
A project written in Typescript to generate Typescript Code from Models/Entites


```
    RClass.$def('MyApplication', 'React',    // NAME , SUPER CLASS & below are its STATEMENTS

      R.$public(RVariables.$def('instance','number')),
      R.$private(RVariables.$def('props','string')),
      R.$protected(RVariables.$def('state','Model')),

      RMethod.$def('render', [], undefined, 'return "Hello"'),  // NAME, PARAMS, RETRUN TYPE, STATEMENTS

      RMethod.$def('listner',                         // NAME
        [                                             // PARAMS
          { name: 'event', type: 'string' },
          RVariables.$def('args', undefined, '1'),
          RVariables.$optional('params', 'string[]')
        ],                                            // PARAMS end
        'string',                                     // RETRUN TYPE
        RVariables.$let('index', 'number', '10'),     // STATEMENTS
        RIterator.$map('params', undefined, [{ name: 'event', type: 'string' }],
          "let append = 'My'",
          "return append + event"
        ),
        'return params.join(" ,")'                    // STATEMENTS end
      )

    )
```



```
class MyApplication extends React {

        public  instance: number
        private  props: string
        protected  state: Model

        render() {
                return "Hello, how are you"
        }

        listner(event: string,  args = 1,  params?: string[] ): string {
                let  index: number = 10
                params.map(( event: string ) => {
                        let append = 'My'
                        return append + event
                })
                return params.join(" ,")
        }

}
```