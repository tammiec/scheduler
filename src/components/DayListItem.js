import React from "react";
import 'components/DayListItem.scss';
import classNames from 'classnames';
import { format } from "util";

export default function DayListItem(props) {

  const dayListItemClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': (props.spots === 0)
  });

  const formatSpots = (spotsNum) => {
    return spotsNum === 0 ? 'no spots' :
      spotsNum === 1 ? spotsNum + ' spot' : 
      spotsNum + ' spots';
  }

  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}