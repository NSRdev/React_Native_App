import React, { Component } from 'react';
import { Avatar, Card, ListItem } from 'react-native-elements';
import { Text, FlatList, View } from 'react-native';
import { LEADERS } from '../shared/leaders';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

function History() {
    return(
        <Card title='Our History'>
            <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. 
                With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list 
                clientele in Hong Kong. Featuring four of the best three-star Michelin chefs in the world, you never know what will 
                arrive on your plate the next time you visit us.</Text>
            <Text></Text>
            <Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, 
                that featured for the first time the world's best cuisines in a pan.</Text>
        </Card>
    );
}

function Leaders(props) {
    const renderLeaderItem = ({item, index}) => {
        return(
            <ListItem key={index} leftAvatar={{ source:require('./images/alberto.png') }}>
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight: 'bold'}}>{item.name}</ListItem.Title>
                    <Text>{item.description}</Text>
                </ListItem.Content>
            </ListItem>
        );
    }

    return(
        <Card title='Coorporate Leadership'>
            <FlatList 
                data={props.leaders}
                renderItem={renderLeaderItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class About extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            leaders: LEADERS
        };
    }

    static navigationOptions = {
        title: 'About Us'
    };

    render() {
        return(
            <ScrollView>
                <History />
                <Leaders leaders={this.state.leaders} />
            </ScrollView>
        );
    }
}

export default About;