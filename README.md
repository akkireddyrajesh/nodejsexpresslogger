## Installation

    npm install nodejsexpresslogger --save

## Usage
```js
var logger = require('nodejsexpresslogger');

logger.info("title","description"); //for log the event type info
logger.err("error name ","error description ");//for log the event type error

Note : we can pass sencond argument as object also 

logger.err("error name ",{"type":"error","message"::"invalid credentials"});//for log the event type error

```    

## License

MIT