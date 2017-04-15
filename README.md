# Typescript CodeGen
A project written in Typescript to generate Typescript Code from Models/Entites

* [React](# React)
* [Angular2](# Angular2)


## React
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
        RTypes.$String,                                         // RETRUN TYPE
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


## Angular2
### Generated File
``` Typescript
import { Component} from 'angular2/core'
import TodoStore from '../store/todostore'
import TodoItem from '../todoitem/todoitem'
import ItemUpdatedEvent from '../todoitem/itemupdatedevent'
import { addItem ,removeItem ,updateItemText ,updateItemCompletion} from '../store/actions'

@Component({
  selector: 'todo-list',
  templateUrl: 'app/todolist/todolist.html' ,
  styleUrls: ['app/todolist/todolist.css'] ,
  directives: [TodoItem]
})
export default class TodoList  {
        
  newItem = test
  store = TodoStore
        
  constructor(store: TodoStore) {
      this.store = store
  }

  addItem() {
      this.store.dispatch(addItem(this.newItem))
      this.newItem = ''
  }

  removeItem(itemId: string) {
      this.store.dispatch(removeItem(itemId))
  }

  itemUpdated(event: ItemUpdatedEvent) {
      if (event.text !== undefined) {
          if (event.text === '') {
            this.store.dispatch(removeItem(event.itemId))
          }
          else {
            this.store.dispatch(updateItemText(event.itemId ,event.text))
          }
      }
      if (event.completed !== undefined) {
            this.store.dispatch(updateItemCompletion(event.itemId ,event.text))
      }
  }
}

```

### Source
``` Typescript 
R.$file(
      RImport.$def(['Component'], 'angular2/core'),
      RImport.$default('TodoStore', '../store/todostore'),
      RImport.$default('TodoItem', '../todoitem/todoitem'),
      RImport.$default('ItemUpdatedEvent', '../todoitem/itemupdatedevent'),
      RImport.$def(['addItem', 'removeItem', 'updateItemText', 'updateItemCompletion'], '../store/actions'),

      RDecorator.$call('Component', true,
        { name: 'selector', type: "'todo-list'" },
        { name: 'templateUrl', type: "'app/todolist/todolist.html'" },
        { name: 'styleUrls', type: "['app/todolist/todolist.css']" },
        { name: 'directives', type: '[TodoItem]' }
      ),
      R.$export(R.$default(
        RClass.$def('TodoList', undefined,
          RVariables.$def('newItem', undefined, 'test'),
          RVariables.$def('store', undefined, 'TodoStore'),

          RClass.$constructor([{ name: 'store', type: 'TodoStore' }], undefined,
            RVariables.$assign(RClass.$ref('store'), 'store')
          ),

          RMethod.$def('addItem', [], undefined,
            RMethod.$call(RClass.$ref('store.dispatch'),
              RMethod.$call('addItem', RClass.$ref('newItem'))
            ),
            RVariables.$assign(RClass.$ref('newItem'), "''")
          ),

          RMethod.$def('removeItem', [{ name: 'itemId', type: RTypes.$String }], undefined,
            RMethod.$call(
              RClass.$ref('store.dispatch'),
              RMethod.$call('removeItem', 'itemId')
            )
          ),

          RMethod.$def('itemUpdated', [{ name: 'event', type: 'ItemUpdatedEvent' }], undefined,

            RConditonal.$if(RComparison.$notEqualTo('event.text', undefined),

              RConditonal.$if(RComparison.$equalTo('event.text', "''"),
                RMethod.$call(RClass.$ref('store.dispatch'), RMethod.$call('removeItem', 'event.itemId'))
              ),
              RConditonal.$else(
                RMethod.$call(RClass.$ref('store.dispatch'), RMethod.$call('updateItemText', 'event.itemId', 'event.text'))
              )
            ),

            RConditonal.$if(RComparison.$notEqualTo('event.completed', 'undefined'),
              RMethod.$call(RClass.$ref('store.dispatch'), RMethod.$call('updateItemCompletion', 'event.itemId', 'event.text'))
            )
          )
        )
      )
      )
    )
```
