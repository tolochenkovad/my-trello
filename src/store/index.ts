import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import thunk from 'redux-thunk';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';
import { reduxFirestore } from 'redux-firestore';
import { firebaseConfig } from '../api/firebase';

firebase.initializeApp(firebaseConfig);

const store = createStore(reducers, composeWithDevTools(compose(reduxFirestore(firebase), applyMiddleware(thunk))));

export default store;
