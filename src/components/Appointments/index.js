// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    isFilterActive: false,
    titleInput: '',
    dateInput: '',
    appointmentList: [],
  }

  onChangeDateInput = e => {
    this.setState({dateInput: e.target.value})
  }

  onChangeInputTitle = e => {
    this.setState({titleInput: e.target.value})
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppoint => {
        if (id === eachAppoint.id) {
          return {...eachAppoint, isStarred: !eachAppoint.isStarred}
        }
        return eachAppoint
      }),
    }))
  }

  onSubmitAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedData = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedData,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(eachTran => eachTran.isStarred === true)
    }
    return appointmentList
  }

  renderTitleField = () => {
    const {titleInput} = this.state
    console.log(titleInput)
    return (
      <>
        <label htmlFor="titleInput" className="label">
          TITLE
        </label>
        <input
          type="text"
          id="titleInput"
          value={titleInput}
          className="title-input"
          onChange={this.onChangeInputTitle}
        />
      </>
    )
  }

  renderDateField = () => {
    const {dateInput} = this.state
    return (
      <>
        <label htmlFor="dateInput" className="label">
          DATE
        </label>
        <input
          type="date"
          id="dateInput"
          value={dateInput}
          className="date-input"
          onChange={this.onChangeDateInput}
        />
      </>
    )
  }

  render() {
    const filteredAppointmentList = this.getFilteredAppointmentList()
    return (
      <div className="app-container">
        <div className="card-container">
          <div className="upper-container">
            <div className="comments-container">
              <h1 className="heading">Add Appointments</h1>
              <form
                className="form-container"
                onSubmit={this.onSubmitAppointment}
              >
                <div className="render-input">{this.renderTitleField()}</div>
                <div className="render-input">{this.renderDateField()}</div>
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-pic"
            />
          </div>
          <hr className="line" />
          <div className="lower-container">
            <div className="cont">
              <h1>Appointments</h1>
              <button
                type="button"
                onClick={this.onFilter}
                className="button-star"
              >
                Starred
              </button>
            </div>
            <div>
              <ul className="unordered">
                {filteredAppointmentList.map(eachApp => (
                  <AppointmentItem
                    eachAppDetails={eachApp}
                    key={eachApp.id}
                    onToggleStar={this.onToggleStar}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
