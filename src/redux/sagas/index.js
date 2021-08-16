import { takeEvery, put, call, fork, spawn, select,take, delay,  all } from 'redux-saga/effects'
import peopleSaga from "./people";

export default function* rootSaga() {
    const sagas = [peopleSaga]

    yield all(sagas.map(s =>spawn(s)))

    // const retrySagas = yield  sagas.map(saga => {
    //     return spawn(function* () {
    //         while (true) {
    //             try {
    //                 yield call(saga)
    //                 break
    //             } catch (e) {
    //                 console.log(e)
    //             }
    //         }
    //
    //     })
    // })
    //
    // yield all(retrySagas)
}
