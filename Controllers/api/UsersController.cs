using AttributeRouting.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InstaSharp.Samples.MVC.Controllers.api
{
    public class UsersController : Controller
    {
        readonly InstaSharp.Endpoints.Users _users;

        public UsersController()
        {
            _users = new Endpoints.Users(InstaSharpConfig.config, InstaSharpConfig.auth);
        }

        [GET("api/users/feed")]
        public ContentResult Feed(string next_max_id) {

            var feed = next_max_id == null ? _users.Feed() : _users.Feed(next_max_id);

            return new ContentResult { Content = feed.Json, ContentType = "application/json" };

        }
        [GET("api/users/recent")]
        public ContentResult Recent(string next_max_id) {

            var recent = next_max_id == null ? _users.Recent() : _users.Recent(next_max_id);

            return new ContentResult { Content = recent.Json, ContentType = "application/json" };
        }

    }
}
