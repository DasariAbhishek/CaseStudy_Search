using backend.Models;
using backend.Repositories;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Data
{
    public class RoleDataService : IRole
    {
        private readonly CGDbContext _context;
        public RoleDataService(CGDbContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<IEnumerable<Role>>> GetAllRoles()
        {
            var Users = await _context.Role.ToListAsync();
            return Users;
        }
    }
}
