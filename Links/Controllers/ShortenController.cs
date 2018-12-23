using Links.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace Links.Controllers
{
    [Route("s")]
    [ApiController]
    //[Authorize("links.add")]
    public class ShortenController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;
        public ShortenController(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        //[Route("/s")]
        //[HttpPost("{longUrl}")]
        //[Authorize("links.add")]
        [Authorize]
        public IActionResult Post([FromBody] LongUrl longUrl)
        {
            //If User.Identity.Name is null, request is from and API Client, read azp claim instead.
            var userName = User.Identity.Name ?? (User.Identity as ClaimsIdentity)?.Claims.FirstOrDefault(x => x.Type == "azp")?.Value;
            string shortCode = ShortUrl.Encode(_dataRepository.SaveLink(longUrl?.Url, userName));
            var shortenedUrl = Url.Link("RedirectToLink", new { url = shortCode });
            return Created(shortenedUrl, shortenedUrl);
        }
    }
}