import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import productReducer from './store/reducers/product';
import shoppingCartReducer from './store/reducers/shoppingCart';
import orderReducer from './store/reducers/orders';
import headerItemReducer from './store/reducers/headerItem';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer=combineReducers({
    product:productReducer,
    shoppingCart:shoppingCartReducer,
    order:orderReducer,
    headerItem:headerItemReducer
})

const store=createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));

const app=(
    <Provider store={store}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
