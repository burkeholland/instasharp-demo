// you included jQuery, but never used it
(function ($) {

    // pub is defined but never used
    var pub = {
        // this is part of an object literal, not an assignment
        init: function(response) {
            // respnse should be response
            console.log(respnse);
        }
    }

    // you're missing a semicolon here
    // also - its jQuery, not jquery
}(jquery))