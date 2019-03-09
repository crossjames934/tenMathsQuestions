import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import styles from './styles';
import MainMenu from './MainMenu';
import Game from './Game';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameActive: false
        };
        this.toggleGameActive = this.toggleGameActive.bind(this);
    }

    toggleGameActive() {
        this.setState({gameActive: !this.state.gameActive});
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.gameActive ? (
                    <Game buttonFn={this.toggleGameActive}/>
                ) : (
                    <MainMenu buttonFn={this.toggleGameActive}/>
                )}
            </View>
        );
    }
}

export default App;