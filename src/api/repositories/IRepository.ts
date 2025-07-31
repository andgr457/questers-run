export interface IRepository<T> {
  list?(params?: T): T[]
  getById?(id: string): T
  create?(item: T): T
  update?(item: T): T
}