import { useReducer, useEffect } from 'react';
import axios from 'axios';
import useSocket from './useSocket';

export default function useApplicationData() {

  const { socket } = useSocket();

  const reducers = {
    setDay(state, action) {
      return {
        ...state, 
        day: action.payload
      };
    },
    setApplicationData(state, action) {
      return {
        ...state,
        days: action.payload[0].data,
        appointments: action.payload[1].data,
        interviewers: action.payload[2].data
      };
    },
    setInterview(state, action) {
      let obj = {
        ...state, 
        appointments: {
          ...state.appointments,
          [action.payload.id]: {
            ...state.appointments[action.payload.id],
            interview: !action.payload.interview ? null : {...action.payload.interview},
          }
        }
      };
      return obj;
    },
    setDays(state, action) {
      return {
        ...state,
        days: [...action.payload.days]
      }
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
  
  const setDay = day => dispatch({ type: 'setDay', payload: day });

  // Call API to get data and set state
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      dispatch({type: 'setApplicationData', payload: all});
    }).catch(err => console.log(err));
  }, []);

  const updateSpots = function() {
    return axios
      .get('/api/days')
      .then((res) => {
        dispatch({type: 'setDays', payload: {days: res.data}})
      })
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
        updateSpots(id, -1);
      })
      .catch(err => console.log(err));
  }

  // Cancel Interview Function
  const cancelInterview = (id) => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(res => {
        dispatch({type: 'setInterview', payload: { id, interview: null }});
      }).then(() => {
        updateSpots(id, 1);
      })
      .catch(err => console.log(err));
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
