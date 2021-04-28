import React, { Component } from 'react';
import { createJob } from "./data/requests";

export class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', 
      description: '',
      error: ''
    };
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  async handleClick(event) {
    this.setState({error: ''})
    event.preventDefault();
    const {title, description} = this.state;
    try {
      let job = await createJob({title, description});
      if (!job) {
        throw new Error(`Some error occurred while creating new Job: ${title}`)
      }
      this.props.history.push(`/jobs/${job.id}`);
    } catch(error) {
      this.setState({ error: error.message });
      console.log(error);
    }
  }

  render() {
    const {title, description, error} = this.state;
    return (
      <div>
        <h1 className="title">New Job</h1>
        <div className="box">
          <form>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input className="input" type="text" name="title" value={title}
                  onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea className="input" style={{height: '10em'}}
                  name="description" value={description} onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-link" onClick={this.handleClick.bind(this)}>Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div className="box">{error}</div>
      </div>
    );
  }
}
