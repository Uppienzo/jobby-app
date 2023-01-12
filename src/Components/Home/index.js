import {withRouter, Link} from 'react-router-dom'

import './index.css'

import Header from '../Header'

const Home = () => (
  <div className="main-container">
    <Header />
    <div className="home-container">
      <h1 className="home-head-container">Find the job that fits your life</h1>
      <p className="home-description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential
      </p>
      <Link to="/jobs">
        {' '}
        <button type="button" className="find-jobs-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default withRouter(Home)
