'use strict';
import * as http from 'http';
import PORT from './config';
import { R, RTypes, RFunction, RClass, RMethod, RVariables, RIterator, RImport, RTSX} from '../language/typescript'

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
          RVariables.$let('index',  RTypes.$Number, '10'),         // STATEMENTS
          RIterator.$map('params', undefined, [{ name: 'event', type:  RTypes.$String }],
            "let append = 'New ::'",
            "return append + event"
          ),
          'return params.join(" ,")'                        // STATEMENTS end
        ),
        
        RMethod.$def('render', [], undefined,               // NAME, PARAMS, RETRUN TYPE,
         `return (`,  // STATEMENTS
           RTSX.$def('div',[{name:"className",value:'Application'}],
                RTSX.$def('Header',[]),
                RTSX.$def('Content',[]),
                RTSX.$def('Footer',[])
                ),
          ')'
         ),
      )
    )
    
  console.log(classDef);
}


