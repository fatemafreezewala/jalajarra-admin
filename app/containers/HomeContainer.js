/* eslint-disable radix */
/* eslint-disable no-return-assign */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Linking, RefreshControl, TouchableOpacity, Text } from 'react-native';
import { EDColors } from '../utils/EDColors';
import { connect } from 'react-redux';
import BaseContainer from './BaseContainer';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { EDFonts } from '../utils/EDFontConstants';
import { strings } from '../locales/i18n'
import EDOrdersFlatList from '../components/EDOrdersFlatList'
import EDPlaceholderComponent from '../components/EDPlaceholderComponent'
import Metrics from '../utils/metrics'
import { saveNavigationSelection } from '../redux/actions/Navigation';
import NavigationEvents from '../components/NavigationEvents';
import { checkFirebasePermission } from '../utils/FirebaseServices';
import { saveUserFCMInRedux } from '../redux/actions/UserActions';
import { netStatus } from '../utils/NetworkStatusConnection';
import { changeTOKEN, getOrderDetail, acceptNRejectOrderAPI } from '../utils/ServiceManager';
import { showNoInternetAlert, showTopDialogue } from '../utils/EDAlert';
import EDPopupView from '../components/EDPopupView'
import CancelReasonsList from "../components/CancelReasonsList";
import { debugLog, isRTLCheck, PAGE_COUNT, RESPONSE_SUCCESS } from '../utils/EDConstants';
import EDTopTabBar from '../components/EDTopTabBar';
import Context from '../../Context';

class HomeContainer extends React.PureComponent {
    //#region LIFE CYCLE METHODS

    static contextType = Context
    /** CONSTRUCTOR */
    constructor(props) {
        super(props);

        this.scrollViewOrders = null;
        this.strNewOrdersTitle = '';
        this.strNewOrdersSubtitle = '';
        this.strInProgressOrdersTitle = '';
        this.strInProgressOrdersSubtitle = '';
        this.arrayNewOrders = undefined;
        this.arrayInProgressOrders = undefined;
        this.refreshing = false
        this.shouldLoadMoreNew = false;
        this.shouldLoadMoreInProgress = false;


    }

    componentDidMount() {
        this.isRefresh = this.context.isRefresh
    }

    componentDidUpdate = newProps => {
        if (this.isRefresh !== this.context.isRefresh) {
            console.log("CALLED FROM RECIEVE PROPS :: :: ", this.context.isRefresh)
            this.isRefresh = this.context.isRefresh
            this.strNewOrdersTitle = '';
            this.strNewOrdersSubtitle = '';
            this.refreshing = false
            this.arrayNewOrders = []
            this.strInProgressOrdersTitle = '';
            this.strInProgressOrdersSubtitle = '';
            this.arrayInProgressOrders = []
            this.callNewOrderAPI()
            this.callInProgressOrderAPI()
        }
        // }
    }

    onChangeTokenSuccess = (objSuccess) => {
    }
    onChangeTokenFailure = (objFailure) => {
    };

    /**
        *
        * @param {The call API for get Change user token}
        */
    changeUserToken = () => {
        netStatus(isConnected => {
            if (isConnected) {
                let objChangeTokenParams = {
                    token: this.props.userDetails.PhoneNumber,
                    language_slug: this.props.lan,
                    user_id: this.props.userDetails.UserID,
                    firebase_token: this.props.token
                };
                changeTOKEN(
                    objChangeTokenParams,
                    this.onChangeTokenSuccess,
                    this.onChangeTokenFailure,
                    this.props,
                )
            }
        })
    }
    /** NETWORK API FOR ORDERS */
    callNewOrderAPI = (isForRefresh = false) => {
        this.strNewOrdersTitle = '';
        this.strNewOrdersSubtitle = '';
        if (this.arrayNewOrders === undefined) {
            this.arrayNewOrders = [];
        }
        // this.setState({ isLoading: true });

        netStatus(isConnectedToNetwork => {
            if (isConnectedToNetwork) {
                let params = {
                    token: this.props.userDetails.PhoneNumber,
                    user_id: this.props.userDetails.UserID,
                    tabType: "new",
                    count: PAGE_COUNT,
                    language_slug: this.props.lan,
                    page_no: (this.arrayNewOrders && !isForRefresh) ? parseInt(this.arrayNewOrders.length / PAGE_COUNT) + 1 : 1,

                };
                if (!isForRefresh) {
                    this.setState({ isMoreLoading: this.arrayNewOrders !== undefined && this.arrayNewOrders.length >= PAGE_COUNT ? true : false, isLoading: this.arrayNewOrders === undefined || this.arrayNewOrders.length === 0 });
                }
                getOrderDetail(params, this.onGetNewOrderSuccess, this.onGetNewOrderFailure, this.props)
            } else {
                this.arrayNewOrders = [];
                this.strNewOrdersTitle = strings('generalNoInternet');
                this.strNewOrdersSubtitle = strings('generalNoInternetMessage');

                this.setState({ isLoading: false, isMoreLoading: false })
            }
        })
    };

