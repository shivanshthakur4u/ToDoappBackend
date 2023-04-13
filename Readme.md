##Routes Endpoints

## Auth Routes 👇

### `POST  /signup`

#### Description
This endpoint is used to register new users 

### Response
-Status Code : 200 ok if User registered successfully, 400 Inavlid Credentials if User is already Registered or not given all required values, 500 Something went wrong if there is any problem while registering user.
-Body: JWT token with user registered sucessfully message


### `POST  /signin`

#### Description
This endpoint is used to signin users 

### Response
-Status Code : 200 ok if User Signin successfully, 422 Inavlid Credentials if User provide invalid details, 400 All fields are required if doesn't provide any required details, 500 Something went wrong if there is any problem in server .
-Body: JWT token with user  signin sucessfully message




## API Endpoints:

### `GET /api/task`

#### Description
This endpoint is used to get all the tasks created by the authorized user.

#### Headers
Authorization: Bearer {JWT token}

#### Response
- Status Code: 200 OK if successful, 401 Unauthorized if the JWT token is missing or invalid, or 500 Internal Server Error if there is a server-side error.
- Body: An array of tasks created by the authorized user.

### `POST /api/task`

#### Description
This endpoint is used to create a new task for the authorized user.

#### Headers
Authorization: Bearer {JWT token}

#### Body
- name: string (required) - name of the task
- priority: string (required) - priority of the task

#### Response
- Status Code: 201 Created if successful, 400 Bad Request if the name or priority is missing, or 500 Internal Server Error if there is a server-side error.
- Body: The newly created task.

### `PATCH /api/task/:id/completed`

#### Description
This endpoint is used to mark a task as completed by its id for the authorized user.

#### Headers
Authorization: Bearer {JWT token}

#### Params
- id: string (required) - id of the task

#### Response
- Status Code: 200 OK if successful, 400 Bad Request if the id is missing or invalid, 404 Not Found if the task is not found, or 500 Internal Server Error if there is a server-side error.
- Body: An array of tasks created by the authorized user.

### `PATCH /api/task/:id/cancel`

#### Description
This endpoint is used to mark a task as cancelled by its id for the authorized user.

#### Headers
Authorization: Bearer {JWT token}

#### Params
- id: string (required) - id of the task

#### Response
- Status Code: 200 OK if successful, 400 Bad Request if the id is missing or invalid, 404 Not Found if the task is not found, or 500 Internal Server Error if there is a server-side error.
- Body: An array of tasks created by the authorized user.

### `DELETE /api/task/:id/delete`

#### Description
This endpoint is used to mark a task as deleted by its id for the authorized user.

#### Headers
Authorization: Bearer {JWT token}

#### Params
- id: string (required) - id of the task

#### Response
- Status Code: 200 OK if successful, 400 Bad Request if the id is missing or invalid, 404 Not Found if the task is not found, or 500 Internal Server Error if there is a server-side error.
- Body: An array of tasks created by the authorized user, with the deleted task removed from the array.
