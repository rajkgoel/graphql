import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import { gql } from "graphql-tag";
import { getAccessToken, isLoggedIn } from "./auth.js";

const endPointURL = 'http://localhost:9000/graphql'

const authLink  = new ApolloLink((operation, forward) => {
    if (isLoggedIn()) {
        operation.setContext({
            headers: {
                'authorization': `Bearer ${getAccessToken()}`
            }
        });
    }
    return forward(operation);
})

const client = new ApolloClient({
    link: ApolloLink.from([
        authLink,
        new HttpLink({ uri: endPointURL })
    ]),
    cache: new InMemoryCache()
})

export async function loadJobs() {
    const query = gql`{
        jobs {
            id
            title
            company {
                id
                name
            }
        }
    }`;

    try {
        const { data: { jobs } } = await client.query({ 
            query, 
            fetchPolicy: 'no-cache'
         });
        return jobs;
    } catch (error) {
        console.log(error);
    }
}

const jobQuery = gql`
    query JobQuery($id: ID!){
        job(id: $id) {
            id
            title
            description
            company {
                id
                name
            }
        }
    }`;

export async function loadJob(id) {
    const {data: {job}} = await client.query({
        query: jobQuery, 
        variables: { id }});
    return job;
}

export async function loadCompany(id) {
    const query = gql`
        query CompanyQuery($id: ID!){
            company(id: $id) {
                id
                name
                description
                jobs {
                    id
                    title
                }
            }
    }`;
    const { data: { company }} = await client.query({
        query, 
        variables: { id }
    })
    return company;
}

// export async function graphqlRequest(query, variables = {}) {
//     const request = {
//         method: 'POST',
//         headers: { 'content-type': 'application/json' },
//         body: JSON.stringify({ query, variables })
//     }
//     if (isLoggedIn()) {
//         request.headers['authorization'] = `Bearer ${getAccessToken()}`
//     }
//     const response = await fetch(endPointURL, request);
//     if (response.errors) {
//         const message = response.errors.map((e) => e.message).join('\n');
//         throw new Error(message);
//     }
//     const { data } = await response.json();
//     return data;
// }

export async function createJob(input) {
    const mutation = gql`
        mutation CreateJob($input: CreateJobInput) {
            job: createJob(input: $input) {
                id
                title
                description
                company {
                    id
                    name
                }
            }
        }`;
    const { data: { job }} = await client.mutate({
        mutation, 
        variables: { input },
        update: (cache, {data}) => {
            cache.writeQuery({ 
                query: jobQuery, 
                variables: { id: data.job.id },
                data
            })
        }
    });
    return job;
}