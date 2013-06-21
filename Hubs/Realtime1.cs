using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InstaSharp.Samples.MVC.Hubs {
    public class Realtime1 {

        //public static Realtime1 Instance {
        //    get {
        //        return _instance.Value;
        //    }
        //}

        //private IHubConnectionContext Clients { get; set; }

        //// Singleton instance
        //private readonly static Lazy<Realtime1> _instance = new Lazy<Realtime1>(() => new Realtime1(GlobalHost.ConnectionManager.GetHubContext<RealtimeHub>().Clients));

        //private Realtime1(IHubConnectionContext clients) {
        //    Clients = clients;
        //}

        //private bool NotifyClient(string clientId, string Message) {
        //    Clients.Client(clientId).newItems(message);
        //}
    }
}