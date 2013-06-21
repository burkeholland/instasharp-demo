(function() {

  define(['jquery', 'kendo', 'text!mylibs/users/views/users-template.html', 'text!mylibs/users/views/user-details.html', 'text!mylibs/users/views/users.html'], function($, kendo, usersTemplate, detailTemplate, template) {
    var el, user, userid, view, viewModel,
      _this = this;
    view = null;
    userid = null;
    detailTemplate = kendo.template(detailTemplate);
    el = null;
    user = {
      get: function() {
        return $.get("api/users/" + userid, function(data) {
          el.empty();
          el.append(detailTemplate(data.data));
          return viewModel.get("data.recent").read();
        });
      }
    };
    viewModel = kendo.observable({
      data: {
        recent: new kendo.data.DataSource({
          transport: {
            read: {
              url: function() {
                return "api/users/" + userid + "/recent";
              }
            },
            parameterMap: function() {
              return {
                count: 40
              };
            }
          },
          schema: {
            data: "data"
          }
        })
      },
      user: {
        name: ""
      }
    });
    if ($("#users-template").length === 0) {
      $("body").append(usersTemplate);
    }
    return {
      init: function(url) {
        if (view === null) {
          return view = new kendo.View(template, {
            model: viewModel,
            init: function() {
              return el = this.element.find("#user");
            }
          });
        } else {
          return view;
        }
      },
      get: function(id) {
        userid = id;
        return user.get();
      }
    };
  });

}).call(this);
