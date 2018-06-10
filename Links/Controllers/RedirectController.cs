using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Links.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Links.Controllers
{
    [Route("r")]
    [ApiController]
    [AllowAnonymous]
    public class RedirectController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;
        public RedirectController(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [Route("{url}", Name = "RedirectToLink")]
        public IActionResult Get(string url)
        {
            //string originalUrl = GetOriginalUrlFromShortenedUrl(url);
            string originalUrl = _dataRepository.GetOriginalLinkByShortCode(url);
            if (string.IsNullOrEmpty(originalUrl))
                return NotFound();
            else
            {
                //TODO: Log stats before redirecting                
                return Redirect(originalUrl);
            }
        }
    }
}