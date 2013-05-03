(function() {

  define(['jquery', 'kendo', 'text!mylibs/feed/views/template.html', 'text!mylibs/feed/views/item-template.html'], function(jquery, kendo, template, itemTemplate) {
    var feed, feedTemplate, maxId, view, viewModel;
    maxId = null;
    feedTemplate = kendo.template(itemTemplate);
    feed = new kendo.data.DataSource({
      transport: {
        read: "api/users/feed"
      },
      schema: {
        parse: function(data) {
          maxId = data.pagination.next_max_id;
          return data;
        },
        data: "data"
      },
      change: function(e) {
        return $.each(e.items, function(idx, item) {
          return $("#feed").append(feedTemplate(item));
        });
      },
      requestEnd: function() {
        return viewModel.set("loading", false);
      }
    });
    viewModel = kendo.observable({
      more: function() {
        viewModel.set("loading", true);
        return $.get("api/users/feed?next_max_id=" + maxId, function(data) {
          $.each(data.data, function(idx, item) {
            return feed.add(item);
          });
          maxId = data.pagination.next_max_id;
          return viewModel.set("loading", false);
        });
      },
      loading: true,
      select: function(e) {
        var el, id;
        el = $(e.target);
        id = el.data("id");
        if (el.hasClass('selected')) {
          return $["delete"]("api/media/" + id + "/like", function(data) {
            return el.removeClass('selected');
          });
        } else {
          return $.post("api/media/" + id + "/like", function(data) {
            return el.addClass('selected');
          });
        }
      }
    });
    return view = new kendo.View(template, {
      model: viewModel,
      init: function() {
        return feed.read();
      }
    });
  });

}).call(this);
