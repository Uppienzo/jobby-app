import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    userInput: '',
    passwordInput: '',
    errorMessage: '',
    userDetailsError: false,
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.login()
  }

  loginSuccessful = jwtToken => {
    const {history} = this.props
    this.setState({userDetailsError: true})
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = errorMessage => {
    this.setState({errorMessage, userDetailsError: true})
  }

  login = async () => {
    const {userInput, passwordInput} = this.state

    const userDetails = {
      username: userInput,
      password: passwordInput,
    }

    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.loginSuccessful(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {
      userInput,
      passwordInput,
      errorMessage,
      userDetailsError,
    } = this.state
    return (
      <div className="login-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-web-log"
          />
          <label htmlFor="userName">USERNAME</label>
          <input
            type="text"
            className="input-field"
            id="userName"
            placeholder="Username"
            onChange={this.onChangeUserInput}
            value={userInput}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            className="input-field"
            id="password"
            placeholder="Password"
            onChange={this.onChangePassword}
            value={passwordInput}
          />
          <button type="submit" className="login-submit-button">
            Login
          </button>
          {userDetailsError && (
            <p className="error-msg-container">*{errorMessage}</p>
          )}
        </form>
      </div>
    )
  }
}

export default Login
