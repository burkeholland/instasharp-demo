using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Telerik.Everlive.Sdk.Core;
using System.Configuration;
using Telerik.Everlive.Sdk.Core.Model.System;
using InstaSharp.Samples.MVC.Models;
using Telerik.Everlive.Sdk.Core.Transport;

namespace InstaSharp.Samples.MVC.Hubs {
    public class RealtimeHub : Hub
    {
        // connection callback
        private EverliveApp _app;

        public RealtimeHub()
        {
            string token = ConfigurationManager.AppSettings.Get("everlive_id");
            _app = new EverliveApp(token);
        }

        public override Task OnConnected() {

            //_app.Authentication().Login("client", "instasharp", a => {
            //    var newConnection = new Connection { ConnectionId = this.Context.ConnectionId, UserId = InstaSharpConfig.oauthResponse.User.Id };
            //    _app.Items("Connections").CreateNewAsync(newConnection);
            //});

            return base.OnConnected();
        }

        public override Task OnDisconnected() {

            //_app.Authentication().Login("client", "instasharp", a => {
            //    var connectionToDelete = _app.Items<Connection>("Connections").Get().Where(c => c.ConnectionId == this.Context.ConnectionId).SingleOrDefault();
            //    _app.Items("Connections").DeleteByIdAsync(connectionToDelete.Id);
            //});
            
            return base.OnDisconnected();
        }
    }
}