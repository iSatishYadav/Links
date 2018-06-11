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
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LogController : ControllerBase
    {
        private readonly LinksContext _context;
        public LogController(LinksContext context)
        {
            _context = context;
        }

        //public IActionResult Get(int id)
        //{
        //    var links = _context.Iz 
        //        .Where(x => x.CreatedBy == User.Identity.Name)
        //        .OrderByDescending(x => x.Id)
        //        .Select(x => new
        //        {
        //            OriginalLink = x.OriginalLink,
        //            Id = x.Id,
        //            Stats = Stats.FromJson(x.Stats)
        //        }).ToList();

        //    return Ok(links.Select(
        //        x => new
        //        {
        //            OriginalLink = x.OriginalLink,
        //            ShortLink = Url.Link("RedirectToLink", new { url = ShortUrl.Encode(x.Id) }),
        //            Clicks = x.Stats?.Clicks
        //        }
        //        ));
        //}
    }
}