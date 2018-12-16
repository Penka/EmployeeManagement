using EmployeeManagement.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EmployeeManagement.Repository
{
    public class Repository<TEntity> : IDisposable, IRepository<TEntity> where TEntity : class
    {
        protected readonly EmployeeManagementDbContext _context;
        protected readonly DbSet<TEntity> _entities;

        public Repository(EmployeeManagementDbContext context)
        {
            _context = context;
            _entities = context.Set<TEntity>();
        }

        public virtual void Add(TEntity entity) => _entities.Add(entity);
               
        public virtual void Update(TEntity entity) => _entities.Update(entity);
               
        public virtual void Remove(TEntity entity) => _entities.Remove(entity);
               
        public virtual void RemoveRange(IEnumerable<TEntity> entities) => _entities.RemoveRange(entities);
               
        public virtual TEntity Get(int id) => _entities.Find(id);
               
        public virtual IEnumerable<TEntity> GetAll() => _entities.ToList();
               
        public virtual int SaveChanges() => _context.SaveChanges();
               
        public virtual void Dispose() => _context.Dispose();
    }
}
