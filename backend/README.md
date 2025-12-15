1. Project Overview

Project Name: Task Management Backend

Description: This is a backend for a task management system that handles task assignments, notifications, activity logging, project management, and reporting.
The backend provides API routes for creating, updating, deleting, and managing tasks and projects, as well as tracking user activities and sending notifications.

2. Modules in the Backend

This project consists of six key modules:

User Module

Project Module

Task Module

Notification Module

Activity Notification Module

Reports & Analytics Module

Each module handles a specific functionality in the task management system. Below is a detailed explanation of each module and its corresponding routes.

3. Detailed Module Explanation
  
1. User Module

Purpose: The User module handles user registration, login, and user-specific operations like resetting passwords.

Routes:

POST /api/v1/users/registerUser: Registers a new user.

POST /api/v1/users/loginUser: Logs in a user by generating a token.

GET /api/v1/users/getUser-UsingToken: Retrieves the user details based on the token provided in the request header.

POST /api/v1/users/forgotPassword-usingEmail: Sends a password reset link to the user’s email.

POST /api/v1/users/resetPassword-usingToken: Resets the user's password using a reset token.

2. Project Module

Purpose: This module handles the creation, update, and deletion of projects, as well as the assignment of members to projects.

Routes:

GET /api/v1/projects/getAllProjects-usingToken: Retrieves all projects the user is part of.

POST /api/v1/projects/addProject: Adds a new project to the system.

PUT /api/v1/projects/updateProject-PID-usingToken: Updates an existing project by its ID.

DEL /api/v1/projects/deleteProject-usingPID-Token: Deletes a project by its ID.

POST /api/v1/projects/addMember: Adds a member to a project.

3. Task Module

Purpose: The Task module is responsible for task creation, assignment, updating, and deletion. It includes features such as comments, checklist items, and time tracking.

Routes:

POST /api/v1/tasks/addTask: Adds a new task.

GET /api/v1/tasks/getSingleTask-usingTID-Token: Retrieves a single task by its ID.

PATCH /api/v1/tasks/updateTask-usingTID-Token: Updates a task by its ID.

POST /api/v1/tasks/addCommentsInTask-usingTID: Adds comments to a task.

POST /api/v1/tasks/addChecklistInTask-usingTID: Adds a checklist to a task.

4. Notification Module

Purpose: The Notification module handles user notifications. It supports sending notifications via different channels (email, push, alert), as well as marking notifications as read.

Routes:

POST /api/v1/notifications/CreateNotification-usingToken: Creates a notification.

GET /api/v1/notifications/GetNotification-usingToken: Retrieves notifications for a user.

PUT /api/v1/notifications/ReadNotification-usingToken: Marks a notification as read.

5. Activity Logging Module

Purpose: The Activity Logging module logs activities such as task creation, updates, and other actions performed by users within the system. It helps in tracking user actions for auditing and transparency.

Routes:

POST /api/v1/activity/logActivity-usingTaskID+token: Logs an activity associated with a specific task.

GET /api/v1/activity/GetActivity-usingToken: Retrieves activities related to the authenticated user.

6. Reports & Analytics Module

Purpose: The Reports & Analytics module provides aggregated data for analyzing task completion, team velocity, and other metrics. This helps in tracking the performance of tasks and teams over time.

Routes:

GET /api/v1/reports/getTime-tracking: Retrieves time tracking data.

GET /api/v1/reports/getRecurring: Retrieves data for recurring tasks.

GET /api/v1/reports/getWorkload: Retrieves task workload data for each user.

GET /api/v1/reports/getBurndown: Retrieves burndown chart data (completed tasks over time).

GET /api/v1/reports/getVelocity: Retrieves team velocity (tasks completed per sprint).

4. Database Models

Task Model:

Represents tasks with details like title, description, status, priority, subtasks, checklist items, comments, etc.

The Task model is linked to User and Project models.

Notification Model:

Stores user notifications with fields such as message, type (email, push, alert), and read/unread status.

User Model:

Represents a user in the system, including user profile and login credentials.

Project Model:

Represents a project, linked to users and tasks.

and auditLog, tokens, workspaces.

5. Authentication & Authorization

The system uses JWT (JSON Web Tokens) for authentication and authorization. The token is required to access protected routes in the backend.

Login: Users log in using their credentials to receive a token.

Token Verification: Routes that require authentication use a middleware to verify the token and ensure the user is authenticated.

6. Testing

You can test the backend using Postman. Below are the steps for testing:

Authentication:

Send a POST request to /api/v1/users/loginUser with valid credentials to get a JWT token.

Use the token to authenticate requests to other routes.

Testing Notification Routes:

Create Notification:

Send a POST request to /api/v1/notifications/CreateNotification-usingToken with the necessary data.

Get Notification:

Send a GET request to /api/v1/notifications/GetNotification-usingToken to retrieve the notifications.

Mark Notification as Read:

Send a PUT request to /api/v1/notifications/ReadNotification-usingToken to mark a notification as read.

Testing Project & Task Routes:

Create projects, assign members, and manage tasks using the project and task routes.

Testing Reports:

Send GET requests to /api/v1/reports/getBurndown, /api/v1/reports/getVelocity, etc., to retrieve various reports.

7. Conclusion

This backend provides a comprehensive Task Management System with the ability to manage projects, tasks, notifications, activities, and generate insightful reports.
The system is built with Express.js and uses MongoDB for data storage. JWT tokens are used for authentication and authorization, ensuring secure access to the API endpoints.
