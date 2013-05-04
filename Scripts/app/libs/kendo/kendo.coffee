# custom kendo build should be added here for production
define [
    "../kendo/2013.1.319/kendo.core.min"
    "../kendo/2013.1.319/kendo.binder.min"
    "../kendo/2013.1.319/kendo.data.min"
    "../kendo/2013.1.319/kendo.router.min"
    "../kendo/2013.1.319/kendo.view.min"
    "../kendo/2013.1.319/kendo.listview.min"
], (core, binder, data, router, view, listview) ->
    return kendo
