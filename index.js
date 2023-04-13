// @ts-check
"use strict";

module.exports = {
    /**
     * @return Second to midnight as a number.
     */
    getSeconds() {
        return 90;
    },

    /**
     * @return Minutes to midnight as a whole number.
     */
    getMinutes() {
        return Math.floor(this.getSeconds() / 60);
    },

    /**
     * @return Minutes to midnight as a fractional number.
     */
    getFractionalMinutes() {
        return this.getSeconds() / 60;
    },

    /**
     * @return Time to midnight as a display string.
     */
    getTimeToMidnight() {
        return '90 seconds';
    },

    /**
     * @return Current time as a display string;
     */
    getTime() {
        return '11:58:30 PM';
    },
};
