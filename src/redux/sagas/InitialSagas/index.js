import { call, delay, fork } from "redux-saga/effects";
import { all } from "@redux-saga/core/effects";

function* auth() {
    delay(2000)

    console.log('autch ok')
    return true
}

function* loadUser() {
    const request = yield call(fetch, 'https://swapi.dev/api/people')
    // const data = yield call(request.json.bind(request))
    const data = yield call([request, request.json])
    console.log('data users', data)

}

export default function* loadBasicData() {
    yield all([
        fork(auth),
        fork(loadUser)
    ])
}
