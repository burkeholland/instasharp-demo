define [
    'jquery',
    'kendo',
    'text!mylibs/users/views/users-template.html'
    'text!mylibs/users/views/user-details.html'
    'text!mylibs/users/views/users.html'
], ($, kendo, usersTemplate, detailTemplate, template) ->

    view = null
    userid = null
    detailTemplate = kendo.template detailTemplate
    el = null

    user = {
        get: () -> 
            $.get "api/users/#{userid}", (data) ->
                # clear the container
                el.empty()
                el.append(detailTemplate(data.data))
                
                viewModel.get("data.recent").read()
    }

    viewModel = kendo.observable({
        data: 
            recent: new kendo.data.DataSource {
                transport:
                    read:
                        url: =>
                            "api/users/#{userid}/recent"
                    parameterMap: ->
                        count: 40
                schema:
                    data: "data"
            }
        user: 
            name: ""
    })

    if $("#users-template").length == 0 then $("body").append usersTemplate
    
    # this gets returned

    init: (url) ->

        if view is null
            view = new kendo.View template, {
                model: viewModel,
                init: ->
                    el = this.element.find "#user"
            }
        else
            return view    

    get: (id) ->
        userid = id
        user.get()

