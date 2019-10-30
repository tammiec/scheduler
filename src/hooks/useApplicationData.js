import { useReducer, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const reducers = {
    setDay(state, action) {
      return state = {
        ...state, 
        day: action.day
      };
    },
    setApplicationData(state, action) {
      return state = {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    },
    setInterview(state, action) {
      return state = {
        ...state, 
        appointments: {
          ...state.appointments,
          [action.id]: {...state.appointments[action.id],
            interview: {...action.interview}
          }
        }
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

  // const [state, setState] = useState({
  // });
  
  // const setDay = day => setState({ ...state, day });
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
  }, [])
  
  // Book Interview Function
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // }
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        dispatch({type: 'setInterview', id, interview});
      });
  }

  // Cancel Interview Function
  const cancelInterview = (id) => {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // }
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // }
    return axios
      .delete(`/api/appointments/${id}`)
      .then(res => {
        dispatch({type: 'setInterview', id, interview: null})
      });
  }

  return { state, setDay, bookInterview, cancelInterview };

}
