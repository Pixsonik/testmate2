import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore ,persistCombineReducers } from 'redux-persist'
import { Login } from '../Reducer/Login';
import AsyncStorage from '@react-native-community/async-storage';
import { UserProfile } from '../Reducer/UserProfile';
import { IncrementDecrement } from '../Reducer/IncrementDecrement';



export const ConfigureStore = () => {
    const config = {
        key : 'root',
        storage : AsyncStorage,
        debug: true,
    }
    
    const store = createStore(
        persistCombineReducers(config ,{
            login : Login,
            user : UserProfile,
            IncrementDecrement : IncrementDecrement,
        }),
        applyMiddleware(thunk),
    );
    
    const persistor = persistStore(store);

    return{ persistor, store }
} 



