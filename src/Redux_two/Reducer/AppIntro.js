import * as ActionTypes from '../Actions/ActionTypes'

const AppIntro = (state ={
    hasCompleted : false
}, action) => {
    switch (action.type) {
        case ActionTypes.APP_INTRO_SEEN:
            return{
                ...state,
                hasCompleted : true    
            }
        default:
            return state;
    }
}

export default AppIntro