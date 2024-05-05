import { execute, executeMany } from 'with-oracle';
import loader from 'filetree-contents';

export default async function ({ path }) {
    const { files } = await loader({
        path,
        defaultExtension: '.sql',
    });

    const WithOracleSource = query =>
        new Proxy(
            async (...args) => (Array.isArray(args[0]) ? executeMany : execute)(await query, ...args),
            {
                get: (obj, prop) => (prop === 'then' ? (o => o.then.bind(o))(obj()) : WithOracleSource(query[prop])),
            },
        );

    return { sql: WithOracleSource(files) };
}
