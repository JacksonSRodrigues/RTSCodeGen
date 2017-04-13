# ReactRenderer


```
    RClass.$def('MyApplication', 'React',
      RMethod.$def('render', [], undefined, 'return "Hello"'),
      RMethod.$def('listner',
        [
          { name: 'event', type: 'string' },
          RVariables.$def('args', undefined, '1'),
          RVariables.$optional('params', 'string')
        ],
        'string',
        RVariables.$let('index', 'number', '10'),
        'return "How are you"'
      )
    )
```



```
class MyApplication extends React {

        render() {
                return "Hello"
        }

        listner(event: string,  args = 1,  params?: string ): string {
                let  index: number = 10
                return "How are you"
        }

}
```