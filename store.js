import { createStore } from "redux";

const initialState = {
  variableSelected: "none",
  editingMode: "researcher",
  templateList: [],
  errors: ""
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case "LOAD_DATA":
      newState = {
        timestamp:
          action.data.timestamp !== undefined
            ? action.data.timestamp
            : state.timestamp
      };

      Object.keys(action.data).forEach(tableName => {
        newState[tableName] =
          action.data[tableName] !== undefined
            ? action.data[tableName]
            : state[tableName];
      });

      // set default values for questions
      action.data.questions.map(question => {
        newState[question.variable_name] = `${question.variable_name}`;
      });

      return Object.assign({}, state, newState);
    case "SAVE_INPUT_DATA":
      newState = {};
      const question_variable_names = state.questions.map(q => q.variable_name);
      question_variable_names.forEach(key => {
        if (!state[key]) {
          state[key] = "";
        }
        newState[key] =
          action.data[key] !== undefined ? action.data[key] : state[key];
      });
      newState["errors"] =
        action.data["errors"] !== undefined
          ? action.data["errors"] !== undefined
          : state["errors"];
      return Object.assign({}, state, newState);
    case "SAVE_VARIABLE_SELECTED":
      return Object.assign({}, state, {
        variableSelected: action.data.variableSelected
      });
    case "SAVE_TEMPLATE_SELECTED":
      return Object.assign({}, state, {
        templateSelected: action.data.templateSelected
      });
    case "SAVE_EDITING_MODE":
      return Object.assign({}, state, {
        editingMode: action.data.editingMode
      });
    default:
      return state;
  }
};

export const initStore = (state = initialState) => {
  return createStore(reducer, state);
};
