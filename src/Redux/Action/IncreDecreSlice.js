import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQuestionRedux: 0,
  currentQuestionId: [],
  currentQuestionAnswer: [],
  questions: "",
  noOfQuestionsAttempted: 0,
};

export const IncrementDecrementSlice = createSlice({
  name: "incrementDecrement",
  initialState,
  reducers: {
    SET_QUESTION: (state, action) => {
      state.questions = action.payload;
      state.noOfQuestionsAttempted = 0;
    },
    INCRMENT_QUESTION: (state, action) => {
      state.currentQuestionRedux = state.currentQuestionRedux + action.payload;
    },
    DECREMENT_QUESTION: (state, action) => {
      state.currentQuestionRedux = state.currentQuestionRedux - action.payload;
    },
    COUNT_QUESTION_ATTEMPTS: (state, action) => {
      state.noOfQuestionsAttempted += action.payload;
    },
    SET_COUNTER_ZERO: (state, action) => {
      state.currentQuestionRedux = action.payload;
    },
    UPDATE_QUESTION: (state, action) => {
      state.currentQuestionId = action.payload;
    },
    UPDATE_ANSWER: (state, action) => {
      state.currentQuestionAnswer = action.payload;
    },
  },
});

export const {
  INCRMENT_QUESTION,
  DECREMENT_QUESTION,
  SET_QUESTION,
  COUNT_QUESTION_ATTEMPTS,
  SET_COUNTER_ZERO,
  UPDATE_QUESTION,
  UPDATE_ANSWER,
} = IncrementDecrementSlice.actions;
export default IncrementDecrementSlice.reducer;
