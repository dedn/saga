import { call, takeEvery, apply, take, fork, put } from 'redux-saga/effects'
import {LOCATION_CHANGE} from 'connected-react-router'

function* loadBlogData() {

    console.log('load blog data 1')
    const request = yield call(fetch, 'https://swapi.dev/api/vehicles')
    // const data = yield call(request.json.bind(request))
    const data = yield call([request, request.json])
    console.log('data vehicles', data)

    yield put({type: 'BLOG_LOADED', payload:data})

}


export default function* pageLoaderSaga() {
    while (true) {
        const action = yield take(LOCATION_CHANGE)
        if(action.payload.location.pathname.endsWith('blog')){
            yield fork(loadBlogData)
        }
        console.log('>>', action)
    }
    // yield takeEvery('LOAD_BLOG_DATA', loadBlogData)
}
