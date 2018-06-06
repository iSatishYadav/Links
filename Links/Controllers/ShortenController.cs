using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Links.Controllers
{
    [Route("s")]
    [ApiController]
    public class ShortenController : ControllerBase
    {
        //[Route("/s")]
        //[HttpPost("{longUrl}")]
        public IActionResult Post([FromBody] LongUrl longUrl)
        {
            string shortCode = GetShortCodeForUrl(longUrl?.Url);
            var shortenedUrl = Url.Link("RedirectToLink", new { url = longUrl?.Url + shortCode });
            return Created(shortenedUrl, shortenedUrl);
        }

        [NonAction]
        private string GetShortCodeForUrl(string originalUrl)
        {
            //TODO: Generate random n length alphanumeric code
            //TODO: Save it to database.
            return new Random().Next(10000, 99999).ToString();
        }
    }
}