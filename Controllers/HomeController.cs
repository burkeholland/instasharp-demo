using AttributeRouting.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InstaSharp.Samples.MVC.Controllers
{
    public class HomeController : Controller
    {
        private InstaSharp.Endpoints.Users _users;

        [GET("/")]
        public ActionResult Index()
        {
            InstaSharp.Models.Responses.UserResponse user = null;

            // add the authenticated flag to the View 
            ViewBag.Authenticated = InstaSharpConfig.isAuthenticated;

            // create the auth url
            var scopes = new List<InstaSharp.Auth.Scope>();
            scopes.Add(Auth.Scope.Basic);

            ViewBag.AuthLink = InstaSharp.Auth.AuthLink(InstaSharpConfig.config.OAuthURI + "/authorize", InstaSharpConfig.config.ClientId, 
                InstaSharpConfig.config.RedirectURI, scopes, Auth.ResponseType.Code);

            // if we're authenticated, return the user object with the original request
            if (InstaSharpConfig.isAuthenticated) {
                _users = new Endpoints.Users(InstaSharpConfig.config, InstaSharpConfig.auth);
                user = _users.Get();
            }

            return View(user);
        }

        [GET("/clear")]
        public ActionResult Clear()
        {
            Session["InstaSharp.Authenticated"] = null;
            Session["InstaSharp.InstagramConfig"] = null;
            Session["InstaSharp.AuthInfo"] = null;

            return this.Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}
