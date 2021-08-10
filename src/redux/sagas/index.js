import { takeEvery } from 'redux-saga/effects'
// import { takeEvery } from "@redux-saga/core/effects";


export function* workerSaga() {
    console.log(' click from saga')
}

export function* watchClickSaga() {
    // while (true) {
    //     yield take('CLICK')
    //     yield workerSaga()
    // }

    yield takeEvery('CLICK', workerSaga)
    // yield workerSaga()
}

export default function* rootSaga() {
    yield watchClickSaga()
}
