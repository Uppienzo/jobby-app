import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const constantStates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  noJobs: 'NOJOBS',
}

class Jobs extends Component {
  state = {
    jobs: [],
    searchInput: '',
    employmentType: [],
    minimumPackage: '',
    status: constantStates.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  successfulFetch = jobs => {
    const updatedJobsList = jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      jobDescription: eachJob.job_description,
      id: eachJob.id,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    if (updatedJobsList.length < 1) {
      this.setState({status: constantStates.noJobs})
    } else {
      this.setState({jobs: updatedJobsList, status: constantStates.success})
    }
  }

  getJobs = async () => {
    this.setState({status: constantStates.loading})
    const {searchInput, employmentType, minimumPackage} = this.state
    const uniqueEmployment = new Set([...employmentType])
    const employment = [...uniqueEmployment].join()
    const jwtToken = Cookies.get('jwt_token')

    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.successfulFetch(data.jobs)
    }
    if (response.status === 400) {
      this.setState({status: constantStates.failure})
    }
  }

  onChangeJobType = event => {
    const newFilter = event.target.value
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, newFilter],
      }),
      this.getJobs,
    )
  }

  onChangeSalary = event => {
    this.setState({minimumPackage: event.target.value}, this.getJobs)
  }

  checkBox = eachJob => {
    const {label, employmentTypeId} = eachJob
    return (
      <div className="check-box" key={employmentTypeId}>
        <input
          type="checkbox"
          id={employmentTypeId}
          onChange={this.onChangeJobType}
          value={employmentTypeId}
        />
        <label htmlFor={employmentTypeId}> {label} </label>
      </div>
    )
  }

  radio = salary => {
    const {label, salaryRangeId} = salary
    return (
      <div className="check-box" key={salaryRangeId}>
        <input
          type="radio"
          id={salaryRangeId}
          onChange={this.onChangeSalary}
          name="salary"
          value={salaryRangeId}
        />
        <label htmlFor={salaryRangeId}> {label} </label>
      </div>
    )
  }

  employmentTypeContainer = () => (
    <ul className="employment-type-container">
      <h1 className="employment-type-heading">Type of Employment</h1>
      {employmentTypesList.map(eachJob => this.checkBox(eachJob))}
    </ul>
  )

  salaryRangeContainer = () => (
    <ul className="employment-type-container">
      <h1 className="employment-type-heading">Salary range</h1>
      {salaryRangesList.map(salary => this.radio(salary))}
    </ul>
  )

  filtersContainer = () => (
    <form className="form-container">
      {this.inputSearchContainerSm()}
      <Profile />
      <hr className="hr" />
      {this.employmentTypeContainer()}
      <hr className="hr" />
      {this.salaryRangeContainer()}
    </form>
  )

  inputSearchContainerSm = () => {
    const {searchInput} = this.state
    return (
      <form className="search-container-small">
        <input
          type="search"
          className="search-input"
          placeholder="search"
          value={searchInput}
          onChange={this.onChangeSearch}
        />
        <button
          type="submit"
          data-testid="searchButton"
          className="search-icon"
          onClick={this.onSearch}
        >
          <AiOutlineSearch />
        </button>
      </form>
    )
  }

  inputSearchContainerLg = () => {
    const {searchInput} = this.state
    return (
      <form className="search-container">
        <input
          type="search"
          className="search-input"
          placeholder="search"
          value={searchInput}
          onChange={this.onChangeSearch}
        />
        <button
          type="submit"
          data-testid="searchButton"
          className="search-icon"
          onClick={this.onSearch}
        >
          <AiOutlineSearch />
        </button>
      </form>
    )
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = event => {
    event.preventDefault()
    this.getJobs()
  }

  loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {jobs} = this.state
    return (
      <ul className="jobs-container-list">
        {jobs.map(eachJob => (
          <JobItem key={eachJob.id} details={eachJob} />
        ))}
      </ul>
    )
  }

  noJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-job-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-head">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-view-retry-button"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  renderJobsSection = () => {
    const {status} = this.state
    switch (status) {
      case constantStates.loading:
        return this.loader()
      case constantStates.success:
        return this.renderJobs()
      case constantStates.noJobs:
        return this.noJobsView()
      case constantStates.failure:
        return this.failureView()
      default:
        return null
    }
  }

  jobResultsContainer = () => (
    <div className="job-results-container">
      {this.inputSearchContainerLg()}
      {this.renderJobsSection()}
    </div>
  )

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="job-body-container">
          {this.filtersContainer()}
          {this.jobResultsContainer()}
        </div>
      </div>
    )
  }
}

export default Jobs
