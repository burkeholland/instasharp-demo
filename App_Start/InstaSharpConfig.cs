using InstaSharp.Models.Responses;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace InstaSharp.Samples.MVC
{
    public static class InstaSharpConfig
    {

        public static bool isAuthenticated = false;
        public static InstaSharp.InstagramConfig config;
        public static InstaSharp.Models.Responses.OAuthResponse oauthResponse;

        public static void Set(HttpContext context)
        {
            // check if we are authenticated already and for the auth object
            if (context.Session["InstaSharp.Authenticated"] != null) {
                isAuthenticated = (bool)context.Session["InstaSharp.Authenticated"];

                if (isAuthenticated)
                {
                    oauthResponse = (OAuthResponse)context.Session["InstaSharp.AuthInfo"];
                }
            }

            // check the session for a config object
            if (context.Session["InstaSharp.Config"] == null)
            {
                // if we are not authenticated, create a config object
                var clientId = ConfigurationManager.AppSettings.Get("client_id");
                var clientSecret = ConfigurationManager.AppSettings.Get("client_secret");
                var redirectUri = ConfigurationManager.AppSettings.Get("redirect_uri");
                var realtimeUri = "";

                config = new InstaSharp.InstagramConfig(clientId, clientSecret, redirectUri, realtimeUri);

                context.Session.Add("InstaSharp.Config", config);
            }
            else {
                // just get it off the session and store it in the config variable
                config = (InstagramConfig)context.Session["InstaSharp.Config"];
            }
        }
    }
}