# SERN Stack Project

This project utilizes the following libraries (MySQL, Express.js, React.js, Node.js) to create a full-stack web application.

## Installation

### Frontend

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend server:
   ```
   npm start
   ```

Note: If the backend URL port is changed, make sure to replace it in the frontend codebase where necessary.

### Backend

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create database:
   ```
   DB name: hotel
   ```

  import the sql file in database hotel(1).sql 


4. Start the backend server:
   ```
   npm run server
   ```

### Configuration

Before running the backend server, make sure to set up the `.env` file in the `backend` directory with the following configuration:

```
DATABASE_URL="mysql://root:@localhost:3306/hotel"
PORT="5001"
```

---

5. you can sample login on regular user with
  user name:
```
 927621bcs046@mkce.ac.in
```

pass:
```
123
```
6. you can sample login on hotel user with
 user name:
```
Jegan
```

pass:
```
123
```
7. you can see on the sql file for more details in that hotel login table for hotel owners login and customers login table for regular user login and it contains list of users login list
   



