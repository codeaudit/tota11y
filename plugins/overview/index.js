/**
 * A plugin to identify and validate <title> tag
 */

let $ = require("jquery");
let Plugin = require("../base");

let outlineItemTemplate = require("./outline-item.handlebars");
require("./style.less");


class OverviewPlugin extends Plugin {
    getTitle() {
        return "Overview";
    }

    getDescription() {
        return "Error overview";
    }

    analyze() {
    }

}

module.exports = OverviewPlugin;
