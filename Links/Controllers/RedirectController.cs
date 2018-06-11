using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Links.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Wangkanai.Detection;

namespace Links.Controllers
{
    [Route("r")]
    [ApiController]
    [AllowAnonymous]
    public class RedirectController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IDetection _detection;
        public RedirectController(IDataRepository dataRepository, IHttpContextAccessor httpContextAccessor, IDetection detection)
        {
            _dataRepository = dataRepository;
            _httpContextAccessor = httpContextAccessor;
            _detection = detection;
        }

        [Route("{url}", Name = "RedirectToLink")]
        public IActionResult Get(string url)
        {
            int id = ShortUrl.Decode(url);
            string originalUrl = _dataRepository.GetLink(id);
            if (string.IsNullOrEmpty(originalUrl))
                return NotFound();
            else
            {
                //TODO: Log stats before redirecting                     
                string ipAddress = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
                ipAddress = ipAddress == "::1" ? _httpContextAccessor.HttpContext.Connection.LocalIpAddress.ToString() : ipAddress;
                string userAgent = _httpContextAccessor.HttpContext.Request.Headers["User-Agent"];
                //TODO: Get IP address, user agent, browser, OS etc.
                string browser = $"{_detection.Browser?.Maker?.ToString()} {_detection.Browser?.Name?.ToString()} {_detection.Browser?.Version?.ToString()}";
                string os = $"{_detection.Platform?.Type.ToString()} {_detection.Platform?.Version?.ToString()}";
                string device = _detection.Device?.Type.ToString();
                _dataRepository.UpdateAccessStats(id, ipAddress, DateTime.UtcNow, userAgent, browser, os, device);
                originalUrl = !originalUrl.ToUpper().StartsWith("HTTP") ? $"http://{originalUrl}" : originalUrl;
                return Redirect(originalUrl);
            }
        }
    }
}