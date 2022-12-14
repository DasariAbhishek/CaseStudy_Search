using backend.Models;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public interface IRole
    {
        public Task<ActionResult<IEnumerable<Role>>> GetAllRoles();
    }
}
