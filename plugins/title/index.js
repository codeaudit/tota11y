/**
 * A plugin to identify and validate <title> tag
 */

let $ = require("jquery");
let Plugin = require("../base");

let outlineItemTemplate = require("./outline-item.handlebars");
require("./style.less");

const ERRORS = {
    MULTIPLE_TITLES(titles) {
        let _tag = (tag_var) => `<code>${tag_var}</code>`;
        let description = `
        <div>This document contains multiple <code>&lt;title&gt;</code> tags `

        titles.each((i, title) => {
                description += _tag($(title).text());
                if (i < titles.length - 1) {
                    description += ', ';
                }
            })
        description += `</div>`;
        return {title: "Multiple &lt;title&gt; tags provided",
                description: description}
    }
};

class TitlePlugin extends Plugin {
    getTitle() {
        return "Title";
    }

    getDescription() {
        return "Title Violations";
    }

    analyze() {
        let $titles = $("title");
        let errors = [];
        let error;
        if ($titles.length > 1) {
            error = ERRORS.MULTIPLE_TITLES($titles);    // eslint-disable-line new-cap
        }

        if (error) {
            // Register an error to the info panel
            errors = [{title: error.title,
                       description: $(error.description),
                       el: $titles[0]
                }]
                }
        return errors;
    }

}

module.exports = TitlePlugin;