    /** NETWORK API FOR ORDERS */
    callInProgressOrderAPI = (isForRefresh = false) => {
        this.strInProgressOrdersTitle = '';
        this.strInProgressOrdersSubtitle = '';
        if (this.arrayInProgressOrders === undefined) {
            this.arrayInProgressOrders = [];
        }

        netStatus(isConnectedToNetwork => {
            if (isConnectedToNetwork) {
                let params = {
                    language_slug: this.props.lan,
                    tabType: "inProgress",
                    user_id: this.props.userDetails.UserID,
                    count: PAGE_COUNT,
                    token: this.props.userDetails.PhoneNumber,
                    // page_no: 2
                    page_no: (this.arrayInProgressOrders && !isForRefresh) ? parseInt(this.arrayInProgressOrders.length / PAGE_COUNT) + 1 : 1,
                };
                if (!isForRefresh) {
                    this.setState({ isMoreinProgressLoading: this.arrayInProgressOrders !== undefined && this.arrayInProgressOrders.length >= PAGE_COUNT ? true : false, isLoadingInProgressOrders: this.arrayInProgressOrders === undefined || this.arrayInProgressOrders.length === 0 });
                }
                console.log("PARAMS :: :: ", params)
                getOrderDetail(params, this.onGeInProgressOrderSuccess, this.onGetInProgressOrderFailure, this.props)
            } else {
                this.arrayInProgressOrders = [];
                this.strInProgressOrdersSubtitle = strings('generalNoInternetMessage');
                this.strInProgressOrdersTitle = strings('generalNoInternet');
                this.setState({ isLoadingInProgressOrders: false, isMoreinProgressLoading: false })
            }
        })
    };

    /**
   * @param {The success response object} objSuccess
   */
    onGetNewOrderSuccess = objSuccess => {
        this.strNewOrdersTitle = strings('generalNoNewOrders');
        this.strNewOrdersSubtitle = strings('generalNoNewOrdersSubtitle');

        if (this.arrayNewOrders === undefined) {
            this.arrayNewOrders = []
        }

        // New ORDERS ARRAY
        if (objSuccess.data.orders !== undefined && objSuccess.data.orders.length > 0) {
            let arrNewOrder = objSuccess.data.orders || []
            let totalRecordCount = objSuccess.data.total_order_count || 0
            this.shouldLoadMoreNew = this.arrayNewOrders.length + arrNewOrder.length < totalRecordCount
            this.arrayNewOrders = [...this.arrayNewOrders, ...arrNewOrder];
            this.forceUpdate();
        }

        this.setState({ isLoading: false, isMoreLoading: false });
    };

    /**
     * @param {The failure response object} objFailure
     */
    onGetNewOrderFailure = objFailure => {
        this.strNewOrdersTitle = objFailure.message
        this.strNewOrdersSubtitle = ''
        this.setState({ isLoading: false, isMoreLoading: false });
    };


    /**
    * @param {The success response object} objSuccess
    */
    onGeInProgressOrderSuccess = objSuccess => {
        this.strInProgressOrdersTitle = strings('generalNoInProgressOrders');
        this.strInProgressOrdersSubtitle = strings('generalNoNewOrdersSubtitle');

        if (this.arrayInProgressOrders === undefined) {
            this.arrayInProgressOrders = []
        }

        // InProgress ORDERS ARRAY
        if (objSuccess.data.orders !== undefined && objSuccess.data.orders.length > 0) {
            let arrInProgressOrder = objSuccess.data.orders || []
            let totalRecordCount = objSuccess.data.total_order_count || 0
            this.shouldLoadMoreInProgress = this.arrayInProgressOrders.length + arrInProgressOrder.length < totalRecordCount
            this.arrayInProgressOrders = [...this.arrayInProgressOrders, ...arrInProgressOrder];
            this.forceUpdate();
        }

        this.setState({ isLoadingInProgressOrders: false, isMoreinProgressLoading: false });
    };

