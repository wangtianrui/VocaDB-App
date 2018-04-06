import { put, takeLatest, call, select, all } from 'redux-saga/effects'
import * as actions from './tagActions'
import * as appActions from '../../app/appActions'
import api from './tagApi'
import { selectTagDetailId } from './tagSelector'

const fetchTagDetail = function* fetchLatestTags() {
    try {
        const tagId = yield select(selectTagDetailId());

        if(!tagId) return;

        const [detailResponse, topSongs, topArtists, topAlbums] = yield all([
            call(api.getTag, tagId),
            call(api.getTopSongsByTag, tagId),
            call(api.getTopArtistsByTag, tagId),
            call(api.getTopAlbumsByTag, tagId),
        ])

        yield put(actions.fetchTagDetailSuccess(detailResponse));

        if(topSongs && topSongs.items) {
            yield put(actions.fetchTopSongsByTagSuccess(topSongs.items));
        }

        if(topArtists && topArtists.items) {
            yield put(actions.fetchTopArtistsByTagSuccess(topArtists.items));
        }

        if(topAlbums && topAlbums.items) {
            yield put(actions.fetchTopAlbumsByTagSuccess(topAlbums.items));
        }

    } catch (e) {
        yield put(appActions.requestError(e));
    }
}

const fetchTopSongsByTag = function* fetchTopSongs(action) {
    try {
        const response = yield call(api.getTopSongsByTag, action.payload.tagId);
        yield put(actions.fetchTopSongsByTagSuccess(response.items));
    } catch (e) {
        yield put(appActions.requestError(e));
    }
}

const fetchTopArtistsByTag = function* fetchTopArtistsByTag(action) {
    try {
        const response = yield call(api.getTopArtistsByTag, action.payload.tagId);
        yield put(actions.fetchTopArtistsByTagSuccess(response.items));
    } catch (e) {
        yield put(appActions.requestError(e));
    }
}

const fetchTopAlbumsByTag = function* fetchTopAlbumsByTag(action) {
    try {
        const response = yield call(api.getTopAlbumsByTag, action.payload.tagId);
        yield put(actions.fetchTopAlbumsByTagSuccess(response.items));
    } catch (e) {
        yield put(appActions.requestError(e));
    }
}

const searchTags = function* searchTags(action) {
    try {
        const params = action.payload.params;

        if(!params) return;

        const response = yield call(api.find, params);

        yield put(actions.addTagsSearchResult(response.items));

    } catch (e) {
        yield put(appActions.requestError(e));
    }
}

const tagSaga = function* tagSagaAsync() {
    yield takeLatest(actions.fetchTagDetail, fetchTagDetail)
    yield takeLatest(actions.searchTags, searchTags)
}

export { fetchTagDetail, fetchTopSongsByTag, fetchTopArtistsByTag, fetchTopAlbumsByTag, searchTags }

export default tagSaga
