import React, {
  useCallback,
  createRef,
} from 'react';

import {
  useNavigation,
} from 'react-navi';

import { format, parseISO } from 'date-fns';

const PunchForm = (props) => {
  const {
    onSubmit: parentSubmit,
    defaults,
    punchId,
    punchOut,
    removePunch
  } = props;

  const navigation = useNavigation();

  const formRef = createRef();

  const onSubmit = useCallback((evt) => {
    evt.preventDefault();

    if (!formRef.current) return;

    const inputs = Array.from(formRef.current.querySelectorAll('input, textarea'));
    const newPunch = {
      punchIn: new Date(),
      punchOut: null,

      details: inputs.reduce((acc, currInput) => ({
        ...acc,
        [currInput.name]: currInput.value,
      }), {}),
    };

    if (defaults) {
      parentSubmit(punchId, newPunch);
    }

    else {
      parentSubmit(newPunch);
    }

    navigation.navigate('/');
  }, [parentSubmit, formRef, defaults, punchId, navigation]);

  const onPunch = useCallback((evt) => {
    evt.preventDefault();

    if (punchOut) {
      punchOut(punchId);
    }
  }, [punchId, punchOut]);

  const onDelete = useCallback((evt) => {
    evt.preventDefault();

    if (removePunch) {
      removePunch(punchId);
    }
  }, [punchId, removePunch]);

  /*
  const formatString = 'cccc hh:mm:ss ';
  */

  return (
    <div className="row">
      <form ref={formRef} onSubmit={onSubmit}>
        {
          (defaults && defaults.punchIn) ? (
            <>
              <h4>Punched in at {format(parseISO(defaults.punchIn), 'PPPPpppp')}</h4>
              <label>Edit in time</label>
              <input name="punchIn" type="time" step="1" defaultValue={format(parseISO(defaults.punchIn), 'hh:mm:ss')} />
            </>
          ) : null
        }

        {
          (defaults && defaults.punchIn && !defaults.punchOut) ? (
            <>
              <h4>Ongoing</h4>
              <button type="submit" onClick={onPunch}>Punch Out!!!</button>
            </>
          ) : null
        }

        {
          (defaults && defaults.punchOut) ? (
            <>
              <h4>Punched out at {format(parseISO(defaults.punchIn), 'hh:mm:ss')}</h4>
              <label>Edit out time</label>
              <input name="punchOut" type="time" step="1" defaultValue={format(parseISO(defaults.punchOut), 'hh:mm:ss')} />
            </>
          ) : null
        }

        <label>Title</label>
        <input name="title" type="text" defaultValue={(defaults && defaults.details.title) ? defaults.details.title : ''} />

        <label>Note</label>
        <textarea name="note" type="text" defaultValue={(defaults && defaults.details.note) ? defaults.details.note : ''} />

        <button type="submit">Punch!!!</button>

        <button type="submit" onClick={onDelete}>xxx DELETE xxx</button>
      </form>
    </div>
  );
};

export default PunchForm;
