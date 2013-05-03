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

        public MediaController()
        {
            _media = new InstaSharp.Endpoints.Media(InstaSharpConfig.config, InstaSharpConfig.oauthResponse);
            _likes = new Endpoints.Likes(InstaSharpConfig.config, InstaSharpConfig.oauthResponse);
        }

        //[POST("api/media/{id}/like")]
        //public ContentResult Like (string id) {

        //    //var like = _likes.Post(id);

        //    //return new ContentResult { Content = like, ContentType = "application/json" };
            
        //}

        //[DELETE("api/media/{id}/like")]
        //public ContentResult Delete (string id) {

        //    //var result = _likes.Delete(id);

        //    //return new ContentResult { Content = result.Json, ContentType = "application/json" };
        //}
    }
}
