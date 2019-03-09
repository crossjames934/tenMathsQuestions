import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

import styles from './styles';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numX: 0,
            numY: 0,
            numZ: 0,
            operation: "",
            answered: false,
            message: "",
            answer: "",
            score: 0,
            numberOfAnswered: 0,
            finished: false
        };
        this.generateQuestion = this.generateQuestion.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
    }

    componentDidMount() {
        this.generateQuestion();
    }

    generateQuestion() {
        if (this.state.numberOfAnswered >= 10) {
            return this.setState({finished: true})
        }
        const random = limit => Math.ceil(Math.random() * limit);
        const operations = ["+", "-", "x", "÷"];
        const operation = operations[random(4) - 1];
        let numX, numY, numZ;
        if (operation === "+" || operation === "-") {
            numX = random(100);
            numY = random(100);
            numZ = numX + numY;
        } else {
            numX = random(12);
            numY = random(12);
            numZ = numX * numY;
        }
        this.setState({
            numX: numX,
            numY: numY,
            numZ: numZ,
            operation: operation,
            answered: false,
            answer: "",
            numberOfAnswered: this.state.numberOfAnswered + 1
        });
    }

    displayQuestion() {
        let numbersOrdered = [this.state.numX];
        if (this.state.operation === "+" || this.state.operation === "x") {
            numbersOrdered.unshift(this.state.numY);
        } else {
            numbersOrdered.unshift(this.state.numZ);
        }
        return(
            <Text style={styles.question}>{numbersOrdered[0]} {this.state.operation} {numbersOrdered[1]} = ?</Text>
        );
    }

    submitAnswer() {
        const prepareNextQuestion = () => {
            setTimeout(this.generateQuestion, 1500);
        };
        if (
            ((this.state.operation === "+" || this.state.operation === "x") && this.state.answer === String(this.state.numZ)) ||
            ((this.state.operation === "-" || this.state.operation === "÷") && this.state.answer === String(this.state.numY))
        ) {
            this.setState({message: "Correct!", answered: true, score: this.state.score+1}, prepareNextQuestion);
        } else {
            this.setState({message: "Incorrect!", answered: true}, prepareNextQuestion);
        }
    }

    contents() {
        if (this.state.finished) {
            return(
                <View>
                    <Text style={styles.title}>All Done!</Text>
                    <Button onPress={this.props.buttonFn} title="Back To Menu"/>
                </View>
            );
        } else if (this.state.answered) {
            return(
                <View>
                    <Text style={this.state.message === "Correct!" ? styles.green : styles.red}>{this.state.message}</Text>
                </View>
            );
        } else {
            return(
                <View>
                    {this.displayQuestion()}
                    <TextInput
                        onChangeText={(answer) => this.setState({answer})}
                        placeholder="Type answer here"
                    />
                    <Button onPress={this.submitAnswer} title="Submit Answer"/>
                </View>
            );
        }
    }

    render() {
        return(
            <View>
                {this.contents()}
                <Text>Score: {this.state.score}</Text>
            </View>
        );
    }
}

export default Game;