import React, { useState } from 'react';
import InterviewerList from '../InterviewerList'
import Button from '../Button';

export default function Form(props) {

  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || '');

  const reset = function() {
    setInterviewer(null);
    setName('');
  }

  const cancel = function() {
    reset();
    props.onCancel();
  }

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
            onChange={event => setName(event.target.value)}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>Cancel</Button>
          <Button onClick={props.onSave} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}