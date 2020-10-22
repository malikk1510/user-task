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
- `{domain_name}/updateUser`
<br/>&nbsp; To update user's profile
- `{domain_name}/deleteUser`
<br/>&nbsp; To delete the user account
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
<br/>&nbsp; To create tasks


![](https://img.shields.io/badge/status-pending-blueviolet)
- `{domain_name}/markTask/:id`
<br/>&nbsp; To mark tasks as completed

## Note
- Only authenticated user's can perform CRUD operations on their own tasks.
