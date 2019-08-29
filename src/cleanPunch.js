import { parseISO, format } from 'date-fns';

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
    console.log('wtf?');
    console.dir(p);
    cleanPunch = p;
  }

  return cleanPunch;
};

export default cleanPunch;
