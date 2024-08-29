import Axios from "axios";
import * as ActionTypes from "./ActionTypes";

export const incr_Question = (data) => {
  return {
    type: ActionTypes.INCRMENT_QUESTION,
    payload: data,
  };
};
export const decr_Question = (data) => {
  return {
    type: ActionTypes.DECREMENT_QUESTION,
    payload: data,
  };
};

export const incr_counter = (count) => {
  return {
    type: ActionTypes.INCRMENT_COUNTER,
    payload: count,
  };
};

export const decr_counter = (count) => {
  return {
    type: ActionTypes.DECRMENT_COUNTER,
    payload: count,
  };
};

export const set_counter_zero = (count) => {
  return {
    type: ActionTypes.SET_COUNTER_ZERO,
    payload: count,
  };
};

export const update_question_data = (data) => {
  return {
    type: ActionTypes.UPDATE_QUESTION,
    payload: data,
  };
};

export const update_answer_data = (data) => {
  return {
    type: ActionTypes.UPDATE_ANSWER,
    payload: data,
  };
};
export const set_question_data = (data) => {
  return {
    type: ActionTypes.SET_QUESTION,
    payload: data,
  };
};

export const count_attempts = (data) => {
  return {
    type: ActionTypes.COUNT_QUESTION_ATTEMPTS,
    payload: data,
  };
};

export const decrementQuestion = (data) => (dispatch) => {
  dispatch(decr_Question(data));
};

