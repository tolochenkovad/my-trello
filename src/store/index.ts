import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import thunk from 'redux-thunk';

export type AppStore = ReturnType<typeof reducers>;

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
