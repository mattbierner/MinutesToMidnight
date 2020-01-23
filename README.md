# Minutes to Midnight

Very small Node/Javascript library with the current time on the [Doomsday clock][] from the [Bulletin of the Atomic Scientists][bulletin].

## Usage

```bash
$ npm install minutes-to-midnight
```

```js
const m2m = require('minutes-to-midnight');

m2m.getSeconds(); // 100 (number)
m2m.getMinutes(); // 1 (number)
m2m.getFractionalMinutes(); // 1.6666666666666667 (number)

m2m.getTimeToMidnight(); // '100 seconds' (string)
m2m..getTime(); // '11:58:20 PM' (string)
```

[Doomsday clock]: http://en.wikipedia.org/wiki/Doomsday_Clock
[bulletin]: http://thebulletin.org