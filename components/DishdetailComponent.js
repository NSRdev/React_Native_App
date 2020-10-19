import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {
    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    function recognizeDrag({ moveX, moveY, dx, dy }) {
        if (dx < -200) {
            return true;
        } else {
            return false;
        }
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => { this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled')); },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to favorite?',
                    'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                    [
                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: 'Confirm', onPress: () => { props.favorite ? console.log('Already favorite') : props.onPress() } },
                    ],
                    { cancelable: false }
                );

            return true;
        }
    })

    if (dish != null) {
        return(
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}
                {...panResponder.panHandlers}
                ref={this.handleViewRef} >
                <Card>
                    <Card.FeaturedTitle style={{color: '#000'}}>{dish.name}</Card.FeaturedTitle>
                    <Card.Image source={{ uri: baseUrl + dish.image }} />
                    <Text style={{ margin: 10 }}>{dish.description}</Text>
                    <View style={styles.buttonsRow}>
                        <Icon raised reverse
                            name={ props.favorite ? 'heart' : 'heart-o'} 
                            type='font-awesome' 
                            color='#E91E63' 
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress() }/>
                        <Icon raised reverse
                            name='pencil' 
                            type='font-awesome' 
                            color='#0288D1' 
                            onPress={() => props.onPencilPress()}/>
                    </View>
                </Card>
            </Animatable.View>
        );
    } else {
        return(<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()} />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state={
            showModal: false,
            author: '',
            comment: '',
            rating: 0
        };
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleComment(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');

        return(
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId] } 
                    favorite={this.props.favorites.some(el => el === dishId)} 
                    onPress={() => this.markFavorite(dishId)}
                    onPencilPress={() => this.toggleModal()} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal()}}
                    onRequestClose={() => {this.toggleModal()}} >
                    <View style={styles.modal}>
                        <Rating 
                            type='star'
                            onFinishRating={(value) => {this.setState({ rating: value })}}
                            ratingCount={5}
                            showRating />
                        <Input
                            placeholder='Author'
                            value={this.state.author}
                            onChange={(value) => this.setState({ author: value })}
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }} />
                        <Input
                            placeholder='Comment'
                            value={this.state.comment}
                            onChange={(value) => this.setState({ comment: value })}
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }} />
                        <View  style={styles.buttonsModal}>
                            <Button
                                onPress={() => {this.handleComment(dishId)}}
                                color='#03A9F4'
                                title='Submit' />
                        </View>
                        <View  style={styles.buttonsModal}>
                            <Button
                                onPress={() => {this.toggleModal()}}
                                color='#607D8B'
                                title='Close' />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    buttonsRow: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    buttonsModal: {
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);