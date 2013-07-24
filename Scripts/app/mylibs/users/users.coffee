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
    userEl = null

    state = 
        loading: (isLoading, denied) ->
            kendo.ui.progress $("body"), isLoading
            viewModel.set "loading", isLoading
            if denied != undefined
                viewModel.set "denied", denied

    user = {
        get: () -> 
            
            state.loading true
            
            $.get "api/users/#{userid}", (data) ->
                if data.meta.code == 400
                    state.loading false, true
                else
                    # clear the container
                    userEl.empty()
                    userEl.append(detailTemplate(data.data))
                
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
                change: ->
                    state.loading false, false
                schema:
                    data: "data"
            }
        loading: true
        denied: false
        user: ->
            if @get("loading") == false and not @get("denied") == true then true else false
        error: ->
            if @get("loading") == false and @get("denied") == true then true else false
    })

    if $("#users-template").length == 0 then $("body").append usersTemplate
    
    # this gets returned

    init: (url) ->

        if view is null
            view = new kendo.View template, {
                model: viewModel,
                init: ->
                    el = this.element
                    userEl = this.element.find "#user"
            }
        else
            return view    

    get: (id) ->
        userid = id
        user.get()

