import { useReducer, useEffect } from 'react';
import axios from 'axios';
import useSocket from './useSocket';
import reducer from '../reducers/application';

export default function useApplicationData() {

  const { socket } = useSocket();

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => dispatch({ type: 'setDay', payload: day });

  // Call API to get data and set state
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      dispatch({type: 'setApplicationData', payload: all});
    })
    // .catch(err => console.log(err));
  }, []);

  const updateSpots = function() {
    return axios
      .get('/api/days')
      .then((res) => {
        dispatch({type: 'setDays', payload: {days: res.data}})
      })
      // .catch(err => console.log(err));
  }

  // Book Interview Function
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(res => {
        dispatch({type: 'setInterview', payload: { id, interview: interview }});
      }).then(() => {
        updateSpots();
      })
      // .catch(err => console.log(err));
  }

  // Cancel Interview Function
  const cancelInterview = (id) => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(res => {
        dispatch({type: 'setInterview', payload: { id, interview: null }});
      }).then(() => {
        updateSpots();
      })
      // .catch(err => console.log(err));
  }

  useEffect(() => {
    const current = socket.current;

    if (current) {
      current.onmessage = event => {
        const msg = JSON.parse(event.data);
        if (msg.type === 'SET_INTERVIEW') {
          dispatch({type: 'setInterview', payload: { id: msg.id, interview: msg.interview }});
        }
        updateSpots();
      }
    }

  }, [socket]);

  return { state, setDay, bookInterview, cancelInterview };
  
}