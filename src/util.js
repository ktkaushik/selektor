
(function Global () {
    Util = {

        // recursive function to find the text node among parents
        findTextNodeAmongParents: function () {
            if (node.nodeType !== 3) {
                node = node.parentNode;
                findTextNodeAmongParents(node);
            }

            return node;
        },

        // Get the offset of the selected text
        getSelectionCoords: function () {

            var range, rects, rect;

            var x = 0, y = 0;

            if (window.getSelection) {

                var selection = window.getSelection();

                if (selection.rangeCount) {
                    range = selection.getRangeAt(0).cloneRange();
                    if (range.getClientRects) {
                        range.collapse(true);
                        rects = range.getClientRects();
                        if (rects.length > 0) {
                            rect = rects[0];
                        } else {
                            return false; // if in case there is an empty selection
                        }
                        x = rect.left;
                        y = rect.top + document.body.scrollTop;
                    }

                    // Fall back to inserting a temporary element
                    if (x == 0 && y == 0) {
                        var span = document.createElement("span");
                        if (span.getClientRects) {
                            // Ensure span has dimensions and position by
                            // adding a zero-width space character
                            span.appendChild(document.createTextNode("\u200b"));
                            range.insertNode(span);
                            rect = span.getClientRects()[0];
                            x = rect.left;
                            y = rect.top;
                            var spanParent = span.parentNode;
                            spanParent.removeChild(span);

                            // Glue any broken text nodes back together
                            spanParent.normalize();
                        }
                    }
                }

            }
            return { left: x, top: y };
        },

        // find the offset the POJS way
        findPos: function (obj) {
            var curleft = curtop = 0;
            // display none elements would have offsetParent as null
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
            }
            return { left: curleft, top: curtop };
        },

        // get the node in which the cursor lies
        getSelectionStart: function () {
           var node = document.getSelection().anchorNode;
           if (!node) return false;
           return (node.nodeType == 3 ? node.parentNode : node);
        }

    }    
})();