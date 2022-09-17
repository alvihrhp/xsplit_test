# XSplit Test

The purpose of this repository is to accommodate the xsplit test source code

## How to run the web app locally

```sh
# Cloning repository
Clone this repository

# Install frontend Dependencies
yarn

# Copy .env_example key to .env in backend and frontend
cp .env_example .env

# Install backend dependencies
cd backend && npm install

# Migrate database in backend folder
npx prisma migrate dev --name "migrate init"

# Run backend
npm run dev

# Run Front End
yarn start-client
```

## Link Deployment

```sh
https://xsplit-test.herokuapp.com/
```
