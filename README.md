# Minutes to Midnight

Very small Node/Javascript library with the current time on the [Doomsday clock][] from the [Bulletin of the Atomic Scientists][bulletin].

## Usage

```bash
$ npm install minutes-to-midnight
```

```js
const m2m = require('minutes-to-midnight');

m2m.getSeconds(); // 90 (number)
m2m.getMinutes(); // 1 (number)
m2m.getFractionalMinutes(); // 1.5 (number)

m2m.getTimeToMidnight(); // '90 seconds' (string)
m2m.getTime(); // '11:58:30 PM' (string)
```

[Doomsday clock]: http://en.wikipedia.org/wiki/Doomsday_Clock
[bulletin]: http://thebulletin.org
