import * as ActionType from '../Actions/ActionTypes'

export const Login = (
    state = {
        loginLoading:false,
        loginErr: null,
        loginSuccess: false,
        accessToken: null,
        userId: null,
        userName: null,
        hasInformationFilled: null,    
      },
 action)=> {
    switch (action.type) {
        case ActionType.LOGIN_SUCCESS:
            return {
                    ...state,
                    loginLoading: false,
                    loginErr: null,
                    loginSuccess: true,
                    accessToken: action.payload.accessToken,
                    userId: action.payload.userId,
                    userName: action.payload.userName,
                    hasInformationFilled: action.payload.hasInformationFilled,
                
            }
        case ActionType.LOGIN_ERR:
            return {
                    ...state,
                    loginLoading: false,
                    loginErr: action.payload,
                    loginSuccess: false,
                    accessToken: null,
                    userId: null,                 
                    userName: null,
                    hasInformationFilled: null,
            }
        case ActionType.LOG_OUT :
            return {
                ...state,
                    loginLoading: false,
                    loginErr: null,
                    loginSuccess: false,
                    accessToken: null,
                    userId: null,                 
                    userName: null,
                    hasInformationFilled: null,
                }
       
        case ActionType.INFORMATION_COMPLETED :
            return {
                    ...state,
                    loginLoading: false,
                    loginErr: null,
                    loginSuccess: true,
                    accessToken: state.accessToken,
                    userId: state.userId,            
                    userName: state.userName,
                    hasInformationFilled: action.payload.hasInformationFilled,
            }
        default:
            return state;
    }   
}
