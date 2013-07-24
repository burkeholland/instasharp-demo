(function() {

  define(["../kendo/2013.2.716/kendo.core.min", "../kendo/2013.2.716/kendo.data.min", "../kendo/2013.2.716/kendo.binder.min", "../kendo/2013.2.716/kendo.router.min", "../kendo/2013.2.716/kendo.view.min", "../kendo/2013.2.716/kendo.listview.min", "../kendo/2013.2.716/kendo.tooltip.min", "../kendo/2013.2.716/kendo.fx.min"], function() {
    kendo.data.binders.star = kendo.data.Binder.extend({
      refresh: function() {
        var value;
        value = this.bindings["star"].get();
        if (value) {
          return $(this.element).addClass("selected");
        } else {
          return $(this.element).removeClass("selected");
        }
      }
    });
    return kendo;
  });

}).call(this);
