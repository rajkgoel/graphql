import { gql } from "graphql-tag";

export const jobQuery = gql`
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

export const loadJobsQuery = gql`{
        jobs {
            id
            title
            company {
                id
                name
            }
        }
    }`;

export const createJobMutation = gql`
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

export const loadCompanyQuery = gql`
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