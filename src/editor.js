/**
 * Author - Kaushik Thirthappa (thirthappa.kaushik@gmail.com)
 */

(function ($) {

    'use strict';

    Editor = function (opts) {
        this.$editor = $('#' + opts.id);
        this.editor = document.getElementById(opts.id);
        this.addEditorElements();
        this.bindEvents();
    }

    Editor.prototype.addEditorElements = function () {
        this.createPlaceholder();
        this.createSelektorBlock();
    }

    Editor.prototype.createPlaceholder = function () {
        var placeholderDiv = document.createElement('div');
        this.editor.insertBefore(placeholderDiv, this.editor.firstChild);

        this.placeholder = document.createElement('span');
        this.placeholder.className = 'placeholder';
        this.placeholder.innerHTML = 'Don\'t stand back. Start writing now..'; // should come from .config file in the future
        placeholderDiv.insertBefore(this.placeholder, placeholderDiv.firstChild);
    }

    Editor.prototype.createSelektorBlock = function () {
        this.selektorDiv = document.createElement('div');
        this.selektorDiv.id = 'selektor-block';
        this.selektorDiv.className = 'hide';
        document.body.insertBefore(this.selektorDiv, document.body.nextSibling);

        this.italic = document.createElement('a');
        this.italic.setAttribute('href', '#');
        this.italic.className = 'italic';
        this.italic.innerHTML = 'I'; // should come from .config file in the future
        this.selektorDiv.insertBefore(this.italic, this.selektorDiv.firstChild);

        this.bold = document.createElement('a');
        this.bold.setAttribute('href', '#');
        this.bold.className = 'bold';
        this.bold.innerHTML = 'B'; // should come from .config file in the future
        this.selektorDiv.insertBefore(this.bold, this.selektorDiv.firstChild);
    }

    Editor.prototype.bindEvents = function () {
        // Remove the placeholder
        var _this = this;

        this.editor.addEventListener('keydown', function (event) {
            _this.removePlaceholder();
        })

        this.bold.addEventListener('click', function () {
            _this.bold()
        })

        this.italic.addEventListener('click', function () {
            _this.italic()
        })

        // event.preventDefault();
    };

    Editor.prototype.removePlaceholder = function () {
        this.placeholder.remove();
    };

    Editor.prototype.bold = function () {
        document.execCommand('bold');
    }

    Editor.prototype.italic = function () {
        document.execCommand('italic');
    }

    Editor.prototype.selection = function () {

    }


})(jQuery);