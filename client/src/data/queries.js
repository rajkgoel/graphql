import { gql } from "graphql-tag";

const jobDetailFragment = gql`
    fragment JobDetail on Job {
        id
        title
        description
        company {
            id
            name
        }
    }
`;

export const jobQuery = gql`
    query JobQuery($id: ID!){
        job(id: $id) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
`;

export const loadJobsQuery = gql`{
        jobs {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
`;

export const createJobMutation = gql`
    mutation CreateJob($input: CreateJobInput) {
        job: createJob(input: $input) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
`;

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
    }
`;