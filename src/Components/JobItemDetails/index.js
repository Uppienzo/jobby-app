import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import JobDetailCard from '../JobDetailCard'
import SimilarJobItem from '../SimilarJobItem'

const constantStates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {job: '', status: constantStates.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({status: constantStates.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobUrl, options)
    if (response.status === 200) {
      const data = await response.json()
      this.updateDataDetails(data)
    }
    if (response.status === 400) {
      this.setState({status: constantStates.failure})
    }
  }

  updateDataDetails = details => {
    const jobsObject = {
      jobDetails: details.job_details,
      similarJobs: details.similar_jobs,
    }
    const {jobDetails, similarJobs} = jobsObject

    const skills = jobDetails.skills.map(each => ({
      skillImageUrl: each.image_url,
      name: each.name,
    }))

    const updatedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      },

      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills,
      title: jobDetails.title,
    }

    const updatedSimilarJobs = similarJobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    const jobInfo = {
      updatedJobDetails,
      updatedSimilarJobs,
    }
    this.setState({job: jobInfo, status: constantStates.success})
  }

  loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
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
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  jobInformation = () => {
    const {job} = this.state
    const {updatedJobDetails, updatedSimilarJobs} = job
    console.log(updatedSimilarJobs[0])
    return (
      <div className="">
        <JobDetailCard details={updatedJobDetails} />
        <h1 className="similar-jobs-head">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {updatedSimilarJobs.map(eachJob => (
            <SimilarJobItem key={eachJob.id} details={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobResults = () => {
    const {status} = this.state
    switch (status) {
      case constantStates.loading:
        return this.loader()
      case constantStates.success:
        return this.jobInformation()
      case constantStates.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-container">
        <Header />
        {this.renderJobResults()}
      </div>
    )
  }
}

export default JobItemDetails
