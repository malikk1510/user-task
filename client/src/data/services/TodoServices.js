import { api, getAuthHeaders, get, post, update, del } from "./CommonServices";

//creating task
export const createTodoItemAPI = async (todoItem) => {
  let url = `${api}/api/auth/createTask`;
  let authHeader = getAuthHeaders();
  return await post(url, todoItem, authHeader)
};

//reading tasks
export const getTodoItemAPI = async () => {
  let url = `${api}/api/auth/taskByuserId`;
  let authHeader = getAuthHeaders();
  return await get(url, authHeader)
};

//updating task
export const updateTodoItemAPI = async (todoItem, id) => {
  let url = `${api}/api/auth/updateTask/${id}`;
  let authHeader = getAuthHeaders();
  return await update(url, todoItem, authHeader)
};

//marking task
export const markTodoItemAPI = async (todoItem, id) => {
  let url = `${api}/api/auth/markTask/${id}`;
  let authHeader = getAuthHeaders();
  return await update(url, todoItem, authHeader)
};

//deleting task
export const deleteTodoItemAPI = async (id) => {
  let url = `${api}/api/auth/deleteTask/${id}`;
  let authHeader = getAuthHeaders();
  return await del(url, authHeader)
}


