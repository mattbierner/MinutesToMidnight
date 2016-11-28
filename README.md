# Minutes to Midnight

Small Node/Javascript library to get the current time on the [Doomsday clock][] from the [Bulletin of the Atomic Scientists][bulletin].

## Usage

```bash
$ npm install minutes-to-midnight
```

```js
var M2M = require('minutes-to-midnight');
```

APIs return promises.

```js
// Get number of minutes to midnight
new M2M().get()
    .then(console.log) 
    .catch(console.error);
// 3 
```

```js
// Get current time on the Doomsday Clock.
new M2M().getTime()
    .then(console.log)
    .catch(console.error);
// 11:57 PM
```

[Doomsday clock]: http://en.wikipedia.org/wiki/Doomsday_Clock
[bulletin]: http://thebulletin.org