import React from 'react';
import { format, parseISO } from 'date-fns';

const cleanPunch = (p) => {
  let cleanPunch = p;

  try {
    cleanPunch = parseISO(cleanPunch);
  }

  catch {
    cleanPunch = p;
  }

  try {
    cleanPunch = format(cleanPunch, 'PPpp');
  }

  catch {
    cleanPunch = p;
  }

  return cleanPunch;
};

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

  const cleanPunchIn = cleanPunch(punchIn);
  const cleanPunchOut = punchOut && cleanPunch(punchOut);

  return (
    <div className="row" onClick={onClick && onClick(punchId)}>
      <h2>{title}</h2>
      <h4>Clock In: {`${cleanPunchIn}`}</h4>
      <h4>Clock Out: {punchOut ? `${cleanPunchOut}` : 'Ongoing'}</h4>
      <p>{note}</p>
      { children }
    </div>
  );
};

export default Punch;
