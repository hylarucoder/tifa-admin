module.exports = {
    schema: [
        {
            'http://localhost:8888/api/admin/graphql': {
                headers: {
                    Authorization: 'Bearer ' + process.env.AUTH_TOKEN,
                },
            },
        },
    ],
    overwrite: true,
    documents: [
      './src/**/*.tsx',
      './src/**/*.ts',
      './src/**/*.gql',
    ],
    generates: {
        './src/graphql/schema.tsx': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                skipTypename: false,
                withHooks: true,
                withHOC: false,
                withComponent: false,
            },
        }
    },
};
