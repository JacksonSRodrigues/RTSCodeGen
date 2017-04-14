'use strict';
import * as http from 'http';
import PORT from './config';
import { R, RFunction, RClass, RMethod, RVariables, RIterator } from '../language/typescript'

const server = http.createServer((req, res) => {
  res.end('hello!');
});

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  logCode()
});

function logCode() {
  let classDef =
    RClass.$def('MyApplication', 'React',
      R.$public(RVariables.$def('instance','number')),
      R.$private(RVariables.$def('props','string')),
      R.$protected(RVariables.$def('state','Model')),
      '',
      RMethod.$def('render', [], undefined, 'return "Hello, how are you"'),
      RMethod.$def('listner',                         // NAME
        [                                             // PARAMS
          { name: 'event', type: 'string' },
          RVariables.$def('args', undefined, '1'),
          RVariables.$optional('params', 'string[]')
        ],                                            // PARAMS end
        'string',                                     // RETRUN TYPE
        RVariables.$let('index', 'number', '10'),     // CODE
        RIterator.$map('params', undefined, [{ name: 'event', type: 'string' }],
          "let append = 'New'",
          "return append + event"
        ),
        'return params.join(" ,")'                    // CODE end
      )
    )
  console.log(classDef);
}


