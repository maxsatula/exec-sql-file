# exec-sql-file

Simple interface to run oracle sql files via dot notation

## Usage

Here is an example of a directory structure with sql files:

```
queries
├── one
│   └── test.sql
└── important_job.sql
```

```js
import { connect, disconnect } from 'with-oracle';
import execSqlFile from 'exec-sql-file';

const { sql } = await execSqlFile({ path: 'queries' });

await connect({
    user: 'admin',
    password: '<very_secure_password>',
    connectionString: 'mydb1',
    configDir: '/home/user/wallet',
    walletLocation: '/home/user/wallet',
    walletPassword: '<very_secure_password>',
});

const { rows } = await sql.one.test;

const { rowsAffected } = await sql.important_job({ someBindVar: 'some value' });

await disconnect();
```
