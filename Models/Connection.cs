using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Telerik.Everlive.Sdk.Core.Model.Base;
using Telerik.Everlive.Sdk.Core.Serialization;

namespace InstaSharp.Samples.MVC.Models {
    [ServerType("Connections")]
    public class Connection : DataItem {
        public string ConnectionId { get; set; }
        public int UserId { get; set; }
    }
}