using Links.Data;
using Links.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Links.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LinksController : ControllerBase
    {
        private readonly LinksContext _context;

        public LinksController(LinksContext context)
        {
            _context = context;
        }

        // GET: api/Links
        [HttpGet]
        public IActionResult Get()
        {
            //Get links created by users as well as applications assigned to them as well.            
            var links = _context.Link
                .Where(x => x.CreatedBy == User.Identity.Name || _context.ApplicationUsers.Where(a => a.UserName.Equals(User.Identity.Name)).Select(u => u.ApplicationId.ToString()).Contains(x.CreatedBy))
                .OrderByDescending(x => x.Id)
                .Take(100)
                .Select(x => new
                {
                    OriginalLink = x.OriginalLink,
                    Id = x.Id,
                    Stats = Stats.FromJson(x.Stats)
                }).ToList();

            return Ok(links.Select(
                x => new
                {
                    Id = x.Id,
                    OriginalLink = x.OriginalLink,
                    ShortLink = Url.Link("RedirectToLink", new { url = ShortUrl.Encode(x.Id) }),
                    Clicks = x.Stats?.Clicks
                }
                ));
        }
    }
}