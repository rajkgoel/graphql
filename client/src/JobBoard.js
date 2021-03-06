import React, { Component } from 'react';
import { JobList } from './JobList';
import { loadJobs } from "./data/requests";

export class JobBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { jobs: [] };
  }

  async componentDidMount() {
    let jobs = await loadJobs();
    this.setState({jobs});
  }

  render() {
    const {jobs} = this.state;
    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={jobs} />
      </div>
    );
  }
}
