define [
    'jquery'
    'kendo'
    'text!mylibs/feed/views/template.html'
    'text!mylibs/feed/views/item-template.html'
], (jquery, kendo, template, itemTemplate) -> 

    maxId = null

    # append the feed template to the DOM
    $(document.body).append itemTemplate

    viewModel = kendo.observable

        feed: new kendo.data.DataSource
            transport:
                read: "api/users/feed"
            schema: 
                parse: (data) ->
                    maxId = data.pagination.next_max_id
                    data
                data: "data",
                model: 
                    id: "id"

            requestEnd: () ->
    
                viewModel.set "loading", false

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

        loading: true
        liking: false

        select: (e) ->
            
            # show the spinner
            @set "liking", true

            el = $(e.target)
            id = el.data "id"

            # get the datasource
            feed = @get "feed"
            item = feed.get id

            if el.hasClass('selected') 
                $.post "api/media/#{id}/like/delete", (data) =>
                    # decrement the like count for this item
                    item.likes.count = item.likes.count - 1
                    el.removeClass('selected')
                    @set "liking", false
            else
                $.post "api/media/#{id}/like", (data) =>
                    # increment the likdes count
                    item.likes.count = item.likes.count + 1
                    el.addClass('selected')
                    @set "liking", false

    view = new kendo.View template, { model: viewModel }
