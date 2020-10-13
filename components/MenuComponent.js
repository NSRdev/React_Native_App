import React, { Component } from 'react';
import { FlatList} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import DISHES from '../shared/dishes';


class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Menu'
    };

    render() {
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {
            return(
                <ListItem
                    key={index} 
                    onPress={() => navigate('DishDetail', { dishId: item.id })}>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <Avatar rounded source={require('./images/uthappizza.png') } />
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        }
        

        return(
            <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Menu;