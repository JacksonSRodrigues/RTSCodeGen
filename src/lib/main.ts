'use strict';
import * as http from 'http';
import PORT from './config';
import { R, RFunction, RClass, RMethod, RVariables, RIterator, RImport} from '../language/typescript'

const server = http.createServer((req, res) => {
  res.end('hello!');
});

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  logCode()
});

function logCode() {
  let classDef =
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
    
  console.log(classDef);
}


