import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import {GoLocation} from 'react-icons/go'
import {GiSuitcase} from 'react-icons/gi'

import './index.css'

const SimilarJobItem = props => {
  const {details} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="link-container">
      <div className="similar-job-item-container">
        <div className="similar-job-head-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-company-logo-image"
          />
          <div className="similar-job-head-info">
            <h1 className="similar-job-title"> {title}</h1>
            <p className="similar-job-rating">
              <BsFillStarFill className="similar-job-like-icon" /> {rating}
            </p>
          </div>
        </div>
        <div className="similar-job-description-container">
          <h1 className="similar-job-description-head">Description</h1>
          <p className="similar-job-description"> {jobDescription} </p>
        </div>
        <div className="location-job-type">
          <p className="location">
            <GoLocation className="icon" /> {location}{' '}
          </p>
          <p className="job-type">
            <GiSuitcase className="job-icon" /> {employmentType}{' '}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default SimilarJobItem
