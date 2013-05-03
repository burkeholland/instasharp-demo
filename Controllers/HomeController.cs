using AttributeRouting.Web.Mvc;
using InstaSharp.Models;
using RestSharp;
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
        [GET("/")]
        public ActionResult Index()
        {
            // if we're authenticated, return the user object with the original request
            if (InstaSharpConfig.isAuthenticated) {
                return View(InstaSharpConfig.oauthResponse.User);
            } else {

                

                return View("Login");
            }
             
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
