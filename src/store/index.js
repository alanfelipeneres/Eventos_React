import { createStore } from 'redux';
import usuarioReducer from './usuarioReducer';

//Até então estavamos salvando os dados do usuário logado no store
//Com o 'redux-persist' nós vamos colocar os dados do usuário no browser
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'siteeventos',
    storage,
}

const persistedReducer = persistReducer(persistConfig, usuarioReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store)

export { store, persistor };