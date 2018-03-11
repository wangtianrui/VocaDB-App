import React from 'react'
import { connect } from 'react-redux'
import AlbumDetail from './AlbumDetail'
import { createSelector } from 'reselect';
import { Share } from 'react-native'
import { selectAlbumDetail } from '../albumSelector'
import { fetchAlbumDetail } from '../albumActions'
import { Page } from './../../../AppNavigator'

AlbumDetail.navigationOptions = () => ({
    title: 'Album',
})

AlbumDetail.propTypes = {

}

const albumDetailStateSelect = createSelector(
    selectAlbumDetail(),
    (album) => ({ album })
);

const mapDispatchToProps = (dispatch, props) => ({
    fetchAlbum: id => dispatch(fetchAlbumDetail(id)),
    onPressShare: album => {
        const url = 'http://vocadb.net/Al/' + album.id
        Share.share({
            message: url,
            url: url,
            title: album.name,
        },{
            dialogTitle: 'Share ' + album.name,
        })
    },
    onPressTrack: track => props.navigation.navigate(Page.SongDetail, { id: track.song.id }),
    onPressArtist: artist => props.navigation.navigate(Page.ArtistDetail, { id: artist.id }),
    onPressTag: tag => props.navigation.navigate(Page.TagDetail, { id: tag.id, title: tag.name }),
})

export default connect(albumDetailStateSelect, mapDispatchToProps)(AlbumDetail)