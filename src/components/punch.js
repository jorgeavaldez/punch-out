import React from 'react';
import { format, parseISO } from 'date-fns';

const Punch = ({
  onClick,
  punchId,
  punch: { punchIn, punchOut, details },
  children,
}) => {
  const {
    title,
    note,
  } = details;

  return (
    <div className="row" onClick={onClick && onClick(punchId)}>
      <h2>{title}</h2>
      <h4>Clock In: {format(parseISO(punchIn), 'PPpp')}</h4>
      <h4>Clock Out: {punchOut ? format(parseISO(punchOut), 'PPpp') : 'Ongoing'}</h4>
      <p>{note}</p>
      { children }
    </div>
  );
};

export default Punch;
