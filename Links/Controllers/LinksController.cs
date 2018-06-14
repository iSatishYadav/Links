using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Links;
using Links.Models;
using Links.Data;
using Microsoft.AspNetCore.Authorization;

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
            var links = _context.Link                
                .Where(x => x.CreatedBy == User.Identity.Name)
                .OrderByDescending(x => x.Id)
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