    /**
     * @param {The failure response object} objFailure
     */
    onGetInProgressOrderFailure = objFailure => {
        debugLog("TEST ::::::", objFailure)
        this.strInProgressOrdersTitle = objFailure.message
        this.strInProgressOrdersSubtitle = ''
        this.setState({ isLoadingInProgressOrders: false, isMoreinProgressLoading: false });
    };


    //On did focus home

    onDidFocusHomeContainer = () => {
        console.log("CALLED FROM DID FOCUS :: :: ")
        this.props.saveNavigationSelection(strings('homeTitle'))

        this.isRefresh = this.context.isRefresh

        this.setState({ selectedIndex: 0 })
        if (this.scrollViewOrders !== undefined && this.scrollViewOrders !== null)
            this.scrollViewOrders.scrollTo({ x: 0, y: 0, animated: true })
        this.arrayNewOrders = undefined
        this.callNewOrderAPI()

        this.arrayInProgressOrders = undefined
        this.callInProgressOrderAPI()
        if (this.props.isLoggedIn && (this.props.token === undefined || this.props.token === null || this.props.token === "")) {
            checkFirebasePermission(onSuccess => {
                this.props.saveToken(onSuccess)
                this.changeUserToken()
            }, (error) => {
            })
        } else if (this.props.isLoggedIn) {
            this.changeUserToken()
        }
    }


    /** LOAD MORE EVENT */
    onLoadMoreNewHandler = () => {
        console.log("ON LOAD MORE NEW ORDERS CALLED ::  :: ")
        if (this.shouldLoadMoreNew && !this.state.isLoading && !this.state.isMoreLoading)
            this.callNewOrderAPI()
    }
    onLoadMoreInProgressHandler = () => {
        console.log("onLoadMore :: :: ", this.shouldLoadMoreInProgress, this.state.isLoadingInProgressOrders, this.state.isMoreinProgressLoading)
        if (this.shouldLoadMoreInProgress && !this.state.isLoadingInProgressOrders && !this.state.isMoreinProgressLoading) {
            this.callInProgressOrderAPI();
        }
    }
    onPullToRefreshNewOrderHandler = () => {
        this.strNewOrdersTitle = '';
        this.strNewOrdersSubtitle = '';
        this.refreshing = false
        this.arrayNewOrders = []
        this.callNewOrderAPI()
    }

