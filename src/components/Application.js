// import React, { useEffect } from "react";
import React from 'react';
// import axios from 'axios';
import "components/Application.scss";
import DayList from './DayList';
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from 'hooks/useApplicationData';

export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // get array of appointments for any given day
  const appointments = getAppointmentsForDay(state, state.day);

  // get array of interviewers for any given day
  const interviewers = getInterviewersForDay(state, state.day);

  // create Appointment component per appointment that day
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interviewers={interviewers}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })


  // Render App
  return (
    <main className="layout">
      <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList 
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        <ul>
          {schedule}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
