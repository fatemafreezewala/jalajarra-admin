/* eslint-disable radix */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from "react";
import { View, ScrollView, StyleSheet, Linking, RefreshControl } from "react-native";
import BaseContainer from "./BaseContainer";
import { EDColors } from "../utils/EDColors";
import { connect } from "react-redux";
import { saveNavigationSelection } from "../redux/actions/Navigation";
import { netStatus } from "../utils/NetworkStatusConnection";
import NavigationEvents from "../components/NavigationEvents";
import { strings } from "../locales/i18n";
import EDPlaceholderComponent from "../components/EDPlaceholderComponent";
import EDOrdersFlatList from '../components/EDOrdersFlatList'
import Metrics from '../utils/metrics';
import { getOrderDetail } from "../utils/ServiceManager";
import { debugLog, funGetDateStr, getProportionalFontSize, PAGE_COUNT } from "../utils/EDConstants";
import EDRTLView from "../components/EDRTLView";
import EDRTLText from "../components/EDRTLText";
import { EDFonts } from "../utils/EDFontConstants";
import moment from "moment";
import EDHomeSearchBar from "../components/EDHomeSearchBar";

class OrderDetailContainer extends React.Component {
    //#region LIFE CYCLE METHODS

    constructor(props) {
        super(props);

        this.scrollViewOrders = null;
        this.arrayPastOrders = undefined
        this.strScreenTitle = ""
        this.strScreenSubTitle = ""
        this.shouldLoadMore = false
        this.refreshing = false
        this.startDate = "";
        this.endDate = "";
        this.filterData = ""
    }

    onLoadMore = () => {
        if (this.shouldLoadMore && !this.state.isLoading && !this.state.isMoreLoading) {
            // console.log("API CALLED FROM ONLOADMORE:::::::::::::: ")
            this.callPastOrderAPI()
        }
    }

    onDidFocusContainer = () => {
        // console.log("API CALLED FROM ONDIDFOCUSCONTAINER:::::::::: ")
        if (this.arrayPastOrders == undefined || this.arrayPastOrders == null || this.arrayPastOrders == []) {
            this.arrayPastOrders = undefined
            this.callPastOrderAPI()
        }
    }

    onPullToRefreshPastOrderHandler = () => {
        this.strScreenTitle = '';
        this.strScreenSubTitle = '';
        this.refreshing = false
        this.shouldLoadMore = false
        this.arrayPastOrders = []
        this.state.strSearch = ''
        // console.log("API CALLED FROM ON PULL TO REFRESH:::::::::::: ")
        this.callPastOrderAPI()
    }

    callPastOrderAPI = (isForRefresh = false) => {
        this.strScreenTitle = '';
        this.strScreenSubTitle = '';
        if (this.arrayPastOrders === undefined) {
            this.arrayPastOrders = [];
        }
        var d = new Date();
        var n = d.getDate();
        var y = n - 1;

        netStatus(isConnectedToNetwork => {
            // debugLog("(this.arrayPastOrders && !isForRefresh)::::::::: ", (this.arrayPastOrders && !isForRefresh), parseInt(this.arrayPastOrders.length / PAGE_COUNT), this.arrayPastOrders.length, PAGE_COUNT )
            if (isConnectedToNetwork) {
                let params = {
                    language_slug: this.props.lan,
                    search_data: this.state.strSearch,
                    tabType: "past",
                    user_id: this.props.userDetails.UserID,
                    count: PAGE_COUNT,
                    token: this.props.userDetails.PhoneNumber,
                    page_no: (this.arrayPastOrders && !isForRefresh) ? parseInt(this.arrayPastOrders.length / PAGE_COUNT) + 1 : 1,
                    start_date: this.filterData == "" ? "" : this.filterData == strings("filterToday") ? funGetDateStr(new Date().toString(), 'MM/DD/YYYY') : this.filterData == strings("filterYesterday") ? funGetDateStr(new Date(moment(new Date()).subtract(1, 'day')).toString(), 'MM/DD/YYYY')
                        : this.filterData == strings("filterThisMonth") ? funGetDateStr(new Date(moment(new Date()).subtract(y, 'day')).toString(), 'MM/DD/YYYY') : funGetDateStr(this.startDate.toString(), 'MM/DD/YYYY'),
                    end_date: this.filterData == "" ? "" : this.filterData == strings("filterToday") ? funGetDateStr(new Date().toString(), 'MM/DD/YYYY') : this.filterData == strings("filterYesterday") ? funGetDateStr(new Date(moment(new Date()).subtract(1, 'day')).toString(), 'MM/DD/YYYY')
                        : this.filterData == strings("filterThisMonth") ? funGetDateStr(new Date().toString(), 'MM/DD/YYYY') : funGetDateStr(this.endDate.toString(), 'MM/DD/YYYY'),
                };
                debugLog("START DATE :::::", this.filterData)
                if (!isForRefresh) {
                    this.setState({ isMoreLoading: this.arrayPastOrders !== undefined && this.arrayPastOrders.length >= PAGE_COUNT ? true : false, isLoading: this.arrayPastOrders === undefined || this.arrayPastOrders.length === 0 });
                }
                getOrderDetail(params, this.onGetPastOrderSuccess, this.onGetPastOrderFailure, this.props)
            } else {
                this.arrayPastOrders = [];
                this.strScreenSubTitle = strings('generalNoInternetMessage');
                this.strScreenTitle = strings('generalNoInternet');
                this.setState({ isLoading: false, isMoreLoading: false })
            }
        })
    };

