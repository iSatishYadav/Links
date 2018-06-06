using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Links.Controllers
{
    [Route("r")]
    [ApiController]
    public class RedirectController : ControllerBase
    {
        [Route("{url}", Name = "RedirectToLink")]
        public IActionResult Get(string url)
        {
            string originalUrl = GetOriginalUrlFromShortenedUrl(url);
            if (string.IsNullOrEmpty(originalUrl))
                return NotFound();
            else
                return Redirect(originalUrl);
        }

        private string GetOriginalUrlFromShortenedUrl(string url)
        {
            //TODO: Get original URL
            return $"https://google.co.in?q={url}";
        }
    }
}