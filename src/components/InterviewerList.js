import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        avatar={interviewer.avatar}
        name={interviewer.name}
        selected={interviewer === props.value}
        setInterviewer={() => props.onChange(interviewer)}
      />
    )
  });

  return (
    <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          {interviewers}
        </ul>
      </section>
  );
}

// PropTypes validation
InterviewerList.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired
};