    /**
   * @param {The success response object} objSuccess
   */
    onGetPastOrderSuccess = objSuccess => {
        this.strScreenTitle = strings('generalNoPastOrders');
        this.strScreenSubTitle = strings('generalNoNewOrdersSubtitle');

        this.filter = false

        if (this.arrayPastOrders === undefined) {
            this.arrayPastOrders = []
        }

        // PAST ORDERS ARRAY
        if (objSuccess.data.orders !== undefined && objSuccess.data.orders.length > 0) {
            let arrPastOrder = objSuccess.data.orders || []
            let totalRecordCount = objSuccess.data.total_order_count || 0
            this.shouldLoadMore = this.arrayPastOrders.length + arrPastOrder.length < totalRecordCount
            this.arrayPastOrders = [...this.arrayPastOrders, ...arrPastOrder];
        }
        this.setState({ isLoading: false, isMoreLoading: false });
    };

    /**
     * @param {The failure response object} objFailure
     */
    onGetPastOrderFailure = objFailure => {
        this.strScreenTitle = objFailure.message
        this.strScreenSubTitle = ''
        this.filter = false
        this.setState({ isLoading: false, isMoreLoading: false });
    };

    //#region Networks
    onConnectionChangeHandler = isConnected => {
        if (isConnected) {
            // console.log("API CALLED FROM ONCONNECTION CHANGE HANDLER:::::::;;")
            this.callPastOrderAPI()
        }
    }

    //#endregion

    /**
     * @param { } data
     */
    getFilter = data => {
        if (this.filter) {
            return
        }
        else {
            this.startDate = data.startDate;
            this.filter = true;
            this.endDate = data.endDate;
            this.filterData = data.selectedFilter
            this.strScreenTitle = '';
            this.strScreenSubTitle = '';
            this.refreshing = false
            this.shouldLoadMore = false
            this.arrayPastOrders = []
            // console.log("API CALLED FROM GET FILTER:::::::::::: ")
            this.callPastOrderAPI()

        }
    };
    //#endregion

    renderHeader = () => {
        return (
            <EDHomeSearchBar
                value={this.state.strSearch}
                placeholder={strings("searchPlaceholder")}
                onChangeValue={this.onTextChangeHandler}
                disabled={this.state.isLoading || this.state.isMoreLoading}
                onSearchPress={this.onSearchPressed}
                onClearPress={this.onPullToRefreshPastOrderHandler}
            />
        )
    }

    /** SEARCH TEXT CHANGE */
    onTextChangeHandler = (text,) => {
        this.setState({ strSearch: text })
    }
    //#endregion

    //#region On Search Pressed
    onSearchPressed = () => {
        if (this.state.strSearch == "" || !(/\S/.test(this.state.strSearch))) {
            return
        }
        else {
            this.setState({ isLoading: true })
            this.arrayPastOrders = undefined
            this.shouldLoadMore = false
            this.callPastOrderAPI();
        }
    }
    //#endregion

