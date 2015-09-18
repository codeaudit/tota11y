/**
 * Base class for plugins.
 *
 * This module defines methods to render and mount plugins to the toolbar.
 * Each plugin will define four methods:
 *     getTitle: title to display in the toolbar
 *     getDescription: description to display in the toolbar
 *     run: code to run when the plugin is activated from the toolbar
 *     cleanup: code to run when the plugin is deactivated from the toolbar
 */

let $ = require("jquery");
let InfoPanel = require("./shared/info-panel");
let template = require("../templates/plugin.handlebars");

class Plugin {
    constructor(optionalParameters) {
        this.panel = new InfoPanel(this.getTitle());
        this.$checkbox = null;
	this.optionalParameters = optionalParameters;
	this.errors = this.analyze();
    }

    getTitle() {
        return "New plugin";
    }

    getDescription() {
        return "";
    }

    /**
     * Methods that communicate directly with the info panel
     */

    // Populates the info panel's "Summary" tab
    setSummary($html) {
        return this.panel.setSummary($html);
    }

    // Populates the info panel's "About" tab
    setAbout($html) {
        return this.panel.setAbout($html);
    }

    // Adds an entry to the info panel's "Errors" tab
    addError(title, $description, $el) {
        return this.panel.addError(title, $description, $el);
    }

    /**
     * Renders the plugin view.
     */
    render(clickHandler) {
        let templateData = {
            title: this.getTitle(),
            description: this.getDescription()
        };

        let $plugin = $(template(templateData));
        this.$checkbox = $plugin.find(".tota11y-plugin-checkbox");
        this.$checkbox.click((e) => {
            e.stopPropagation();
            clickHandler(this);
        });

        let error = $plugin.find(".errors");
        if (this.errors.length > 0) {            
            error.addClass("tota11y-plugin-errors-exist");
        } else {
            error.addClass("tota11y-plugin-no-errors");
        }

        return $plugin;
    }

    /**
     * Populate panel with errors. 
     * TODO: add summary
     */
    preparePanelForRender() {
        this.errors.map((error) => {
                // Register an error to the info panel
                this.addError(error.title,
                              $(error.description),
                              $(error.el));
            });
    }

    annotateDOM() {
        return;
    }

    /**
     * Activate the plugin from the UI.
     */
    activate() {
        this.preparePanelForRender();
        this.annotateDOM();
        this.panel.render();
    }

    /**
     * Deactivate the plugin from the UI.
     */
    deactivate() {
        this.cleanup();
        this.panel.destroy();

        // If we toggle the plugin ourselves, the checkbox will already be
        // unchecked. If another plugin becomes active, however, this method
        // will be called and will uncheck the checkbox.
        this.$checkbox.attr("checked", false);
    }

    cleanup() {
    }
}

module.exports = Plugin;
