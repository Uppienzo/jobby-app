import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {GiSuitcase} from 'react-icons/gi'

import './index.css'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  const jobHeadContainer = () => (
    <div className="job-head-container">
      <img
        src={companyLogoUrl}
        alt="company logo"
        className="company-logo-image"
      />
      <div className="head-info">
        <h1 className="job-title"> {title}</h1>
        <p className="rating">
          <BsFillStarFill className="like-icon" /> {rating}
        </p>
      </div>
    </div>
  )

  const locationAndJobType = () => (
    <div className="location-job-type">
      <p className="location">
        <GoLocation className="icon" /> {location}{' '}
      </p>
      <p className="job-type">
        <GiSuitcase className="job-icon" /> {employmentType}{' '}
      </p>
      <p className="package"> {packagePerAnnum} </p>
    </div>
  )

  const description = () => (
    <div className="description-container-box">
      <h1 className="description-head">Description</h1>
      <p className="description"> {jobDescription} </p>
    </div>
  )

  return (
    <Link to={`/jobs/${id}`} className="job-item-link">
      {' '}
      <li className="job-item-container">
        {jobHeadContainer()}
        {locationAndJobType()}
        <hr />
        {description()}
      </li>{' '}
    </Link>
  )
}

export default JobItem
