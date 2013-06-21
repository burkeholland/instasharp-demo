using AttributeRouting.Web.Mvc;
using InstaSharp.Models;
using InstaSharp.Samples.MVC.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Telerik.Everlive.Sdk.Core;
using Telerik.Everlive.Sdk.Core.Query.Definition.Filtering;

namespace InstaSharp.Samples.MVC.Controllers
{
    public class RealtimeController : Controller
    {
        InstaSharp.Endpoints.Subscription _subscription;
        EverliveApp _app;

        public RealtimeController() {
            _subscription = new Endpoints.Subscription(InstaSharpConfig.Instance.config);

            string token = ConfigurationManager.AppSettings.Get("everlive_id");
            _app = new EverliveApp(token);
        }

        [GET("realtime")]
        public ContentResult Index() {

            // get the verify token off the request if it exsits
            string token = Request.Params["hub.challenge"] != null ? Request.Params["hub.challenge"] : "";
            
            // this is a challenge.  challenge accepted.
            return new ContentResult { Content = token };
        }

        [POST("realtime")]
        public void Receive() {

            var form = Request.Form;

            Request.InputStream.Position = 0;
            System.IO.StreamReader str = new System.IO.StreamReader(Request.InputStream);
            string sBuf = str.ReadToEnd();

            // deserialize this from json
            var serializer = new JavaScriptSerializer();

            var updates = serializer.Deserialize<IEnumerable<Realtime>>(sBuf);

            var login = _app.WorkWith().Authentication().Login("client", "instasharp").ExecuteSync(500);

            //string typeName = "Connections";
            //var userIdsArray = updates.Select(b => b.UserId);
            //string inExpression = string.Format("{{ 'UserId' : {{ '$in' : {0} }} }}", JsonConvert.SerializeObject(userIdsArray));
            //var customFilter = JObject.Parse(inExpression);
            //var connections = _app.WorkWith().Data<Models.Connection>(typeName).Get().SetFilter(new CustomFilteringDefinition(customFilter)).ExecuteSync();
 
            //foreach(var connection in connections)
            //{
            //        // do something interesting
            //}

        }
    }
}
