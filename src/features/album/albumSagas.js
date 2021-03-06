import { put, takeLatest, call, select } from 'redux-saga/effects'
import * as actions from './albumActions'
import * as appActions from '../../app/appActions'
import api from './albumApi'
import { selectSearchParams } from './albumSelector'
import { selectDisplayLanguage } from './../user/userSelector'

const fetchSearchAlbums = function* fetchSearchAlbums() {
    try {
        const params = yield select(selectSearchParams())
        const displayLanguage = yield select(selectDisplayLanguage())
        const response = yield call(api.find, { ...params, lang: displayLanguage });
        let append = (params.start) ? true : false
        yield put(actions.fetchSearchAlbumsSuccess(response.items, append));
    } catch (e) {
        yield put(appActions.requestError(e));
    }
}

const fetchTopAlbums = function* fetchTopAlbums() {
    try {
        const displayLanguage = yield select(selectDisplayLanguage())
        const response = yield call(api.getTopAlbums, { languagePreference: displayLanguage });
        yield put(actions.fetchTopAlbumsSuccess(response));
    } catch (e) {
        yield put(appActions.requestError(e));
    }
}

const fetchLatestAlbums = function* fetchLatestAlbums() {
    try {
        const displayLanguage = yield select(selectDisplayLanguage())
        const response = yield call(api.getRecentAlbums, { languagePreference: displayLanguage });
        yield put(actions.fetchLatestAlbumsSuccess(response));
    } catch (e) {
        yield put(appActions.requestError(e));
    }
}

const fetchAlbumDetail = function* fetchLatestAlbums(action) {
    try {

        if(action.payload && action.payload.id) {
            const displayLanguage = yield select(selectDisplayLanguage())
            const response = yield call(api.getAlbum, action.payload.id, { lang: displayLanguage });
            yield put(actions.fetchAlbumDetailSuccess(response));
        } else {
            yield put(appActions.requestError(new Error("id is undefined")));
        }
    } catch (e) {
        yield put(appActions.requestError(e));
    }
}

const albumSaga = function* albumSagaAsync() {
    yield takeLatest(actions.fetchSearchAlbums, fetchSearchAlbums)
    yield takeLatest(actions.fetchLatestAlbums, fetchLatestAlbums)
    yield takeLatest(actions.fetchTopAlbums, fetchTopAlbums)
    yield takeLatest(actions.fetchAlbumDetail, fetchAlbumDetail)
}

export { fetchSearchAlbums, fetchTopAlbums, fetchLatestAlbums, fetchAlbumDetail }

export default albumSaga
