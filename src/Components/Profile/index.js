import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const constantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Profile extends Component {
  state = {profile: '', status: constantStatus.loading}

  componentDidMount() {
    this.getProfileDetails()
  }

  successView = profileDetails => {
    const updatedProfileDetails = {
      name: profileDetails.name,
      profileImageUrl: profileDetails.profile_image_url,
      shortBio: profileDetails.short_bio,
    }
    this.setState({
      profile: updatedProfileDetails,
      status: constantStatus.success,
    })
  }

  getProfileDetails = async () => {
    this.setState({status: constantStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.successView(data.profile_details)
    }
    if (data.status_code === 400) {
      this.setState({status: constantStatus.failure})
    }
  }

  loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileView = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name"> {name} </h1>
        <p className="profile-description"> {shortBio} </p>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-container">
      <button
        type="button"
        className="profile-retry-button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {status} = this.state
    switch (status) {
      case constantStatus.loading:
        return this.loader()
      case constantStatus.success:
        return this.profileView()
      case constantStatus.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderProfile()}</>
  }
}

export default Profile
