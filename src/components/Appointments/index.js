// Write your code here

import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM YYYY, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentList()

    return (
      <div className="app-container">
        <div className="app-Appointments-container">
          <h1 className="heading">Add Appointment</h1>
          <form className="form" onSubmit={this.onAddAppointment}>
            <label className="label" htmlFor="title">
              TITLE
            </label>
            <input
              type="text"
              className="input"
              placeholder="Title"
              id="title"
              value={titleInput}
              onChange={this.onChangeTitleInput}
            />
            <label className="labels" htmlFor="date">
              DATE
            </label>
            <input
              type="date"
              className="input"
              id="date"
              value={dateInput}
              onChange={this.onChangeDateInput}
            />
            <button className="button" type="submit">
              Add
            </button>
          </form>
          <img
            className="img"
            alt="appointments"
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
          />
          <hr className="hr" />
          <div className="head-with-filter-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              type="button"
              className={`filter-style ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
