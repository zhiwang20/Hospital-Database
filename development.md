# TODO

- Modify `hs.sql` in **startup** folder to 3nf.

## Instructions

- Clone Repo and run npm install in the root folder
- Will Need `.env` file in root folder can create by using `vim .env` or `touch .env` in linux/unix systems, Recommend opening folder in VScode and then creating files much easier
- `.env` file should have two lines with following

```config
PRIVATE_KEY=path_to_root_folder/config/keys/test-key
PUBLIC_KEY=path_to_root_folder/config/keys/test-key.pem
```

### Run SQL file

- run sql file `hs.sql` in **startup** folder *(Same as running the twizzle sql)*

### Running Server
- Run `node index.js` to run Server @ Port 8080
- You can user `POSTMAN` or any other tool to make API calls, even `curl`
- Make API `POST` call to `api/v1/users` to create user with following format in json

```json
{
    "email": "youremail@domain.com",
    "password": "yourownpassword"
}
```
- Make API `POST` call to `auth/login` to receive JWT (JSONWebToken) using same email and password [*read up on it if you want to,but not necessary*]

- Rest of the API calls are in `routes` file with subroutes in their own api folders under `api`

### Calling Other API Routes
- All other routes beside creating user are protected by authentication
- You will need a token in header called Bearer token to make calls
- To get token first make a post call to `/auth/login` with same email and password. This will return token, copy that then
- In postman you can select Bearer Token under Authorization tab below the URL input field and paste the token in the input field next to token.
- Now you should be able to make requests.