#jQuery Search

A full text search written in jQuery. Searches the elements 
for matching words (or partial words) and returns the results.

Doesn't do anything fancy like use heuristics, correct spelling, or anything else.

Just a word search with some added features to make it useful. 

# Use

It is a jQuery plugin, so use it similar to other plugins:

var results = $("p").cSearch({
  searchTerm: searchTerm,
  shortTextLength: 50
}));

This returns a list of results in the form of:

{
  "short": "...truncated piece of text with the term <b>highlighted</b>...",
  "object": "a reference to the object where the term is found"
}

You can then show, hide, copy, etc.. the original object as you please. 

# Settings

{
  searchTerm: null, // term to search for
  selector: "> ", // set what child elements to select on
  highlightTag: "b", // what tag to use for highlighting the search terms
  shortTextLength: 30, // how long you'd like the short text length to be
  highlightTagClass: null, // if you'd like a class added to the highlight tag specified above
  excludeEl: null // if you'd like to exclude any elements
}