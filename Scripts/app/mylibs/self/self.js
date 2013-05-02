(function() {

  define(['jquery', 'kendo', 'text!mylibs/self/views/template.html'], function($, kendo, template) {
    var maxId, view, viewModel;
    maxId = null;
    viewModel = kendo.observable({
      self: new kendo.data.DataSource({
        transport: {
          read: "api/users/recent"
        },
        schema: {
          parse: function(data) {
            maxId = data.pagination.next_max_id;
            return data;
          },
          data: "data"
        },
        requestEnd: function() {
          return viewModel.set("loading", false);
        },
        like: function(e) {
          return this.set("state", this.get("state") === {
            "null": "selected" != null ? "selected" : null
          });
        }
      }),
      more: function() {
        var ds;
        viewModel.set("loading", true);
        ds = this.get("feed");
        return $.get("api/users/feed?next_max_id=" + maxId, function(data) {
          $.each(data.data, function(idx, item) {
            return ds.add(item);
          });
          maxId = data.pagination.next_max_id;
          return viewModel.set("loading", false);
        });
      },
      loading: true,
      select: function(e) {
        var el;
        el = $(e.target);
        if (el.hasClass('selected')) {
          return el.removeClass('selected');
        } else {
          return el.addClass('selected');
        }
      }
    });
    return view = new kendo.View(template, {
      model: viewModel
    });
  });

}).call(this);
