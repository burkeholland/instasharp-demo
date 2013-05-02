using AttributeRouting.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InstaSharp.Samples.MVC.Controllers.api
{
    public class MediaController : BaseController
    {
        readonly InstaSharp.Endpoints.Media _endpoint;

        public MediaController()
        {
            _endpoint = new InstaSharp.Endpoints.Media(InstaSharpConfig.config, InstaSharpConfig.auth);
        }

        [GET("api/media/popular")]
        public JsonResult Popular()
        {
            return this.Json(_endpoint.Popular(), JsonRequestBehavior.AllowGet);
        }

    }
}
