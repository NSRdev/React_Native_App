import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

class Reservation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date()
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date()
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#03A9F4'
            }
        });
    }

    handleReservation() {
        Alert.alert(
            'Confirm reservation?',
            'Number of guests: ' + this.state.guests + 
                '\nSmoking: ' + this.state.smoking +
                '\nDate and time: ' + this.state.date,
            [
                { text: 'Cancel', onPress: () => this.resetForm() },
                { text: 'Confirm', 
                    onPress: () => { 
                        this.resetForm(); 
                        this.presentLocalNotification(this.state.date);
                    } 
                },
            ],
            { cancelable: false }
        );
    }

    render() {
        return(
            <ScrollView>
                <Animatable.View animation='zoomIn' duration={2000} >
                    <View style={styles.formRow} >
                        <Text style={styles.formLabel}>Number of guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests} 
                            onValueChange={(itemValue) => this.setState({ guests: itemValue })} >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>

                    <View style={styles.formRow} >
                        <Text style={styles.formLabel}>Smoking</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor='#03A9F4'
                            onValueChange={(value) => this.setState({ smoking: value })} />
                    </View>

                    <View style={styles.formRow} >
                        <Text style={styles.formLabel}>Date and time</Text>
                        <DatePicker
                            style={{flex: 2, marginRight: 20}}
                            date={this.state.date}
                            mode="datetime"
                            placeholder="select date and Time"
                            minDate="2017-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                    </View>

                    <View style={styles.formRow} >
                            <Button
                                title='Reserve'
                                color='#03A9F4'
                                onPress={() => this.handleReservation()} />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1
    },
    datePicker: {
        flex: 2,
        marginRight: 20
    }
});

export default Reservation;