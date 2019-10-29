export function getAppointmentsForDay(state, name) {
  const filteredDay = state.days.filter(day => day.name === name);

  if (!filteredDay[0]) {
    return [];
  }

  const apptsArray = filteredDay[0].appointments;

  let apptsDetails = apptsArray.map(appt => {
    return state.appointments[appt]
  });
  
  return apptsDetails;
}

export function getInterview(state, interview) {
  const apptInfo = Object.values(state.appointments);

  if (!interview || typeof interview.interviewer !== 'number') {
    return interview;
  } else {
    let filteredInterview = apptInfo.filter(appt => appt.interview === interview);
    filteredInterview = filteredInterview[0].interview;
    if (!filteredInterview) {
      return null;
    }
    filteredInterview.interviewer = state.interviewers[filteredInterview.interviewer];
    return filteredInterview;
  }
}