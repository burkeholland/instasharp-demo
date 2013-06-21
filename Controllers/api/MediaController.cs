using AttributeRouting.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InstaSharp.Samples.MVC.Controllers.api
{
    public class MediaController : Controller
    {
        readonly InstaSharp.Endpoints.Media _media;
        readonly InstaSharp.Endpoints.Likes _likes;
        readonly InstaSharp.Endpoints.Comments _comments;

        public MediaController()
        {
            var instance = InstaSharpConfig.Instance;

            _media = new InstaSharp.Endpoints.Media(instance.config, instance.oauthResponse);
            _likes = new Endpoints.Likes(instance.config, instance.oauthResponse);
            _comments = new Endpoints.Comments(instance.config, instance.oauthResponse);
        }

        [GET("api/media/{id}")]
        public ContentResult Get(string id) {

            var media = _media.Get(id);

            return new ContentResult { Content = media.Content, ContentType = "application/json" };
        }

        [POST("api/media/{id}/like")]
        public ContentResult Like(string id) {

            var like = _likes.Post(id);

            return new ContentResult { Content = like.Content, ContentType = "application/json" };

        }

        [POST("api/media/{id}/like/delete")]
        public ContentResult DeleteLike(string id) {

            var result = _likes.Delete(id);

            return new ContentResult { Content = result.Content, ContentType = "application/json" };
        }

        [POST("api/media/{id}/comment")]
        public ContentResult Comment(string id) {

            string text = Request.Params["text"] != null ? Request.Params["text"] : "";

            var result = _comments.Post(id, text);

            return new ContentResult { Content = result.Content, ContentType = "application/json" };
        }
    }
}
