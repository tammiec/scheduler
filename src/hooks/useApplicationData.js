import { useReducer, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const reducers = {
    setDay(state, action) {
      return {
        ...state, 
        day: action.day
      };
    },
    setApplicationData(state, action) {
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    },
    setInterview(state, action) {
      return {
        ...state, 
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: {...action.interview},
          }
        },
        days: action.days
      };
    }
  };

  const reducer = function(state, action) {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => dispatch({ type: 'setDay', day });

  // Call API to get data and set state
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      dispatch({type: 'setApplicationData', days: all[0].data, appointments: all[1].data, interviewers: all[2].data});
    }).catch(err => console.log(err));
  }, []);

  // Book Interview Function
  const bookInterview = (id, interview, edit = false) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    return Promise.all([
      axios.get('/api/days'),
      axios.put(`/api/appointments/${id}`, appointment)
    ]).then(all => {
      dispatch({type: 'setInterview', id, interview, days: all[0].data});
    }).catch(err => console.log(err));
  }

  // Cancel Interview Function
  const cancelInterview = (id) => {
    return Promise.all([
      axios.get('/api/days'),
      axios.delete(`/api/appointments/${id}`)
    ]).then(all => {
      dispatch({type: 'setInterview', id, interview: null, days: all[0].data});
    }).catch(err => console.log(err));
  }

  return { state, setDay, bookInterview, cancelInterview };

}
