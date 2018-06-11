using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Links.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Links.Controllers
{
    [Route("s")]
    [ApiController]
    [Authorize]
    public class ShortenController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;
        public ShortenController(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        //[Route("/s")]
        //[HttpPost("{longUrl}")]
        public IActionResult Post([FromBody] LongUrl longUrl)
        {
            //string shortCode = GetShortCodeForUrl(longUrl?.Url);
            string shortCode = ShortUrl.Encode(_dataRepository.SaveLink(longUrl?.Url, User?.Identity?.Name));            
            var shortenedUrl = Url.Link("RedirectToLink", new { url = shortCode });
            return Created(shortenedUrl, shortenedUrl);
        }
    }
}