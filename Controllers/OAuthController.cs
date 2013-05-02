using AttributeRouting.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InstaSharp.Samples.MVC.Controllers
{
    public class OAuthController : Controller
    {
        //
        // GET: /OAuth/

        [GET("oauth")]
        public ActionResult Index(string code)
        {
            // add this code to the auth object
            var auth = new InstaSharp.Auth(InstaSharpConfig.config);
            
            // now we have to call back to instagram and include the code they gave us
            // along with our client secret
            var authInfo = auth.RequestToken(code);

            // tell the session that we are authenticated
            InstaSharpConfig.isAuthenticated = true;

            // both the client secret and the token are considered sensitive data, so we won't be
            // sending them back to the browser. we'll only store them temporarily.  If a user's session times
            // out, they will have to click on the authenticate button again - sorry bout yer luck.
            InstaSharpConfig.auth = authInfo;
            Session.Add("InstaSharp.AuthInfo", authInfo);

            // all done, lets redirect to the home controller which will send some intial data to the app
            return RedirectToAction("Index", "Home");
        }

    }
}
