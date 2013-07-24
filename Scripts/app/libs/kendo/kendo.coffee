# custom kendo build should be added here for production
define [
    "../kendo/2013.2.716/kendo.core.min"
    "../kendo/2013.2.716/kendo.data.min"
    "../kendo/2013.2.716/kendo.binder.min"
    "../kendo/2013.2.716/kendo.router.min"
    "../kendo/2013.2.716/kendo.view.min"
    "../kendo/2013.2.716/kendo.listview.min"
    "../kendo/2013.2.716/kendo.tooltip.min"
    "../kendo/2013.2.716/kendo.fx.min"
], () ->

    # adding in some custom binders
    kendo.data.binders.star = kendo.data.Binder.extend {
        refresh: ->
            value = @bindings["star"].get()

            if value
                $(@.element).addClass "selected"
            else
                $(@.element).removeClass "selected"
    }	

    return kendo
