const endPointURL = 'http://localhost:9000/graphql'

export async function loadJobs() {
    const query = `
        {
            jobs {
                id,
                title,
                company {
                    id,
                    name
                }
            }
        }`
    const { jobs } = await graphqlRequest(query)
    return jobs;
}

export async function loadJob(id) {
    const query = `
        query JobQuery($id: ID!){
            job(id: $id) {
                id
                title,
                description,
                company {
                    id,
                    name
                }
            }
        }`
    const { job } = await graphqlRequest(query, { id });
    return job;
}

export async function loadCompany(id) {
    const query = `query CompanyQuery($id: ID!){
        company(id: $id) {
            id
            name,
            description
        }
    }`
    const { company } = await graphqlRequest(query, { id });
    return company;
}

export async function graphqlRequest(query, variables = {}) {
    const response = await fetch(endPointURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    });

    if (response.errors) {
        const message = response.errors.map((e) => e.message).join('\n');
        throw new Error(message);
    }
    const { data } = await response.json();
    return data;
}