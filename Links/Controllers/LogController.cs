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
        private readonly IDataRepository _dataRepository;
        public LogController(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var logs = _dataRepository.GetLogsByLinkId(id, User?.Identity?.Name ?? "satishkyadav@bharatpetroleum.in");

            return Ok(logs.Select(
                x => new
                {
                    x.Browser,
                    x.Device,
                    x.IpAddress,
                    x.Os,
                    x.Timestamp,
                    x.UserAgent
                }));
        }
    }
}