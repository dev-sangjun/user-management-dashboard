# User Management Dashboard
- A dashboard app to manage patients' data
## About the Project
- This project supports the following features:
	1. Sign up & sign in using jwt
  2. Add custom fields for patient entry on initial load (if not setup yet)
  3. Add patient entry with the following fields:
    - firstName
    - middleName
    - lastName
    - birthDate
    - status
    - address
    - other (defined by custom fields)
  4. Supports search by field key & value matching
  5. Admin users can view patient details by clicking on the data row, which opens up a User Data Entry modal

- Some improvements that can be made in the future:
	1. Add pagination/filter to reduce the amount of transferred data as this app scales
  2. Support multiple data types in MongoDB models; this app currently saves all values as string for simplicity
  3. Support searches for entries that contain the keyword; this app currently filters by exact matches of the queries
  4. Data validation (emails, password length, etc.)
  5. Sign out feature
  6. Better UX (more user-friendly messages for any errors and server responses)

## Built With
### Tech Stack
- React
- Redux
- Tailwind CSS
- TypeScript
- Express
- MongoDB
- Mongoose

### Languages
-	TypeScript
### 

## Setup
- Download the repo
- Run "npm i" in /client and /server directories to download npm packages
- Run "npm run dev" in the root directory, which will trigger "npm run dev" in /client and /server directories

## Getting Started
1. Sign up your account with your email & password
![Screenshot 2023-08-23 at 4 14 25 PM](https://github.com/dev-sangjun/user-management-dashboard/assets/33212292/f65e2da7-954a-4483-ace9-4c9c731a73bf)
2. Upon signing in, click the plus button and define your custom fields (field name & data type) for patients' data entries. Click on Add when complete.
![Screenshot 2023-08-23 at 4 14 39 PM](https://github.com/dev-sangjun/user-management-dashboard/assets/33212292/90543b41-a9c8-4a64-9784-97fc07d97047)
![Screenshot 2023-08-23 at 4 15 07 PM](https://github.com/dev-sangjun/user-management-dashboard/assets/33212292/f8a69965-109c-4172-be42-7d8787aa3247)
3. After adding custom fields, click on Add at the top right corner of the table. Fill out the form and click on Confirm.
![Screenshot 2023-08-23 at 4 16 28 PM](https://github.com/dev-sangjun/user-management-dashboard/assets/33212292/2bf66d21-8c02-4734-976d-3e5ea1816270)
4. After confirming, you'll see a new patient data row created. Click on it and you'll see a modal with their data.
![Screenshot 2023-08-23 at 4 16 37 PM](https://github.com/dev-sangjun/user-management-dashboard/assets/33212292/33985c94-5ac5-4437-905b-cfe70d3f9d42)
5. Search for the entry by selecting the field name and fill out the field value. Click on Search.
![Screenshot 2023-08-23 at 4 16 46 PM](https://github.com/dev-sangjun/user-management-dashboard/assets/33212292/5d41d144-1de6-4ce3-ad01-5647196a4044)
![Screenshot 2023-08-23 at 4 16 58 PM](https://github.com/dev-sangjun/user-management-dashboard/assets/33212292/89ebde4a-6e96-447c-b1cc-770ecf5828cf)
6. Searching with an empty value will return all the entries.
![Screenshot 2023-08-23 at 4 17 02 PM](https://github.com/dev-sangjun/user-management-dashboard/assets/33212292/2986fa9d-c06e-4d4d-aec3-a44847266fbd)

