define [
    'jquery'
    'kendo'
    'text!mylibs/feed/views/template.html'
], (jquery, kendo, template) -> 

    maxId = null

    viewModel = kendo.observable
        feed: new kendo.data.DataSource
            transport:
                read: "api/users/feed"
            schema: 
                parse: (data) ->
                    maxId = data.pagination.next_max_id
                    return data
                data: "data"
            requestEnd: () ->
                viewModel.set "loading", false
            state: null,
            like: (e) -> 
                # mark this photo as liked
                @set("state", @get("state") == null : "selected" ? null)

        more: ->
        
            # toggle the loading flag
            viewModel.set "loading", true

            # get a reference to the datasource
            ds = @get "feed"

            # make a call with a plain get and retrieve the next page
            $.get "api/users/feed?next_max_id=#{maxId}", (data) ->
                # loop through the result and add it to the datasource
                $.each data.data, (idx, item) ->
                    ds.add item

                # set the next max id for grabbing more pics
                maxId = data.pagination.next_max_id
    
                # turn of the loading animation
                viewModel.set "loading", false

        loading: true,

        select: (e) ->
            el = $(e.target)
            if el.hasClass('selected') then el.removeClass('selected')
            else el.addClass('selected')

    view = new kendo.View(template, { model: viewModel });
