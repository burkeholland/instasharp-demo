define [
    "jquery"
    "kendo"
    "mylibs/common/feed/feed"
    "text!mylibs/feed/views/template.html"
], (jquery, kendo, Feed, template) -> 
    
    Timeline = new Feed "api/users/feed"    

    view = new kendo.View template, { 
        model: Timeline.viewModel
        init: Timeline.viewModel.ds.read()
    }