# List of Endpoints
## Summary
---
### User
#### Authentication
![](https://img.shields.io/badge/status-completed-brightgreen)
- `{domain_name}/signup`
<br/>&nbsp; To signup new user
- `{domain_name}/signin`
<br/>&nbsp; To login existing user

---
#### Tasks
![](https://img.shields.io/badge/status-completed-brightgreen)
- `{domain_name}/createTask`
<br/>&nbsp; To create tasks
- `{domain_name}/updateTask/:id`
<br/>&nbsp; To update tasks
- `{domain_name}/deleteTask/:id`
<br/>&nbsp; To delete tasks
- `{domain_name}/taskByUserId/:id`
<br/>&nbsp; To read all tasks by user id
- `{domain_name}/markTask/:id`
<br/>&nbsp; To mark tasks as completed/incompleted

## Note
- Only authenticated user's can perform CRUD operations on their own tasks.