    onPullToRefreshInProgressOrderHandler = () => {
        console.log("CALLED FROM PULL TO REFRESH :: :: ")
        this.strInProgressOrdersTitle = '';
        this.strInProgressOrdersSubtitle = '';
        this.refreshing = false
        this.arrayInProgressOrders = []
        this.callInProgressOrderAPI()
    }
    /** RENDER */
    render() {
        // console.log("THIS.CONTEXT::::::::::::: ", this.context)
        return (
            <BaseContainer
                title={strings('homeTitle')}
                left={'menu'}
                onLeft={this.buttonMenuPressed}
                loading={this.state.isLoading || this.state.isLoadingInProgressOrders}
                connection={this.onConnectionChangeHandler}
            >
                <NavigationEvents onFocus={this.onDidFocusHomeContainer} navigationProps={this.props} />
                {/* PARENT VIEW */}
                <View style={styles.mainViewStyle}>

                    {/* SAFE AREA VIEW */}
                    <SafeAreaView style={styles.mainViewStyle}>

                        {/* CANCEL REASON POPUP */}
                        {this.renderCancelReasonPopUp()}

                        {/* {this.componentWillReceiveProps()} */}
                        <EDTopTabBar
                            data={[{ title: strings('generalNewOrder'), onPress: this.onSegmentIndexChangeHandler, index: 0 },
                            { title: strings('generalInProgress'), onPress: this.onSegmentIndexChangeHandler, index: 1 }]}
                            selectedIndex={this.state.selectedIndex}
                        />

                        {/* HORIZONTAL SCROLL FOR ORDERS TAB */}
                        <ScrollView scrollEnabled={false} ref={scrollView => this.scrollViewOrders = scrollView}
                            bounces={false} pagingEnabled={true} horizontal={true} showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexDirection: "row"
                            }}
                        >
                            {this.arrayNewOrders !== undefined && this.arrayNewOrders.length > 0
                                ? <EDOrdersFlatList style={[styles.orderFlatListStyle]}
                                    arrayOrders={this.arrayNewOrders}
                                    onPhoneNumberPressed={this.onPhoneNumberPressed}
                                    onOrderViewPressed={this.onOrderViewPressed}
                                    onOrderAcceptPressed={this.onOrderAcceptPressed}
                                    onOrderRejectPressed={this.onOrderRejectPressed}
                                    onEndReached={this.onLoadMoreNewHandler}
                                    isMoreLoading={this.state.isMoreLoading}
                                    onPullToRefreshHandler={this.onPullToRefreshNewOrderHandler}
                                />

                                : this.strNewOrdersTitle !== '' ?
                                    <View style={styles.parentScrollViewStyle}>
                                        <ScrollView
                                            contentContainerStyle={styles.scrollViewStyle}
                                            refreshControl={
                                                <RefreshControl
                                                    refreshing={this.refreshing || false}
                                                    title={strings("generalFetchingNew")}
                                                    titleColor={EDColors.textAccount}
                                                    tintColor={EDColors.textAccount}
                                                    colors={[EDColors.textAccount]}
                                                    onRefresh={this.onPullToRefreshNewOrderHandler}
                                                />
                                            }
                                        >
                                            <EDPlaceholderComponent title={this.strNewOrdersTitle} subTitle={this.strNewOrdersSubtitle} />
                                        </ScrollView>
                                    </View>
                                    : <View style={{ width: Metrics.screenWidth }} />}
                            {this.arrayInProgressOrders !== undefined && this.arrayInProgressOrders.length > 0
                                ? <EDOrdersFlatList style={[styles.orderFlatListStyle]}
                                    arrayOrders={this.arrayInProgressOrders}
                                    onPhoneNumberPressed={this.onPhoneNumberPressed}
                                    onOrderViewPressed={this.onOrderInProgressViewPressed}
                                    onOrderAcceptPressed={this.onOrderAcceptPressed}
                                    onOrderRejectPressed={this.onOrderRejectPressed}
                                    onEndReached={this.onLoadMoreInProgressHandler}
                                    isMoreLoading={this.state.isMoreinProgressLoading}
                                    onPullToRefreshHandler={this.onPullToRefreshInProgressOrderHandler}


                                />

                                : this.strInProgressOrdersTitle !== ''
                                    ? <View style={styles.parentScrollViewStyle}>
                                        <ScrollView
                                            contentContainerStyle={styles.scrollViewStyle}
                                            refreshControl={
                                                <RefreshControl
                                                    refreshing={this.refreshing || false}
                                                    title={strings("generalFetchingNew")}
                                                    titleColor={EDColors.textAccount}
                                                    tintColor={EDColors.textAccount}
                                                    colors={[EDColors.textAccount]}
                                                    onRefresh={this.onPullToRefreshInProgressOrderHandler}
                                                />
                                            }
                                        >
                                            <EDPlaceholderComponent title={this.strInProgressOrdersTitle} subTitle={this.strInProgressOrdersSubtitle} />
                                        </ScrollView>
                                    </View>
                                    : null
                            }
                        </ScrollView>

                    </SafeAreaView>
                </View>

