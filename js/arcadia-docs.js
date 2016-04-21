window.onload = function() {
  // markdown all docstrings
  var docstrings = document.querySelectorAll(".docstring");
  for(var i=0;i<docstrings.length; i++)
    docstrings[i].innerHTML = markdown.toHTML(docstrings[i].innerHTML);
  
  // make all docstring codes clojure codes
  var docstringCodes = document.querySelectorAll(".docstring code,.arguments li code");
  for(var i=0;i<docstringCodes.length; i++) {
    docstringCodes[i].setAttribute("class", "clojure");
    hljs.highlightBlock(docstringCodes[i]);
  }
  
  // highlight all codes
  hljs.initHighlighting();
  
  // remove hyperlinks from commented code and strings
  var commentedCode = document.querySelectorAll(".hljs-comment,.hljs-string");
  for(var i=0;i<commentedCode.length; i++) {
    var parent = commentedCode[i].parentNode;
    if(parent.tagName == "A") {
      parent.parentNode.insertBefore(commentedCode[i], parent);
      parent.parentNode.removeChild(parent);
    }
  }
}