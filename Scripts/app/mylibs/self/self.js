(function() {

  define(['jquery', 'kendo', 'text!mylibs/self/views/template.html', 'text!mylibs/self/views/item-template.html'], function($, kendo, template, itemTemplate) {
    var maxId, self, selfTemplate, view, viewModel;
    maxId = null;
    selfTemplate = kendo.template(itemTemplate);
    self = new kendo.data.DataSource({
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
      change: function(e) {
        return $.each(e.items, function(idx, item) {
          return $("#self").append(selfTemplate(item));
        });
      }
    });
    viewModel = kendo.observable({
      more: function() {
        var ds;
        viewModel.set("loading", true);
        ds = this.get("feed");
        return $.get("api/users/recent?next_max_id=" + maxId, function(data) {
          $.each(data.data, function(idx, item) {
            return self.add(item);
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
      model: viewModel,
      init: function() {
        return self.read();
      }
    });
  });

}).call(this);
