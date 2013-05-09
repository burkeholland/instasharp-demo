define [
    "jquery"
    "kendo"
    "mylibs/common/feed/feed"
    "text!mylibs/self/views/template.html"
], (jquery, kendo, Feed, template) -> 
    
    Timeline = new Feed "api/users/recent"    

    view = new kendo.View template, { model: Timeline.viewModel, init: Timeline.viewModel.ds.read() }