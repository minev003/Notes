# Notes Project

This is a notes project developed with [Next.js](https://nextjs.org), [Prisma ORM](https://www.prisma.io/) and [Bootstrap](https://getbootstrap.com/).

## Requirements

- MySQL: For a database managed via MySQL Workbench.
- Prisma ORM: For database queries and migrations.
- Bootstrap: For styling and responsive layout.

## Starting the project

### 1. Setting up the database

1. Install MySQL Workbench and create a new MySQL instance.
2. Configure the database connection in the `.env` file with the appropriate credentials:

```
DATABASE_URL="mysql://username:password@localhost:3306/your_database_name"

```

### 2. Prisma Migrations

Run the Prisma migration to create the necessary tables in the database:

``` bash
npx prisma migrate dev
```

### 3. Launch the application

To launch the project locally, use the command:

``` bash
npm run development
```

or, if you are using `yarn`:

``` bash
yarn development
```

The project will be accessible at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `app/`: The main directory of the application, containing the pages and components.
- `pages/api/`: API routes for processing database requests.

## Technologies used

- **Next.js**: For creating a web application response.
- **Prisma ORM**: For working with a database.
- **MySQL**: For storing data.
- **Bootstrap**: For styling the application.
- **TypeScript**: For validating data.

## More information

For more information about Next.js, you can check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn more about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js course.

## Deploying Vercel

The easiest way to deploy your Next.js application is through the Vercel platform.

For more information about deployment, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
