# CoffeeScript
define [
    'jquery'
    'kendo'
    'text!mylibs/layout/views/template.html'
], ($   , kendo, template) ->

    # create a new layout
    layout = new kendo.Layout(template)
    
