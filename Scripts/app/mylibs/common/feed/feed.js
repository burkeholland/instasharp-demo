(function() {

  define(["jquery", "kendo", "text!mylibs/common/feed/views/item-template.html"], function(jquery, kendo, feedTemplate) {
    var Feed;
    return Feed = (function() {

      function Feed(url) {
        var _this = this;
        this.url = url;
        this.maxId = null;
        this.viewModel = kendo.observable({
          items: new kendo.data.DataSource(),
          ds: new kendo.data.DataSource({
            transport: {
              read: {
                url: function() {
                  return _this.url + (_this.maxId !== null ? "?next_max_id=" + _this.maxId : "");
                }
              }
            },
            schema: {
              parse: function(data) {
                _this.maxId = data.pagination.next_max_id;
                $.each(data.data, function(idx, item) {
                  return item.has_comments = item.comments.count > true ? true : false;
                });
                return data;
              },
              data: "data"
            },
            change: function(e) {
              var existing, items;
              items = _this.viewModel.get("items");
              existing = items.view();
              $.merge(existing, e.sender.view());
              return items.data(existing);
            },
            requestEnd: function() {
              return _this.viewModel.set("loading", false);
            }
          }),
          more: function() {
            _this.viewModel.set("loading", true);
            return _this.viewModel.get("ds").read();
          },
          loading: true,
          loaded: function(e) {
            return kendo.fx($(e.target).parent()).fade("in").play();
          },
          like: function(e) {
            var ds, id, item, likes, spinner, star;
            star = $(e.target);
            spinner = star.prev();
            likes = star.next();
            star.hide();
            spinner.show();
            id = star.data("id");
            ds = _this.viewModel.get("items");
            item = ds.get(id);
            if (star.hasClass('selected')) {
              return $.post("api/media/" + id + "/like/delete", function(data) {
                item.likes.count--;
                likes.html(item.likes.count);
                spinner.hide();
                return star.show().removeClass('selected');
              });
            } else {
              return $.post("api/media/" + id + "/like", function(data) {
                item.likes.count++;
                likes.html(item.likes.count);
                spinner.hide();
                return star.show().addClass('selected');
              });
            }
          },
          comment: function(e) {
            var el, feed, id, item, text,
              _this = this;
            el = $(e.target).closest("input");
            id = el.data("id");
            text = el.val();
            feed = this.get("ds");
            item = feed.get(id);
            item.comments.add;
            return $.post("api/media/" + id + "/comment", function(data) {});
          }
        });
        if ($("#feed-template").length === 0) {
          $(document.body).append(feedTemplate);
        }
      }

      return Feed;

    })();
  });

}).call(this);
