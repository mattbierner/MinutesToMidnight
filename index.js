/*
 * THIS FILE IS AUTO GENERATED FROM 'index.kep'
 * DO NOT EDIT
*/
"use strict";
var FeedParser = require("feedparser"),
    request = require("request"),
    extend = require("extend"),
    Promise = require("bluebird"),
    M2M, DEFAULTS = ({
        source: "http://thebulletin.org/search-feed/feature-type/multimedia",
        title: /it is (\d+) minutes to midnight/i
    }),
    theFp = (function(resolve, reject) {
        return new(FeedParser)()
            .on("error", reject)
            .on("readable", (function() {
                var stream = this;
                return resolve(stream);
            }));
    });
(M2M = (function(conf) {
    var self = this;
    (self.conf = extend(DEFAULTS, (conf || ({}))));
}));
(M2M.prototype._request = (function() {
    var __o = this,
        conf = __o["conf"];
    return new(Promise)((function(resolve, reject) {
        return request(conf.source)
            .on("error", reject)
            .on("response", (function(res) {
                var stream = this;
                return ((res.statusCode === 200) ? stream.pipe(new(FeedParser)()
                    .on("error", reject)
                    .on("readable", (function() {
                        var stream0 = this;
                        return resolve(stream0);
                    }))) : reject("Unexpected status code"));
            }));
    }));
}));
(M2M.prototype._extract = (function(data) {
    var __o = this,
        conf = __o["conf"];
    return new(Promise)((function(resolve, reject) {
        var item = data.read();
        while (item) {
            var result = item.title.match(conf.title);
            if (result) return resolve(parseInt(result[1]));
            else {
                (item = data.read());
            }
        }
        reject("No result found");
    }));
}));
(M2M.prototype.get = (function() {
    var self = this;
    return self._request()
        .then(self._extract.bind(self));
}));
var midnight = new(Date)(2000, 0, 0, 0, 0, 0, 0),
    toTime = (function(mins) {
        return new(Date)((midnight.getTime() + (mins * -60000)));
    }),
    pad = (function(min, input) {
        var out = (input + "");
        while ((out.length < min)) {
            (out = ("0" + out));
        }
        return out;
    }),
    dateToString = (function(d) {
        return (((pad(2, (d.getHours() - 12)) + ":") + pad(2, d.getMinutes())) + " PM");
    });
(M2M.prototype.getTime = (function() {
    var self = this;
    return self.get()
        .then((function(z) {
            var d = new(Date)((midnight.getTime() + (z * -60000)));
            return (((pad(2, (d.getHours() - 12)) + ":") + pad(2, d.getMinutes())) + " PM");
        }));
}));
(module.exports = M2M);