import { takeEvery, put, call, fork, spawn, select,take, delay } from 'redux-saga/effects'
import { wrapMapToPropsConstant } from "react-redux/lib/connect/wrapMapToProps";
import { all } from "@redux-saga/core/effects";
import { whenMapDispatchToPropsIsFunction } from "react-redux/lib/connect/mapDispatchToProps";
import loadBasicData from "./InitialSagas";
import pageLoaderSaga from "./pageLoader";

// import { takeEvery } from "@redux-saga/core/effects";

export function* fetchStarsShips() {
    const response = yield call(fetch, 'http://swapi.dev/api/starships')
    const date = yield call([response, response.json])


    console.log('load some data completing', date)
}

export function* loadOnAction() {

    while(true) {
        console.log('load some data starts')
        yield take('LOAD_SOME_DATA')
        yield fork(fetchStarsShips)

    }
}

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

export function* saga1() {
    console.log('saga 1')
}

export function* saga2() {
    console.log('saga 1')
}

export function* saga3() {
    console.log('saga 1')
}


export default function* rootSaga() {
    // yield fork(watchLoadDataSaga)

    const sagas = [saga1, saga2, saga3, watchLoadDataSaga, loadBasicData, pageLoaderSaga, loadOnAction]

    const retrySagas = yield  sagas.map(saga => {
        return spawn(function* () {
            while (true) {
                try {
                    yield call(saga)
                    break
                } catch (e) {
                    console.log(e)
                }
            }

        })
    })

    yield all(retrySagas)
}
