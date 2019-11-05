import React, { useEffect } from 'react';
import './styles.scss';

// COMPONENTS
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

// CUSTOM HOOKS
import useVisualMode from 'hooks/useVisualMode';

// CONSTANTS
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Save Interview
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer: interviewer
    };

    transition(SAVING);
  
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true));
  };

  // Delete Interview
  const destroy = () => {

    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  };

  // Mode handling for Websockets - transitions to correct mode when other users update state
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    } else if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, mode, transition]);

  return (
    <article className="appointment" data-testid='appointment' >
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status status='Saving' />}
      {mode === DELETING && <Status status='Deleting' />}
      {mode === CONFIRM && (
        <Confirm 
          message='Are you sure you would like to delete?'
          onCancel={back}
          onConfirm={destroy}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message='Error occurred: could not save' 
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message='Error occurred: could not delete' 
          onClose={back}
        />
      )}
    </article>
  )
};