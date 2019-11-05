import React, { useState } from 'react';
import InterviewerList from '../InterviewerList'
import Button from '../Button';

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || '');
  const [error, setError] = useState('');

  // Resets Interviewer and Name States
  const reset = function() {
    setInterviewer(null);
    setName('');
  };

  // Cancel function
  const cancel = function() {
    reset();
    props.onCancel();
  };

  // Validation for Student Name
  const validate = function() {
    if (name === '') {
      setError('Student name cannot be blank');
      return;
    };
    // console.log('Form - validate: ', interviewer)
    setError('');
    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name='name'
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => {
              setError('');
              setName(event.target.value)
            }}
            data-testid='student-name-input'
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>Cancel</Button>
          <Button onClick={() => validate()} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}