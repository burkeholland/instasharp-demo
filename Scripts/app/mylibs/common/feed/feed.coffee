define [
    "jquery"
    "kendo"
    "mylibs/common/comments",
    "text!mylibs/common/feed/views/item-template.html"
], (jquery, kendo, comments, feedTemplate) -> 

    class Feed
    
        constructor: (@url) ->
    
            @maxId = null

            # create the viewmodel
            @viewModel = kendo.observable

                items: new kendo.data.DataSource()

                ds: new kendo.data.DataSource
                    transport:
                        read: 
                            url: () =>
                                @url + if @maxId != null then "?next_max_id=#{@maxId}" else ""
                    schema: 
                        parse: (data) =>
                            @maxId = data.pagination.next_max_id
                            # add some boolean fields to control spinners
                            $.each data.data, (idx, item) ->
                                item.has_comments = if item.comments.count > true then true else false
                            data 
                        data: "data"                        

                    change: (e) =>
                        items = @viewModel.get "items"
                        existing = items.view()
                        $.merge existing, e.sender.view()
                        items.data existing 

                    requestEnd: () =>
    
                        @viewModel.set "loading", false

                more: =>
        
                    @viewModel.set "loading", true

                    @viewModel.get("ds").read()

                loading: true

                loaded: (e) ->
                    kendo.fx($(e.target).parent()).fade("in").play()

                like: (e) =>

                    star = $(e.target)
                    spinner = star.prev()
                    likes = star.next()

                    star.hide()
                    spinner.show()
                    
                    id = star.data "id"

                    # get the datasource
                    ds = @viewModel.get "items"

                    # get the specific item to like by its id from the datasource
                    item = ds.get id

                    if star.hasClass('selected') 
                        $.post "api/media/#{id}/like/delete", (data) =>
                            # decrement the like count for this item
                            item.likes.count--
                            likes.html item.likes.count
                            spinner.hide()
                            star.show().removeClass 'selected'
                             
                    else
                        $.post "api/media/#{id}/like", (data) =>
                            item.likes.count++
                            likes.html item.likes.count 
                            spinner.hide()
                            star.show().addClass 'selected'
                    
                    
        
                comment: (e) ->

                    el = $(e.target).prev()
                    id = el.data "id"
                    text = el.val()

                    feed = @get "items"
                    item = feed.get id

                    comments.post(id, text).then((data) ->
                        # the comment was posted. But did it work?
                        item.comments.push { profile_picture: APP.user.profile_picture, username: APP.user.username }
                    )

            # append the template to the dom if it doesn't exist already
            if $("#feed-template").length == 0 then $(document.body).append feedTemplate