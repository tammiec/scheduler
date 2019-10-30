import React from 'react';
import './styles.scss';

// COMPONENTS
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';

// CUSTOM HOOKS
import useVisualMode from 'hooks/useVisualMode';

// CONSTANTS
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = 'SAVING';

export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Save Interview
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
  
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => console.log('Error: ', err));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status status='Saving' />}
    </article>
  )
};