import React from 'react'
import { connect } from 'react-redux'
import AlbumDetail from './AlbumDetail'
import { createSelector } from 'reselect';
import { Share, Linking } from 'react-native'
import { selectAlbumDetail, selectIsFavoriteAlbum } from '../albumSelector'
import * as albumActions from '../albumActions'
import Routes from './../../../app/appRoutes'
import { albumDetailUrl } from './../../../common/constants/config'

AlbumDetail.navigationOptions = ({ navigation }) => {

    const { params } = navigation.state;

    const navOptions = {
        title: (params && params.title) ? params.title : 'Detail',
    }

    if(params.hideHeader) {
        navOptions.header = null
    }

    return navOptions
}

AlbumDetail.propTypes = {

}

const albumDetailStateSelect = createSelector(
    selectAlbumDetail(),
    selectIsFavoriteAlbum(),
    (album, isFavoriteAlbum) => ({ album, isFavoriteAlbum })
);

const mapDispatchToProps = (dispatch, props) => ({
    fetchAlbum: id => dispatch(albumActions.fetchAlbumDetail(id)),
    onPressAddFavorite: album => {
        dispatch(albumActions.addFavoriteAlbum(album))
    },
    onPressRemoveFavorite: album => {
        dispatch(albumActions.removeFavoriteAlbum(album))
    },
    onPressShare: album => {
        const url = 'https://vocadb.net/Al/' + album.id
        Share.share({
            message: url,
            url: url,
            title: album.name,
        },{
            dialogTitle: 'Share ' + album.name,
        })
    },
    onPressToVocaDB: album => {
        if(!album || !album.id) {
            return;
        }
        Linking.openURL(albumDetailUrl(album.id)).catch(err => console.error('An error occurred', err))
    },
    onPressTrack: track => props.navigation.navigate(Routes.SongDetail, { id: track.song.id, title: track.song.name }),
    onPressArtist: artist => props.navigation.navigate(Routes.ArtistDetail, { id: artist.id, title: artist.name }),
    onPressTag: tag => props.navigation.navigate(Routes.TagDetail, { id: tag.id, title: tag.name }),
})

export default connect(albumDetailStateSelect, mapDispatchToProps)(AlbumDetail)