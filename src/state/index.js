import {
  useState,
  useEffect,
  useCallback,
} from 'react';

const usePO = () => {
  const [state, setState] = useState(() => {
    let init = window && window.localStorage.getItem('_po_state');
    if (init) {
      init = JSON.parse(init);
    }

    else {
      init ={
        punches: [],
      };
    }

    return init;
  });

  useEffect(() => {
    window && window.localStorage.setItem('_po_state', JSON.stringify(state));
  }, [state]);

  const addPunch = useCallback(newPunch => setState({
    ...state,
    punches: [
      ...state.punches,
      newPunch,
    ],
  }), [state]);

  const removePunch = useCallback(punchId => setState({
    ...state,
    punches: state.punches.reduce(
      (acc, curr, i) => ((i === punchId) ? acc : [...acc, curr]),
      [],
    ),
  }), [state]);

  const editPunch = useCallback((punchId, newPunch) => setState({
    ...state,
    punches: state.punches.reduce(
      (acc, curr, i) => ((i === punchId) ? [...acc, newPunch] : [...acc, curr]),
      [],
    ),
  }), [state]);

  const punchOut = useCallback((punchId) => editPunch(punchId, {
    ...state.punches[punchId],
    punchOut: new Date(),
  }), [state, editPunch]);

  return {
    state,
    actions: {
      addPunch,
      removePunch,
      editPunch,
      punchOut,
    },
  };
};

export default usePO;
