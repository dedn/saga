import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const initial = {
    people: [],
    planets :[],
    blog: {}
};

export function appReducer(state = initial, action) {
    switch (action.type) {
        case 'SET_PEOPLE' : {
            return {
                ...state,
                people: [
                    ...state.people,
                    ...action.payload
                ]
            }
        }
        case 'SET_PLANETS' : {
            return {
                ...state,
                planets: [
                    ...state.planets,
                    ...action.payload
                ]
            }
        }

        case 'BLOG_LOADED' : {
            return {
                ...state,
                blog:  action.payload

            }
        }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    app: appReducer,
    router: connectRouter(history),
})

export default rootReducer;
