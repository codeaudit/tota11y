/**
 * An index of plugins.
 *
 * Exposes an array of plugins
 */

let HeadingsPlugin = require("./headings");
let TitlePlugin = require("./title");
let OverviewPlugin = require("./overview");

module.exports = {
    default: [
	      HeadingsPlugin,
	      TitlePlugin,
              ],
    overview: OverviewPlugin
};
