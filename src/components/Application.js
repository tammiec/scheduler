import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from './DayList';
import Appointment from 'components/Appointment';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Bob Smith",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }
];

export default function Application(props) {

  const [days, setDays] = useState([]);
  const [day, setDay] = useState('Monday');

  useEffect(() => {
    axios
      .get('/api/days')
      .then(res => {
        setDays(res.data);
      })
  }, [])

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
              days={days}
              day={day}
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
          {appointments.map(appointment => {
            return (
              <Appointment 
                key={appointment.id}
                {...appointment}
              />
            )
          })}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
