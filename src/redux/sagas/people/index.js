import { call, apply, takeEvery, put, select, take, fork } from 'redux-saga/effects'
import { LOAD_USERS, LOAD_USERS_SUCCESS } from "../../reducers/people/actions";
import { LOCATION_CHANGE } from 'connected-react-router'
import { selectPeople } from "../../reducers/people/selectors";

export function* loadPeopleDetails() {

}

export function* loadPeopleList({payload}) {
    console.log('work')
    const {page, search} = payload
    const request = yield call(
        fetch,
        `https://swapi.dev/api/people?page=${page}&search${search}`
    )

    const data = yield apply(request, request.json)
    yield put({
        type: LOAD_USERS_SUCCESS,
        payload: data
    })
}

export function* loadUsersOnRouteEnter() {

    while (true) {
        const state = yield select(selectPeople)

        const {search, page} = state

        const action = yield take(LOCATION_CHANGE)

        if (action.payload.location.pathname === '/') {
            yield put({
                type: LOAD_USERS,
                payload: {
                    search,
                    page
                }
            })
        }
    }
}


export default function* peopleSaga() {
    yield fork(loadUsersOnRouteEnter)
    yield takeEvery(LOAD_USERS, loadPeopleList)
}

