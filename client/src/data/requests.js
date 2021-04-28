import { jobQuery, loadJobsQuery, createJobMutation, loadCompanyQuery } from "./queries";
import client from "./apollo-client";

export async function loadJobs() {
    try {
        const { data: { jobs } } = await client.query({ 
            query: loadJobsQuery, 
            fetchPolicy: 'no-cache'
         });
        return jobs;
    } catch (error) {
        console.log(error);
    }
}

export async function loadJob(id) {
    const {data: {job}} = await client.query({
        query: jobQuery, 
        variables: { id }});
    return job;
}

export async function loadCompany(id) {
    const { data: { company }} = await client.query({
        query: loadCompanyQuery, 
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
    const { data: { job }} = await client.mutate({
        mutation: createJobMutation, 
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