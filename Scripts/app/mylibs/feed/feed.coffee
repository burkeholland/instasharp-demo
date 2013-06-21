define [
    "jquery"
    "kendo"
    "mylibs/common/feed/feed"
    "text!mylibs/feed/views/template.html"
], (jquery, kendo, Feed, template) -> 

        view = null;

        {
            init: (url) ->
                if view is null
                    Timeline = new Feed url 
                    view = new kendo.View template, { 
                        model: Timeline.viewModel
                        init: Timeline.viewModel.ds.read()
                    }
                else
                    return view
        }