            </BaseContainer >
        );
    }
    //#endregion

    //#region STATE
    state = {
        isLoading: false,
        isLoadingInProgressOrders: false,
        selectedIndex: 0,
        strInProgressOrderTitle: '',
        strInProgressOrderMessage: '',
        shouldShowModal: false,
        rejectReason: '',
        showEmptyField: false,
        order: undefined,
        sendRejectReason: '',
        isMoreLoading: false,
        isMoreinProgressLoading: false
    };
    //#endregion

    renderCancelReasonPopUp = () => {
        return (
            <EDPopupView isModalVisible={this.state.shouldShowModal}>
                <CancelReasonsList onDismissCancellationReasonDialogueHandler={this.onDismissHandler} reasonList={this.props.rejectReasonList} />
            </EDPopupView>
        )
    }


    onDismissHandler = (flag) => {
        if (flag == undefined || flag == null || flag == '') {
            this.setState({ shouldShowModal: false })
            return;
        }
        this.state.sendRejectReason = flag
        this.setState({ shouldShowModal: false })
        this.acceptNRejectOrder(this.state.order)
    }

    /** SEGEMENT CHANGE INDEX */
    onSegmentIndexChangeHandler = (segmentIndex) => {
        this.setState({ selectedIndex: segmentIndex })
        this.scrollViewOrders.scrollTo({ x: (Metrics.screenWidth) * segmentIndex, y: 0, animated: true })
    }

    //#region BUTTON EVENTS
    buttonMenuPressed = () => {
        this.props.navigation.openDrawer()
    }

    onPhoneNumberPressed = (phoneNumber) => {
        let url = `tel:${phoneNumber}`
        if (Linking.canOpenURL(url))
            Linking.openURL(url)
    }

    onOrderViewPressed = (order) => {
        // console.log("ORDER PASSED::::::: ", order)
        this.props.navigation.navigate('orderDetails', { order: order })
    }

    onOrderInProgressViewPressed = order => {
        this.props.navigation.navigate('orderDetails', { order: order })
    }

    onOrderAcceptPressed = order => {
        this.setState({ order: order })
        this.acceptNRejectOrder(order, true)
    }

    onOrderRejectPressed = order => {
        this.setState({ order: order })
        this.setState({ shouldShowModal: true })
    }


    //#endregion

    /**
     * Accept/Reject Order
     */

    acceptNRejectOrder = (order, accept) => {
        netStatus(status => {
            if (status) {
                let orderParams = {
                    user_id: this.props.userDetails.UserID,
                    token: order.users.mobile_number,
                    language_slug: this.props.lan,
                    order_id: order.order_id,
                    restaurant_id: order.restaurant_id,
                    reject_reason: this.state.sendRejectReason
                }
                this.setState({ isLoading: true })
                acceptNRejectOrderAPI(orderParams, this.onSuccessAcceptOrder, this.onFailureAcceptOrder, [this.props, { "accept": accept }])
            }
            else
                showNoInternetAlert()
        })
    }

    /**
     * Accept/Reject Order success
     */

    onSuccessAcceptOrder = onSuccess => {
        // console.log('success')
        this.setState({ isLoading: false, isMoreLoading: false })

        if (onSuccess.data.status == RESPONSE_SUCCESS) {
            showTopDialogue(onSuccess.message)
            this.arrayNewOrders = undefined
            this.arrayInProgressOrders = undefined
            this.callNewOrderAPI();
            this.callInProgressOrderAPI();
        }
        else
            showTopDialogue(onSuccess.message, true)

    }


    /**
     * Accept/Reject Order failure
     */

    onFailureAcceptOrder = onFailure => {
        // console.log('fail')
        this.setState({ isLoading: false, isMoreLoading: false })
        showTopDialogue(onFailure.message, true)
    }


    //#region Networks
    onConnectionChangeHandler = isConnected => {
        if (isConnected) {
            console.log("CALLED FROM CONNECTION CHANGE :: :: ")
            this.callNewOrderAPI()
            this.callInProgressOrderAPI()
        }
    }
    //#endregion
}

export default connect(
    state => {
        return {
            isLoggedIn: state.userOperations.isLoggedIn,
            token: state.userOperations.token,
            userDetails: state.userOperations.userDetails || {},
            lan: state.userOperations.lan,
            rejectReasonList: state.userOperations.rejectReasonList
        };
    },
    dispatch => {
        return {
            saveNavigationSelection: dataToSave => {
                dispatch(saveNavigationSelection(dataToSave));
            },
            saveToken: token => {
                dispatch(saveUserFCMInRedux(token))
            }
        };
    }
)(HomeContainer);

export const styles = StyleSheet.create({
    tabStyle: {
        marginTop: 10,
        backgroundColor: EDColors.white,
        borderColor: EDColors.primary,
        height: 40
    },
    tabTextStyle: {
        color: EDColors.black,
        fontFamily: EDFonts.bold,
        fontSize: heightPercentageToDP('1.8%'),
        alignSelf: 'center',
        textAlign: 'center',
    },
    activeTabTextStyle: {
        color: EDColors.white,
        fontFamily: EDFonts.bold,
        fontSize: heightPercentageToDP('1.8%'),
        alignSelf: 'center',
        textAlign: 'center',
    },
    mainViewStyle: {
        flex: 1,
        // backgroundColor: EDColors.offWhite,
    },
    orderFlatListStyle: { width: Metrics.screenWidth },
    scrollViewStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    parentScrollViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Metrics.screenWidth,
    }
});
