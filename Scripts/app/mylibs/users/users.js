(function() {

  define(['jquery', 'kendo', 'text!mylibs/users/views/users-template.html', 'text!mylibs/users/views/user-details.html', 'text!mylibs/users/views/users.html'], function($, kendo, usersTemplate, detailTemplate, template) {
    var el, state, user, userEl, userid, view, viewModel,
      _this = this;
    view = null;
    userid = null;
    detailTemplate = kendo.template(detailTemplate);
    el = null;
    userEl = null;
    state = {
      loading: function(isLoading, denied) {
        kendo.ui.progress($("body"), isLoading);
        viewModel.set("loading", isLoading);
        if (denied !== void 0) {
          return viewModel.set("denied", denied);
        }
      }
    };
    user = {
      get: function() {
        state.loading(true);
        return $.get("api/users/" + userid, function(data) {
          if (data.meta.code === 400) {
            return state.loading(false, true);
          } else {
            userEl.empty();
            userEl.append(detailTemplate(data.data));
            return viewModel.get("data.recent").read();
          }
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
          change: function() {
            return state.loading(false, false);
          },
          schema: {
            data: "data"
          }
        })
      },
      loading: true,
      denied: false,
      user: function() {
        if (this.get("loading") === false && !this.get("denied") === true) {
          return true;
        } else {
          return false;
        }
      },
      error: function() {
        if (this.get("loading") === false && this.get("denied") === true) {
          return true;
        } else {
          return false;
        }
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
              el = this.element;
              return userEl = this.element.find("#user");
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
