"use strict"
const request = require('request')
const extend = require('extend')
const cheerio = require('cheerio')

const midnight = new Date(2000, 0, 0, 0, 0, 0, 0)

const toTime = mins =>
    new Date(midnight.getTime() + mins * -60000)

const pad = (min, input) => {
    const out = input + ''
    while (out.length < min)
        out = '0' + out
    return out
}

const dateToString = (d) =>
    pad(2, d.getHours() - 12) + ':' + pad(2, d.getMinutes()) + ' PM'

/**
 * Default configuration.
 */
const DEFAULTS = {
    /**
     * Where to get page with m2m data from.
     * 
     * Doesn't seem to be a good public api for this
     */
    source: "http://thebulletin.org/timeline",

    /**
     * Selector for dom element.
     */
    selector: '.view-content .node-title',

    /**
     * RegEx to extract minutes to midnight.
     */
    title: /(\d+) minutes to midnight/i
}

/**
 * Minutes to midnight.
 */
const M2M = function (conf) {
    this.conf = extend(DEFAULTS, (conf || {}))
}

/**
 * Request the current minutes to midnight feed.
 * 
 * Also contains a bunch of unrelated other posts.
 */
M2M.prototype._request = function () {
    const conf = this.conf
    return new Promise((resolve, reject) =>
        request(conf.source, function (error, response, body) {
            if (error)
                return reject(err);
            if (response.statusCode !== 200)
                return reject("Unexpected status code")
            return resolve(body)
        }))
}

/**
 * Given a feedparser result, extract the number of minutes to midnight.
 * 
 * Uses a best guess based on post title.
 */
M2M.prototype._extract = function (data) {
    const conf = this.conf;
    return new Promise((resolve, reject) => {
        const $ = cheerio.load(data)
        const nodes = $(conf.selector).map(function () { return $(this).text() }).get()
        for (const node of nodes) {
            const result = node.match(conf.title)
            if (result)
                return resolve(parseInt(result[1]))
        }
        reject("No result found")
    })
}

/**
 * Get the current number of minutes to midnight as an integer.
 */
M2M.prototype.get = function () {
    return this._request()
        .then(this._extract.bind(this))
}

/**
 * Get the current time as a string on the doomsday clock.
 * 
 * Formatted as: 11:XX PM
 */
M2M.prototype.getTime = function () {
    return this.get()
        .then(x => dateToString(toTime(x)))
}

module.exports = M2M