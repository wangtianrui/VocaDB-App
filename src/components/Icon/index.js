import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import IconVector from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

class Icon extends React.Component {

    render () {
        const size = {
            small: 16,
            medium: 24,
            large: 32,
            xlarge: 64
        }

        const renderIcon = () =>
            (
                <View>
                    <IconVector name={this.props.name} size={size[this.props.size]} color={this.props.color} style={style.icon}  />
                    {this.props.text && <Text style={[style.label, { color: this.props.color }]}>{this.props.text}</Text>}
                </View>
            )

        if(this.props.pureIcon) {
            return renderIcon()
        } else {
            return (
                <TouchableOpacity style={style.container} onPress={this.props.onPress}>
                    {renderIcon()}
                </TouchableOpacity>
            )
        }

    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        textAlign: 'center',
        margin: 8
    },
    label: {
        fontSize: 12
    }
})

Icon.propTypes = {
    name: PropTypes.string,
    text: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    color: PropTypes.string,
    onPress: PropTypes.func,
    pureIcon: PropTypes.bool
}

Icon.defaultProps = {
    pureIcon: false,
    size: 'large',
    color: '#546E7A',
    onPress: () => console.log('No action')
}


export default Icon