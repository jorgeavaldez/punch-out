import { parseISO, format } from 'date-fns';

const cleanPunch = (p, onlyTime = false) => {
  let cleanPunch = p;

  try {
    cleanPunch = parseISO(cleanPunch);
  }

  catch {
    cleanPunch = p;
  }

  if (onlyTime) {
    try {
      cleanPunch = format(cleanPunch, 'HH:mm');
    }

    catch {
      cleanPunch = p;
    }
  }

  else {
    try {
      cleanPunch = format(cleanPunch, 'PPpp');
    }

    catch {
      cleanPunch = p;
    }
  }

  return cleanPunch;
};

export default cleanPunch;
