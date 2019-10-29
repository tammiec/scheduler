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

