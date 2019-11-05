const reducers = {
  setDay(state, action) {
    return {
      ...state, 
      day: action.payload
    };
  },
  // setApplicationData(state, action) {
  //   return {
  //     ...state,
  //     days: action.payload[0].data,
  //     appointments: action.payload[1].data,
  //     interviewers: action.payload[2].data
  //   };
  // },
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
  },
  default(state, action) {
    throw new Error( `tried to reduce with unsupported action type: ${action.type}`)
  }
};

const reducer = function(state, action) {
  try {
    return reducers[action.type](state, action) || state;
  }
  catch {
    throw new Error(`tried to reduce with unsupported action type: ${action.type}`)
  }
};

export default reducer;
export { reducers };
