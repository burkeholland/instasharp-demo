define [
    'jQuery',
    'kendo',
    'text!mylibs/details/views/details-template.html'
], ($, kendo, template) ->

    view = null
    useresApi = ""
    mediaApi = ""

    user = 
        get: (id) ->
            $.get "#{mediaApi}/#{id}", (data) ->
        media: (id) ->
            $.get "#{usersApi}/#{id}", (data) ->

    viewModel = kendo.observable {
        src: ""

    init: (usersApi, mediaApi) ->
        
        api = url

        if view is null
            view = new kendo.View template, {
                model: viewModel
            }
        else
            return view    

