import { combineReducers } from 'redux';
import Login from '../Reducer/Login'
import UserProfile from '../Reducer/UserProfile'
import IncrementDecrement from '../Reducer/IncrementDecrement'

export default combineReducers({ 
    Login,
    UserProfile,
    IncrementDecrement,
 })