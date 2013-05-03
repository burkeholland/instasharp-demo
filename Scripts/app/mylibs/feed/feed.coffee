define [
    'jquery'
    'kendo'
    'text!mylibs/feed/views/template.html'
    'text!mylibs/feed/views/item-template.html'
], (jquery, kendo, template, itemTemplate) -> 

    maxId = null

    feedTemplate = kendo.template(itemTemplate);

    feed = new kendo.data.DataSource
        transport:
            read: "api/users/feed"
        schema: 
            parse: (data) ->
                maxId = data.pagination.next_max_id
                data
            data: "data"
        change: (e) ->
            $.each e.items, (idx, item) ->
                $("#feed").append feedTemplate item
                
        requestEnd: () ->
    
            viewModel.set "loading", false

    viewModel = kendo.observable

        more: ->
        
            # toggle the loading flag
            viewModel.set "loading", true

            # make a call with a plain get and retrieve the next page
            $.get "api/users/feed?next_max_id=#{maxId}", (data) ->
                # loop through the result and add it to the datasource
                $.each data.data, (idx, item) ->
                    feed.add item

                # set the next max id for grabbing more pics
                maxId = data.pagination.next_max_id
    
                # turn of the loading animation
                viewModel.set "loading", false

        loading: true,

        select: (e) ->
            
            el = $(e.target)
            id = el.data "id"
            
            if el.hasClass('selected') 
                $.delete "api/media/#{id}/like", (data) ->
                    el.removeClass('selected')
            else
                $.post "api/media/#{id}/like", (data) ->
                    el.addClass('selected')

    view = new kendo.View template, { 
        model: viewModel,
        init: ->
            feed.read()
    }
