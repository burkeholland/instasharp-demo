using InstaSharp.Models.Responses;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace InstaSharp.Samples.MVC
{
    public sealed class InstaSharpConfig
    {

        public bool isAuthenticated = false;
        public InstaSharp.InstagramConfig config;
        public InstaSharp.Models.Responses.OAuthResponse oauthResponse;

        static readonly InstaSharpConfig _instance = new InstaSharpConfig();

        public static InstaSharpConfig Instance {
            get {
                string name = "singleton";
                if (HttpContext.Current.Session[name] == null) 
                HttpContext.Current.Session[name] = new InstaSharpConfig(); 
                return (InstaSharpConfig)HttpContext.Current.Session[name]; 
            } 
        }

        public void Set(HttpContext context)
        {
            // check if we are authenticated already and for the auth object
            if (context.Session["InstaSharp.Authenticated"] != null) {
                isAuthenticated = false; // (bool)context.Session["InstaSharp.Authenticated"];

                if (isAuthenticated)
                {
                    oauthResponse = (OAuthResponse)context.Session["InstaSharp.AuthInfo"];

                    // if we are authenticated, then we need to check and see if there is a corresponding
                    // signalr clientid registered in the database
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