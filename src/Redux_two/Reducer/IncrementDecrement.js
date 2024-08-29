import * as ActionType from '../Actions/ActionTypes'

export const IncrementDecrement = (
    state = {
        currentQuestionRedux : 0,
        currentQuestionId : '',
        currentQuestionAnswer : '',
        questions : '',
        noOfQuestionsAttempted : 0
      },
 action)=> {
    switch (action.type) {
        case ActionType.INCRMENT_QUESTION:
            return {
                    ...state,
                   
                    //currentQuestion : action.payload,
                
            }

        case ActionType.SET_QUESTION:
            return {
                ...state, 
                questions : action.payload,
                noOfQuestionsAttempted : 0,
                
            }

        case ActionType.INCRMENT_COUNTER:
            return {
                ...state, 
                currentQuestionRedux : state.currentQuestionRedux + action.payload,
                
            }
        case ActionType.DECRMENT_COUNTER:
            return {
                ...state, 
                currentQuestionRedux : state.currentQuestionRedux - action.payload,
                
            }

        case ActionType.SET_COUNTER_ZERO:
            return {
                ...state, 
                currentQuestionRedux : action.payload,
            }
            
        case ActionType.UPDATE_QUESTION:
            return {
                ...state, 
                currentQuestionId : action.payload,
                // currentQuestionAnswer : action.payload.currentQuestionAnswer
            }
        case ActionType.UPDATE_ANSWER:
            return {
                ...state, 
                currentQuestionAnswer : action.payload,
            }
        
         case ActionType.COUNT_QUESTION_ATTEMPTS:
            return {
                ...state, 
                noOfQuestionsAttempted : state.noOfQuestionsAttempted + 1,
            }

        case ActionType.DECREMENT_QUESTION:
            return {
                    ...state,
                    
                   // currentQuestion : action.payload.currentQuestion - 1,
            }
        default:
            return state;
    }   
}
