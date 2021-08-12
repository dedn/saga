import { takeEvery, put, call, fork, spawn, select } from 'redux-saga/effects'

// import { takeEvery } from "@redux-saga/core/effects";

async function swapiGet(pattern) {
    const request = await fetch(`http://swapi.dev/api/${pattern}`)
    const data = await request.json()
    return data
}

export function* loadPlanets() {
    const planets = yield call(swapiGet, 'planets')

    console.log('planets', planets)

    yield put({type: 'SET_PLANETS', payload: planets.results})
}

export function* loadPeople() {
    // throw new Error()
    const people = yield call(swapiGet, 'people')
    console.log('people', people)
    yield put({type: 'SET_PEOPLE', payload: people.results})
}

export function* workerSaga() {

    yield fork(loadPeople)
    yield fork(loadPlanets)
    const store = yield select(s => s)
    console.log('store', store)
}

export function* watchLoadDataSaga() {
    // while (true) {
    //     yield take('CLICK')
    //     yield workerSaga()
    // }

    yield takeEvery('LOAD_DATA', workerSaga)
    // yield workerSaga()
}

export default function* rootSaga() {
    yield fork(watchLoadDataSaga)
}
