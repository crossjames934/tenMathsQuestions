import React from 'react';
import { StyleSheet, Text, Button, TextInput, View } from 'react-native';

import styles from './styles';

class MainMenu extends React.Component {
    render() {
        return(
            <View>
                <Text style={styles.title}>Ten Maths Questions</Text>
                <Button style={styles.btn} onPress={this.props.buttonFn} title="BEGIN!"/>
            </View>
        );
    }
}

export default MainMenu;