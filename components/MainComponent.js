import React, { Component } from 'react';
import { View, Platform, Image, StyleSheet, ScrollView, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders, postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
});


const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        }) },
    DishDetail: { screen: DishDetail }
}, {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:"#03A9F4"
        },
        headerTintColor:"#fff",
        headerTitleColor:{
            color:"#fff"
        }
    }
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle:{
            backgroundColor:"#03A9F4"
        },
        headerTintColor:"#fff",
        headerTitleColor:{
            color:"#fff"
        },
        headerLeft: () => <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
    })
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle:{
            backgroundColor:"#03A9F4"
        },
        headerTintColor:"#fff",
        headerTitleColor:{
            color:"#fff"
        },
        headerLeft: () => <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
    })
});

const AboutNavigator = createStackNavigator({
    About: { screen: About }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle:{
            backgroundColor:"#03A9F4"
        },
        headerTintColor:"#fff",
        headerTitleColor:{
            color:"#fff"
        },
        headerLeft: () => <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
    })
});

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle:{
            backgroundColor:"#03A9F4"
        },
        headerTintColor:"#fff",
        headerTitleColor:{
            color:"#fff"
        },
        headerLeft: () => <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
    })
});

const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle:{
            backgroundColor:"#03A9F4"
        },
        headerTintColor:"#fff",
        headerTitleColor:{
            color:"#fff"
        },
        headerLeft: () => <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
    })
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={StyleSheet.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Confusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home ',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    About: { 
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us  ',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )

        }
    },
    Menu: { 
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu ',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Contact: { 
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us ',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            )
        }
    },
    Favorites: { 
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites  ',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='heart'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            )
        }
    },
    Reservation: { 
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table  ',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='cutlery'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            )
        }
    }
}, {
    drawerBackgroundColor: '#B3E5FC',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent
});

const App = createAppContainer(MainNavigator);


class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        return(
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <App />
                <StatusBar backgroundColor='#03A9F4' style='inverted'/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#03A9F4',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Main);