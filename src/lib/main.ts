'use strict';
import * as http from 'http';
import PORT from './config';
import { R, RTypes, RFunction, RClass, RMethod, RVariables, RProperties , RIterator, RImport, RTSX, RDecorator, RComparison, RConditonal} from '../language/swift'

const server = http.createServer((req, res) => {
  res.end('hello!');
});

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  logAngular2Code()
});

function logAngular2Code() {
  let classDef =
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
         
          RProperties.$def('newItem', undefined, 'test'),
          RProperties.$def('store', undefined, 'TodoStore'),

          RClass.$constructor([{ name: 'store', type: 'TodoStore' }], undefined,
            RVariables.$assign(RClass.$ref('store'), 'store')
          ),

          RMethod.$def('addItem', [], undefined,
            RMethod.$call(RClass.$ref('store.dispatch'),
              {name:'event', value: RMethod.$call('addItem',  {name:'event', value: RClass.$ref('newItem')})}
            ),
            RVariables.$assign(RClass.$ref('newItem'), "''")
          ),

          RMethod.$def('removeItem', [{ name: 'itemId', type: RTypes.$String }], undefined,
            RMethod.$call(
              RClass.$ref('store.dispatch'),  
              { name:'item', value: 
                RMethod.$call('removeItem',  {name:'id', value: 'itemId'})
              })
          ),

          RMethod.$def('itemUpdated', [{ name: 'event', type: 'ItemUpdatedEvent' }], undefined,

            RConditonal.$if(RComparison.$notEqualTo('event.text', undefined),

              RConditonal.$if(RComparison.$equalTo('event.text', "''"),
                RMethod.$call(RClass.$ref('store.dispatch'), {name:'event', value: RMethod.$call('removeItem', { name:'id', value:'event.itemId'}) })
              ),
              RConditonal.$else(
                RMethod.$call(RClass.$ref('store.dispatch'),  {name:'event', value: RMethod.$call('updateItemText', { name:'id', value:'event.itemId'}, { name:'title', value:'event.text'}) })
              )
            ),

            RConditonal.$if(RComparison.$notEqualTo('event.completed', 'undefined'),
              RMethod.$call(RClass.$ref('store.dispatch'),  {name:'event', value: RMethod.$call('updateItemCompletion',  { name:'id', value:'event.itemId'},{ name:'title', value:'event.text'}) })
            )
          )
        )
      )
      )
    )
    console.log(classDef)
}






function logReactCode() {
  let classDef =
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
            "let append = 'New :'",
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
    
  console.log(classDef);
}


