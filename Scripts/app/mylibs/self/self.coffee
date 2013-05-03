define [
    'jquery'
    'kendo'
    'text!mylibs/self/views/template.html'
    'text!mylibs/self/views/item-template.html'
], ($, kendo, template, itemTemplate) -> 

    maxId = null

    selfTemplate = kendo.template(itemTemplate)

    self = new kendo.data.DataSource
        transport:
            read: "api/users/recent"
        schema: 
            parse: (data) ->
                maxId = data.pagination.next_max_id
                return data
            data: "data"
        requestEnd: () ->
            viewModel.set "loading", false
        change: (e) ->
            $.each e.items, (idx, item) ->
                $("#self").append selfTemplate item

    viewModel = kendo.observable
        more: ->
        
            # toggle the loading flag
            viewModel.set "loading", true

            # get a reference to the datasource
            ds = @get "feed"

            # make a call with a plain get and retrieve the next page
            $.get "api/users/recent?next_max_id=#{maxId}", (data) ->
                # loop through the result and add it to the datasource
                $.each data.data, (idx, item) ->
                    self.add item

                # set the next max id for grabbing more pics
                maxId = data.pagination.next_max_id
    
                # turn of the loading animation
                viewModel.set "loading", false

        loading: true,

        select: (e) ->
            el = $(e.target)
            if el.hasClass('selected') then el.removeClass('selected')
            else el.addClass('selected')

    view = new kendo.View template, { 
        model: viewModel
        init: ->
            self.read()
    }
