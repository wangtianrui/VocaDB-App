import React from 'react'
import { View, Text } from 'react-native'
import Content from '../../../components/Content'
import PropTypes from 'prop-types'
import Theme from '../../../theme'
import { Dropdown } from 'react-native-material-dropdown';
import { Button } from 'react-native-material-ui';
import ArtistSelectModal from './../../artist/ArtistSelectModal'
import TagSelectModal from './../../tag/TagSelectModal'
import ArtistRow from './../../artist/ArtistRow'
import Tag from './../../tag/Tag'
import { topTags } from './../../tag/tagConstant'
import { songTypeItems } from './../songConstant'
import { entryStatusItems, sortItems } from './../../entry/entryConstant'
import { TextField } from 'react-native-material-textfield';

class SongFilter extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            showArtistModal: false,
            showTagModal: false
        }
    }

    renderInputSongType () {
        return (
            <View style={{ marginHorizontal: 8 }}>
                <Dropdown
                    label='Song type'
                    value={this.props.params.songTypes}
                    onChangeText={text => {
                        if(text === 'Unspecified') {
                            this.props.onFilterChanged({ songTypes: '' })
                        } else {
                            this.props.onFilterChanged({ songTypes: text })
                        }

                    }}
                    data={songTypeItems}
                />
            </View>
        )
    }

    renderInputArtists () {
        return (
            <View>
                <Text style={[Theme.subhead, { marginHorizontal: 8 }]}>Artist</Text>
                <View>
                    {this.props.filterArtists.map(a =>
                        <ArtistRow
                            key={a.id}
                            id={a.id}
                            image={a.image}
                            name={a.name}
                            rightIcon='ios-close'
                            onRightElementPress={() => this.props.onFilterChanged({ artistId: [ a.id ] }, true)} />)}
                </View>
                <Button
                    raised
                    primary
                    style={{ container: { marginHorizontal: 16, marginVertical: 8 } }}
                    text='Select artist'
                    onPress={() => { this.setState({ showArtistModal: true }) }} />

                <ArtistSelectModal
                    modalVisible={this.state.showArtistModal}
                    onBackPress={() => {
                        this.setState({ showArtistModal: false })
                    }}
                    onPressItem={artist => {
                        this.setState({ showArtistModal: false })
                        this.props.onFilterChanged({ artistId: [ artist.id ] })
                    }} />
            </View>
        )
    }

    renderInputTags () {
        return (
            <View>
                <Text style={[Theme.subhead, { marginHorizontal: 8 }]}>Tags</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    {this.props.filterTags.map(t => {
                        return <Tag
                            key={t.id}
                            name={t.name}
                            style={{ margin: 4 }}
                            selected={t.selected}
                            onPress={() => {
                                if(t.selected) {
                                    this.props.onDeselectFilterTag(t)
                                } else {
                                    this.props.onSelectFilterTag(t)
                                }

                            }} />
                    })}
                </View>
                <Button
                    raised
                    primary
                    style={{ container: { marginHorizontal: 16, marginVertical: 8 } }}
                    text='Select tag'
                    onPress={() => { this.setState({ showTagModal: true }) }} />
                <TagSelectModal
                    modalVisible={this.state.showTagModal}
                    onBackPress={() => {
                        this.setState({ showTagModal: false })
                    }}
                    onPressItem={tag => {
                        this.setState({ showTagModal: false })
                        this.props.onAddFilterTag(tag)
                        this.props.onSelectFilterTag(tag)
                    }} />
            </View>
        )
    }

    renderInputStatus () {
        return (
            <View style={{ marginHorizontal: 8 }}>
                <Dropdown
                    label='Status'
                    value={this.props.params.status}
                    onChangeText={text => {
                        this.props.onFilterChanged({ status: text })
                    }}
                    data={entryStatusItems}
                />
            </View>
        )
    }

    renderInputMinScore () {
        return (
            <View style={{ marginHorizontal: 8 }}>
                <TextField
                    label='Minimum score'
                    keyboardType='numeric'
                    value={this.props.params.minScore}
                    maxLength={5}
                    onChangeText={minScore => {
                        this.props.onFilterChanged({ minScore: minScore })
                    }}
                />
            </View>
        )
    }

    renderInputSort () {
        return (
            <View style={{ marginHorizontal: 8 }}>
                <Dropdown
                    label='Sort'
                    value={this.props.params.sort}
                    onChangeText={text => {
                        this.props.onFilterChanged({ sort: text })
                    }}
                    data={sortItems}
                />
            </View>
        )
    }

    render () {
        return (
                <Content>
                    {this.renderInputSongType()}
                    {this.renderInputMinScore()}
                    {this.renderInputSort()}
                    {this.renderInputArtists()}
                    {this.renderInputTags()}
                </Content>
        )
    }
}

SongFilter.propTypes = {
    onPressSave: PropTypes.func,
    onPressBack: PropTypes.func
}

export default SongFilter;