import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { baseUrl } from '../shared/baseUrl';

class LoginTab extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true});
                }
            });
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{color: tintColor}} />
        )
    };

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })).catch((error) => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Input 
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    inputContainerStyle={styles.formInput} />
                <Input 
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    inputContainerStyle={styles.formInput} />
                <CheckBox
                    title='Remember me'
                    checked={this.state.remember}
                    center
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox} />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        icon={<Icon name='sign-in' type='font-awesome' size={24} color='white' />}
                        buttonStyle={{backgroundColor: '#FFC107'}} />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('RegisterTab')}
                        title='Register'
                        icon={<Icon name='user-plus' type='font-awesome' size={24} color='white' />}
                        buttonStyle={{backgroundColor: '#0288D1'}} />
                </View>
            </View>
        );
    }

}    

class RegisterTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const cameraRollPermission = await ImagePicker.requestCameraRollPermissionsAsync();

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if (!capturedImage.cancelled) {
                this.processImage(capturedImage.uri);
            }
        }
    }

    getImageFromGallery = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const cameraRollPermission = await ImagePicker.requestCameraRollPermissionsAsync();

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if (!capturedImage.cancelled) {
                this.processImage(capturedImage.uri);
            }
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(imageUri, 
            [
                { resize: {width: 400} }
            ], 
            { format: 'png'}
        );
        this.setState({imageUrl: processedImage.uri})
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                iconStyle={{color: tintColor}} />
        )
    };

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })).catch((error) => console.log('Could not save user info', error));
        }
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image} />
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera} />
                        <Button
                            title='Gallery'
                            onPress={this.getImageFromGallery} />
                    </View>
                    <Input 
                        placeholder='Username'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        inputContainerStyle={styles.formInput} />
                    <Input 
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        inputContainerStyle={styles.formInput} />
                    <Input 
                        placeholder='First name'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(firstname) => this.setState({firstname})}
                        value={this.state.firstname}
                        inputContainerStyle={styles.formInput} />
                    <Input 
                        placeholder='Last name'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(lastname) => this.setState({lastname})}
                        value={this.state.lastname}
                        inputContainerStyle={styles.formInput} />
                    <Input 
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        inputContainerStyle={styles.formInput} />
                    <CheckBox
                        title='Remember me'
                        checked={this.state.remember}
                        center
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckbox} />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={<Icon name='user-plus' type='font-awesome' size={24} color='white' />}
                            buttonStyle={{backgroundColor: '#FFC107'}} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    RegisterTab: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: '#0288D1',
        inactiveBackgroundColor: '#B3E5FC',
        activeTintColor: 'white',
        inactiveTintColor: 'gray'
    }
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image : {
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        marginTop: 40
    },
    formCheckbox: {
        marginTop: 20,
        backgroundColor: null
    },
    formButton: {
        marginTop: 40
    }
});

export default Login;