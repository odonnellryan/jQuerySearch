
(function($) {

    // this is a simple javascript text search.
    // you supply the search term, the selector for the child elements,
    // and and elements you wish you exclude,
    // and it returns a list of the following:
    // {"short": "a truncated piece of text with the term highlighted....",
    // "object": "a reference to the object where the term is found"}

    $.fn.cSearch = function (options) {

        var settings = $.extend({
            searchTerm: null,
            selector: "> ",
            highlightTag: "b",
            shortTextLength: 30,
            highlightTagClass: null,
            excludeEl: null
        }, options);

        if (settings.searchTerm === null) {
            throw "cSearch: Must include a search parameter"
        }

        var wrapInTag = function(text) {
          var regex = new RegExp(settings.searchTerm, 'gi')
            , replacement = $('<'+ settings.highlightTag +'>'+ settings.searchTerm +'</'+ settings.highlightTag +'>')
                  .addClass(settings.highlightTagClass);
            return text.replace(regex, $('<div>').append(replacement.clone()).html());
        };

        var results = [];

        this.each(function(){
            var contents = $(this).find(settings.selector + ":contains('" + settings.searchTerm + "')")
                .not(settings.excludeEl);
            if (contents) {
                var text = contents // gets the text minus the children
                    .clone()    // clone the element
                    .children() // select all the children
                    .remove()   // remove all the children
                    .end()  // again go back to selected element
                    .text();

                // what we want to do here is truncate AROUND our search term.
                // then wrap our search term in the highlight tag
                var textLen = text.length;
                var shortText = "";
                var searchTermLen = settings.searchTerm.length;
                var start = 0, end = 0;
                var index = text.indexOf(settings.searchTerm);
                var bufferLen = (settings.shortTextLength - searchTermLen) / 2;

                if (searchTermLen >= settings.shortTextLength) {
                    results.push({"short": settings.searchTerm, "object": contents});
                }
                // push all the text if the text length is shorter than the search term len + buffer len
                else if (textLen && (textLen <= (settings.shortTextLength + searchTermLen))) {
                    shortText = wrapInTag(text);
                    results.push({"short": shortText, "object": contents});
                }
                // otherwise, determine the appropriate buffer around the search term.
                else if (textLen) {
                    // we have to determine the start and the end slice points for the string.
                    if ((index - bufferLen) >= 0) {
                        start = index - bufferLen;
                    } else {
                        var absVal = Math.abs((index - bufferLen));
                        // this is here so we don't have a negative index
                        start = index - (bufferLen - absVal);
                        // add the padding on the other side of the string
                        bufferLen = bufferLen + absVal;
                    }
                    // if the last index is out of range just use the length of the text.
                    end = (index + searchTermLen + bufferLen) > textLen ? textLen : (index + searchTermLen + bufferLen);
                    shortText = "..." + wrapInTag(text.slice(start, end)) + "...";
                    results.push({"short": shortText, "object": contents});
                }
            }
        });
        return results;
    };

}( jQuery ));