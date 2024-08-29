import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { userDetail } from "./Reducer";

const userPersistConfig = {
    key: 'user',
    storage: storageSession,
  }
  
  const rootReducer = combineReducers({
    profile: persistReducer(userPersistConfig, userDetail),
  });
  
  const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
  })
  
  export const persistor = persistStore(store)