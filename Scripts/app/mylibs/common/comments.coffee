define [
    "jquery"
    "kendo"
], ($, kendo) ->
    
    return {

        post: (mediaId, comment) ->
            
            # this needs to return a promise
            defrd = new $.Deferred()

            $.post "api/media/#{mediaId}/comment", { text: comment }, (data) ->
                defrd.resolve data

            return defrd

        destroy: (commentId) ->
            
            defrd = new $.Deferred()

            $.post "api/media/#{commentId}/comment/delete", (data) ->
                derfd.resolve data

            return defrd
    }