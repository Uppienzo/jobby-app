import {BsFillStarFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {GiSuitcase} from 'react-icons/gi'
import {HiOutlineExternalLink} from 'react-icons/hi'

import './index.css'

const JobDetailCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    companyWebsiteUrl,
    skills,
    lifeAtCompany,
  } = details

  const {description, imageUrl} = lifeAtCompany

  const jobHeadContainer = () => (
    <div className="job-head-container">
      <img
        src={companyLogoUrl}
        alt="job details company logo"
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

  const descriptionView = () => (
    <div>
      <div className="description-container">
        <h1 className="head-text">Description</h1>
        <a href={companyWebsiteUrl} className="website-visit-link">
          Visit <HiOutlineExternalLink />
        </a>
      </div>
      <p className="description"> {jobDescription} </p>
    </div>
  )

  const skillItem = data => {
    const {skillImageUrl, name} = data
    return (
      <li className="skill-item" key={name}>
        <img src={skillImageUrl} alt={name} className="skill-logo-img" />
        <h1 className="skill-name"> {name} </h1>
      </li>
    )
  }

  const skillsView = () => (
    <div className="">
      <h1 className="head-text">Skills</h1>
      <ul className="skills-list-container">
        {skills.map(each => skillItem(each))}
      </ul>
    </div>
  )

  const lifeAtCompanyView = () => (
    <div className="">
      <h1 className="head-text">Life at Company</h1>
      <div className="life-at-container-description-image">
        <p className="life-at-company-description"> {description} </p>
        <img src={imageUrl} alt="life at company" className="skill-image" />
      </div>
    </div>
  )

  return (
    <div className="job-card-container">
      {jobHeadContainer()}
      {locationAndJobType()}
      <hr />
      {descriptionView()}
      {skillsView()}
      {lifeAtCompanyView()}
    </div>
  )
}

export default JobDetailCard
