
export interface IRepository<LIST_PARAMS, GET_INTERFACE, CREATE_INTERFACE, UPDATE_INTERFACE> {
  getById(id: string): Promise<GET_INTERFACE>
  list(params?: LIST_PARAMS): Promise<GET_INTERFACE[]>
  create(object: CREATE_INTERFACE): Promise<GET_INTERFACE>
  update(object: UPDATE_INTERFACE): Promise<GET_INTERFACE>
  delete(id: string): Promise<void>
}