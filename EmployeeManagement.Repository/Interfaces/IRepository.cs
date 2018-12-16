using System.Collections.Generic;

namespace EmployeeManagement.Repository.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        void Add(TEntity entity);

        void Update(TEntity entity);

        void Remove(TEntity entity);

        void RemoveRange(IEnumerable<TEntity> entities);

        TEntity Get(int id);

        IEnumerable<TEntity> GetAll();

        int SaveChanges();
    }
}
