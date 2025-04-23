# Rain Check Backend

Tech stack: Typescript, PSQL, Fastify; hosted on SupaBase and Render. MVP structuire is given in this file.


Steps to set project up:

create .env files

- `.env.dev`
- `.env.test`
- `.env.prod`

the following must be present in the files:

``` 
// .env.dev / test:
PGUSER=your_user
PGDATABASE=database_name
PGPASSWORD=your_password
PGHOST=localhost
PGPORT=5432
```

```
// .env.prod
DATABASE_URL=https://url-to-hosted-db
```

To run the project:

- npm install
- npm run setup-dbs
- npm run seed
- npm run dev

## File Structure:

```
├ __tests__
│   ├ API Integration Test
├ controllers
│   ├ API endpoints
├ db
│   ├ data
│   ├ seeds
├ models
│   ├ API Queries
├ routes
│   ├ API routes
├ server
|   ├ server connection files
├ types
|   ├ Types and apps 
├ endpoints
```
