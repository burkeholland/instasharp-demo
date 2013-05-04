(function() {

  define(['jquery', 'kendo', 'text!mylibs/feed/views/template.html', 'text!mylibs/feed/views/item-template.html'], function(jquery, kendo, template, itemTemplate) {
    var maxId, view, viewModel;
    maxId = null;
    $(document.body).append(itemTemplate);
    viewModel = kendo.observable({
      feed: new kendo.data.DataSource({
        transport: {
          read: "api/users/feed"
        },
        schema: {
          parse: function(data) {
            maxId = data.pagination.next_max_id;
            return data;
          },
          data: "data",
          model: {
            id: "id"
          }
        },
        requestEnd: function() {
          return viewModel.set("loading", false);
        }
      }),
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
      liking: false,
      select: function(e) {
        var el, feed, id, item,
          _this = this;
        this.set("liking", true);
        el = $(e.target);
        id = el.data("id");
        feed = this.get("feed");
        item = feed.get(id);
        if (el.hasClass('selected')) {
          return $.post("api/media/" + id + "/like/delete", function(data) {
            item.likes.count = item.likes.count - 1;
            el.removeClass('selected');
            return _this.set("liking", false);
          });
        } else {
          return $.post("api/media/" + id + "/like", function(data) {
            item.likes.count = item.likes.count + 1;
            el.addClass('selected');
            return _this.set("liking", false);
          });
        }
      }
    });
    return view = new kendo.View(template, {
      model: viewModel
    });
  });

}).call(this);