    // RENDER METHOD
    render() {
        return (
            <BaseContainer
                title={strings("orderPast")}
                left={"menu"}
                right={"filter"}
                rightIconFamily={"ant-design"}
                loading={this.state.isLoading}
                onLeft={this.onMenuEventPressed}
                onRight={this.onFilterPressed}
                connection={this.onConnectionChangeHandler}
            >

                {/* FOCUS EVENTS */}
                <NavigationEvents onFocus={this.onDidFocusContainer} navigationProps={this.props} />

                {/* PARENT VIEW */}
                <View style={styles.mainViewStyle}>

                    {this.filterData != "" ?
                        <>
                            <EDRTLView style={styles.filterDataView} >
                                <EDRTLText numberOfLines={2} title={strings("orderOf")} style={styles.headerText} />
                                {this.filterData != strings("filterCustomRange") ?
                                    <EDRTLText numberOfLines={2} title={this.filterData} style={styles.headerText} />
                                    : null}
                            </EDRTLView>
                            {this.filterData == strings("filterCustomRange") ?
                                <EDRTLView style={styles.customRangeView}>
                                    <EDRTLView>
                                        <EDRTLText title={strings("orderFrom")} />
                                        <EDRTLText title={funGetDateStr(this.startDate.toString(), 'MM/DD/YYYY')} />
                                    </EDRTLView>
                                    <EDRTLView>
                                        <EDRTLText title={strings("orderTo")} />
                                        <EDRTLText title={funGetDateStr(this.endDate.toString(), 'MM/DD/YYYY')} />
                                    </EDRTLView>
                                </EDRTLView>
                                : null}
                        </>
                        : null}

                    {/* PAST ORDERS */}
                    {this.arrayPastOrders !== undefined && this.arrayPastOrders.length > 0
                        ? <EDOrdersFlatList style={styles.orderFlatListStyle}
                            arrayOrders={this.arrayPastOrders}
                            ListHeaderComponent={this.renderHeader}
                            onPhoneNumberPressed={this.onPhoneNumberPressed}
                            onOrderViewPressed={this.onOrderPastViewPressed}
                            onOrderAcceptPressed={this.onOrderAcceptPressed}
                            onOrderRejectPressed={this.onOrderRejectPressed}
                            onEndReached={this.onLoadMore}
                            isMoreLoading={this.state.isMoreLoading}
                            onPullToRefreshHandler={this.onPullToRefreshPastOrderHandler}
                        />

                        : this.strScreenTitle != ''
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
                                            onRefresh={this.onPullToRefreshPastOrderHandler}
                                        />
                                    }
                                >
                                    <>
                                        {this.renderHeader()}
                                        <EDPlaceholderComponent title={this.strScreenTitle} subTitle={this.strScreenSubTitle} />
                                    </>
                                </ScrollView>
                            </View>
                            : null}

                </View>


            </BaseContainer >
        );
    }
    //#endregion

    /** STATE */
    state = {
        isLoading: false,
        isMoreLoading: false,
        selectedIndex: 0,
        strSearch: ''
    };

    //#region
    /** BUTTON EVENTS */
    onMenuEventPressed = () => {
        this.props.navigation.openDrawer()
    }

    onFilterPressed = () => {
        this.props.navigation.navigate('filter', {
            getFilterDetails: this.getFilter,
            selectedFilter: this.filterData,
            startDate: this.filterData == strings("filterCustomRange") ? funGetDateStr(this.startDate.toString(), 'YYYY-MM-DD') : "",
            endDate: this.filterData == strings("filterCustomRange") ? funGetDateStr(this.endDate.toString(), 'YYYY-MM-DD') : ""
        })
    }

    onPhoneNumberPressed = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`)
    }

    onOrderViewPressed = (order) => {
        this.props.navigation.navigate('orderDetails', { order: order })
    }

    onOrderPastViewPressed = order => {
        this.props.navigation.navigate('orderDetails', { order: order, readOnly: true })
    }

    onOrderAcceptPressed = order => {
    }

    onOrderRejectPressed = order => {
    }
    //#endregion

}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        backgroundColor: EDColors.offWhite,
    },
    orderFlatListStyle: { width: Metrics.screenWidth },
    parentScrollViewStyle: { flex: 1, width: Metrics.screenWidth },
    scrollViewStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerText: { fontFamily: EDFonts.semibold, fontSize: getProportionalFontSize(16) },
    filterDataView: { flexWrap: "wrap", margin: 20 },
    customRangeView: { margin: 20, marginTop: -10, justifyContent: "space-between" }
})

export default connect(
    state => {
        return {
            isLoggedIn: state.userOperations.isLoggedIn,
            token: state.userOperations.token,
            userDetails: state.userOperations.userDetails || {},
            lan: state.userOperations.lan,
        };
    },
    dispatch => {
        return {
            saveNavigationSelection: dataToSave => {
                dispatch(saveNavigationSelection(dataToSave));
            }
        };
    }
)(OrderDetailContainer);

