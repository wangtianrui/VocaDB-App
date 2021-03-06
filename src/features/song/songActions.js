import { createAction } from 'redux-act'
import { normalize } from 'normalizr'
import songSchema from './songSchema'
import tagSchema from "../tag/tagSchema";


export const addFavoriteSong = createAction('Add favorite song', song => ({ song }))
export const removeFavoriteSong = createAction('Remove favorite song', song => ({ song }))

export const fetchSearchSongs = createAction('fetch search songs', (params, remove, replace) => ({ loading: true, params, remove, replace }))
export const fetchSearchSongsSuccess =  createAction('fetch search songs success', (data, append) => {
    let nom = normalize(data, [ songSchema ])
    return { ...nom, append }
})

export const fetchHighlighted = createAction('fetch highlighted songs', () => ({ loading: true }))
export const fetchHighlightedSuccess = createAction('fetch highlighted songs success', data => normalize(data, [ songSchema ]))

export const fetchLatestSongs = createAction('fetch latest songs', () => ({ loading: true }))
export const fetchLatestSongsSuccess =  createAction('fetch latest songs success', data => normalize(data, [ songSchema ]))

export const fetchFollowedSongs = createAction('fetch followed songs', (artistId) => ({ loading: true }))
export const fetchFollowedSongsSuccess =  createAction('fetch followed songs success', data => normalize(data, [ songSchema ]))

export const fetchSongDetail = createAction(id => ({ loading: true, id }))
export const fetchSongDetailSuccess = createAction(data => normalize(data, songSchema))

export const fetchPopularSongsByTag = createAction('fetch popular songs by tag', tagId => ({ loading: true, tagId }))
export const fetchPopularSongsByTagSuccess =  createAction('fetch popular songs by tag success', data => normalize(data, [ songSchema ]))

export const addFilterTag = createAction('add filter tag', data => normalize(data,  tagSchema))
export const removeFilterTag = createAction('remove filter tag', data => normalize(data,  tagSchema))
export const addSelectedFilterTag = createAction('add selected filter tag', data => normalize(data,  tagSchema))
export const removeSelectedFilterTag = createAction('remove selected filter tag', data => normalize(data,  tagSchema))

export const changeDurationHours = createAction('Change duration hours', durationHours => ({ durationHours }))
export const changeFilterBy = createAction('Change filter by', filterBy => ({ filterBy }))
export const changeVocalist = createAction('Change vocalist', vocalist => ({ vocalist }))
export const updateRankingResult = createAction('Update ranking result',  data => normalize(data, [ songSchema ]))