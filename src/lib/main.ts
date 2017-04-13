'use strict';
import * as http from 'http';
import PORT from './config';
import { RFunction, RClass, RMethod, RVariables} from '../language/typescript/render-common'

const server = http.createServer((req, res) => {
  res.end('hello!');
});

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);

  let classDef =
    RClass.$def('MyApplication', 'React',
      RMethod.$def('render', [], undefined, 'return "Hello"'),
      RMethod.$def('listner',
        [
          { name: 'event', type: 'string' },
          RVariables.$def('args', undefined, '1'),
          RVariables.$optional('params', 'string')
        ],
        'string',
        RVariables.$let('index','number','10'),
        'return "How are you"'
      )
    )
  console.log(classDef);
});
