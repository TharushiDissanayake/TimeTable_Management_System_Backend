# Application Framework Assignment 1 

Develop a RESTful API using either Express JS (Node.js) for a University Timetable Management System

## Setup Instructions

Clone the repository
  
Install necessary packages with npm

```bash
  npm install 
```

set up environmental varable
- PORT=5001
- MONGODB_URI=<your_mongodb_uri>

- The server listens for incoming requests on port 5001
- Register or log in to the system as a Student, Faculty or an Admin
- Failure to authenticate with JWT will restrict access to server operations
- Please note that different user roles have different levels of access authorization
- To gain full access, please log in as an admin

### To run the prject

```bash
  npm run dev 
```
## Running Tests

To run tests, run the following command

```bash
  npm test
```

##  API endpoints

### Authentication

#### Register user

```http
  POST /api/users/register
```


| Parameter | Parameter Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `string` | `Register users to the system` |


##### JSON Payload
```json
{
  "userName": "user name",
  "email": "user email",
  "password": "user password",
  "mobileNo": "user mobile number",
  "role": "role"
}
```

#### Login user

```http
  POST /api/users/login
```

| Parameter | Parameter Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `string` | `log in users to the system` |

##### JSON Payload
```json
{
  "userName": "user name",
  "password": "user password"
}
```


#### Current user

```http
  POST /api/users/current
```

| Parameter | Parameter Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `string` | `Get information about the current user` |

##### JSON Payload
```json
{
  "userName": "User name",
  "password": "password"
}
```

### Course Management

#### create Course

```http
  POST /api/api/courses/
```

| Parameter | Parameter Type | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `string` | `Create a new course. Role - admin ` |

##### Headers
```header
Authorization : Bearer <Generated Token>
```
##### JSON Payload
```json
{
  "facultyUserName": "Faculty name",
  "name": "Course name",
  "code": "Course code",
  "description": "Course description",
  "credits": credits //(type : Number)
}
```

#### Update Course

```http
  PUT /api/courses/
```

| Parameter | Parameter Type | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `string` | `Update courses. Role - admin ` |

##### Headers
```header
Authorization : Bearer <Generated Token>
```
##### JSON Payload
```json
{
  "facultyUserName": "Faculty name",
  "name": "Course name",
  "code": "Course code",
  "description": "Course description",
  "credits": credits //(type : Number)
}
```

#### Get Course

```http
  GET /api/courses/:id
```

| Parameter | Parameter Type | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string -course code` | `Get course by id. Role - any` |

##### Headers
```header
Authorization : Bearer <Generated Token>
```
##### JSON Payload
```json
no payload
```

#### Delete Course

```http
  DELETE /api/courses/:id
```

| Parameter | Parameter Type | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string -course code` | `Delete course by id. Role - Admin` |

##### Headers
```header
Authorization : Bearer <Generated Token>
```
##### JSON Payload
```json
no payload
```

### Update course
Update a course (Role Admin).
```http
  PUT /api/courses/:id
```

### Get all cources
Retrieve all courses
```http
  GET /api/courses
```

### Class Session Management

#### Create class session

```http
  POST /api/class_session
```

| Parameter | Parameter Type | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `string` | `Create new class session. Role - admin ` |

##### Headers
```header
Authorization : Bearer <Generated Token>
```
##### JSON Payload
```json
{
  "batch": "Batch name",
  "courseName": "cource name",
  "day": "Day",
  "startTime": "start time",
  "endTime": "end time",
  "facultyName": "Faculty name",
  "location": "Location"
}
```

#### Get class

```http
  GET /api/class_session/:id
```

| Parameter | Parameter Type | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string - objectId` | `Get class session by id. Role - any ` |

##### Headers
```header
Authorization : Bearer <Generated Token>
```
##### JSON Payload
```json
no payload
```

#### Get class

```http
  GET /api/class_session/
```

| Parameter | Parameter Type | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `string - objectId` | `Get all class session Role - any ` |

##### Headers
```header
Authorization : Bearer <Generated Token>
```
##### JSON Payload
```json
no payload
```


#### Delete class

```http
  DELETE /api/class_session/:id
```

| Parameter | Parameter Type | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string - objectId` | `Delete class session. Role - Admin ` |

##### Headers
```header
Authorization : Bearer <Generated Token>
```
##### JSON Payload
```json
no payload
```

### Check availability

```http
  POST /api/class_session/check_availability
```

| Parameter | Parameter Type | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `string` | `Check availability of resources for a class session. Role - admin ` |

##### Headers
```header
Authorization : Bearer <Generated Token>
```
##### JSON Payload
```json
{
  "batch": "Batch name",
  "courseName": "cource name",
  "day": "Day",
  "startTime": "start time",
  "endTime": "end time",
  "facultyName": "Faculty name",
  "location": "Location"
}
```
### Update class sessions
Update a class session (admin only).
```http
  PUT /api/class_session/:id
```

### Book resources 
Book resources for a class session.
```http
  POST /api/class_session/slot
```

### Resource managment

### Create Resource
```http
  POST /api/api/resource
```

| Parameter | Parameter Type | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `string` | `Create a new resource. Role - admin ` |

##### Headers
```header
Authorization : Bearer <Generated Token>
```
##### JSON Payload
```json
{
  "resourceCode": "G302",
  "resourceType": "Lab"
}

```


### Faculty managment

### Create Faculty
```http
  POST /api/api/faculty
```

| Parameter | Parameter Type | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `string` | `Create classes. Role - admin ` |

##### Headers
```header
Authorization : Bearer <Generated Token>
```
##### JSON Payload
```json
{
  "facultyName": "Computing"
}
```

#### Get faculty

```http
  GET /api/faculty/
```

| Parameter | Parameter Type | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `string - objectId` | `Retrieve courses associated with a faculty member ` |

##### Headers
```header
Authorization : Bearer <Generated Token>
```
##### JSON Payload
```json
no payload
```

## Tech Stack & libraries


**Server:** Node, Express

**Authentication:** JSON Web Token (JWT)

**Password encryption:** bcrypt

**Logging:** Winston

**Testing:** Jest
