/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { saveNavigationSelection } from '../redux/actions/Navigation';
import { EDColors } from '../utils/EDColors';
import { flushAllData, saveLanguage } from '../utils/AsyncStorageHelper';
import { CommonActions } from "@react-navigation/native"
import NavigationEvents from "./NavigationEvents"
import { strings } from '../locales/i18n';
import { showNoInternetAlert, showDialogue, showTopDialogue } from '../utils/EDAlert';
import EDSideMenuHeader from './EDSideMenuHeader';
import EDSideMenuItem from './EDSideMenuItem';
import EDPopupView from './EDPopupView';
import { netStatus } from '../utils/NetworkStatusConnection';
import EDProgressLoader from './EDProgressLoader';
import EDCustomPopup from './EDCustomPopup';
import { logoutUser } from '../utils/ServiceManager';
import { saveUserDetailsInRedux, saveLanguageInRedux } from '../redux/actions/UserActions';
import EDRTLView from './EDRTLView';
import { getProportionalFontSize } from '../utils/EDConstants';
import { EDFonts } from '../utils/EDFontConstants';
import deviceInfoModule from "react-native-device-info";
import Assets from '../assets';
import { initialWindowMetrics } from 'react-native-safe-area-context';


class SideBar extends React.PureComponent {
    //#region LIFECYCLE METHODS

    /** CONSTRUCTOR */
    constructor(props) {
        super(props);
        this.arrayFinalSideMenu = [];
    }

    /** STATE */
    state = {
        isLogout: false,
        isLoading: false,
    };


    /** ON DID FOCUS */
    onDidFocusNavigationEvents = () => {
    }

    /** MAIN RENDER METHOD */
    render() {
        let arrCMSPages = ((this.props.arrayCMSPages)).map(itemToIterate => { return { isAsset: true, route: 'cms', screenName: itemToIterate.name, icon: { uri: itemToIterate.cms_icon }, cmsSlug: itemToIterate.CMSSlug }; });
        let arrTemp = this.setupSideMenuData();
        let arraySideMenuData = arrTemp.concat(arrCMSPages);

        this.arrayFinalSideMenu =
            this.props.isLoggedIn
                ? arraySideMenuData.concat({ route: 'Log Out', screenName: strings('accountsSignOut'), icon: 'exit-outline', iconType: 'ionicon' })
                : arraySideMenuData;

        return (
            <View
                pointerEvents={this.state.isLoading ? 'none' : 'auto'}
                style={style.mainContainer}>

                {/* DETECT DID FOCUS EVENT */}
                <NavigationEvents onFocus={this.onDidFocusNavigationEvents} navigationProps={this.props.navigationProps} />

                {this.state.isLoading ? <EDProgressLoader /> : null}

                {/* LOGOUT DIALOGUE */}
                {this.logoutDialogue()}

                {/* HEADER VIEW */}
                <EDSideMenuHeader
                    userDetails={this.props.userDetails}
                    onProfilePressed={this.onProfilePressed} />

                {/* SIDE MENU ITEMS LIST */}
                <View style={style.navItemContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.arrayFinalSideMenu}
                        extraData={this.state}
                        keyExtractor={(item, index) => item + index}
                        renderItem={this.renderSideMenuItem}
                    />
                </View>

                {/* VERSION DETAIL */}
                <EDRTLView style={style.versionStyle}>
                    <Image source={Assets.bg_version} style={{ height: 24, width: 24 }} resizeMode={'contain'} />
                    <Text style={style.versionTextStyle} >{strings("sidebarVersion") + " " + deviceInfoModule.getVersion()}</Text>
                </EDRTLView>
            </View>
        );
    }
    //#endregion

    //#region HELPER FUNCTIONS
    /** SETUP SIDE MENU ITEMS */
    setupSideMenuData = () => {
        return [
            { route: 'Home', screenName: strings('homeTitle'), icon: "home", iconType: 'simple-line-icon' },
            { route: 'account', screenName: strings('accountsTitle'), icon: 'settings-outline', iconType: 'ionicon' },
            { route: 'Order', screenName: strings('orderPast'), icon: Assets.bg_Icon, isAsset: true },
        ];
    };

    /**
     *
     * @param {The side menu item to render from this.arrayFinalSideMenu} sideMenuItem
     */
    renderSideMenuItem = (sideMenuItem) => {
        let isSelected = this.props.titleSelected === this.arrayFinalSideMenu[sideMenuItem.index].screenName;
        return <EDSideMenuItem isSelected={isSelected} onPressHandler={this.onPressHandler} item={sideMenuItem.item} index={sideMenuItem.index} />;
    }


    /** RENDER LOGOUT DIALOGUE */
    logoutDialogue = () => {
        return (
            <EDPopupView isModalVisible={this.state.isLogout}>
                <EDCustomPopup
                    titleText={strings('loginAppName')}
                    middleText={strings('generalLogoutAlert')}
                    cancelButton={true}
                    cancelButtonTitle={strings('dialogCancel')}
                    OKButton={true}
                    OkButtonTitle={strings('accountsSignOut')}
                    onOkPress={this.onYesClick}
                    onCancelPress={this.onNoClick} />
            </EDPopupView>
        );
    }
    //#endregion


    //#region BUTTON/TAP EVENTS

    /**
     *
     * @param {The item selected by the user from the list. Unused for now, so having _ as prefix} _selectedItem
     * @param {The index of item selected by the user} selectedIndex
     */
    onPressHandler = (_selectedItem, selectedIndex) => {

        // CLOSE DRAWER
        if (this.arrayFinalSideMenu[selectedIndex].screenName !== strings('accountsSignOut')) {
            this.props.navigation.closeDrawer();
        }

        // LOGOUT
        if (this.arrayFinalSideMenu[selectedIndex].screenName === strings('accountsSignOut')) {
            this.setState({ isLogout: true });
        }
        // NOTIFICATION
        else if (this.arrayFinalSideMenu[selectedIndex].screenName === strings('profileNotification')) {
            if (this.props.isLoggedIn) {
                // SAVE SELECTED ITEM IN REDUX
                this.props.saveNavigationSelection(strings('profileNotification'));
                this.props.navigation.navigate('notifications');
            } else {
                // Take the user to login screen if not logged in
                this.props.navigation.navigate('login');
            }
        }
        // ORDERS
        else if (this.arrayFinalSideMenu[selectedIndex].screenName === strings('orderMyOrder')) {
            if (this.props.isLoggedIn) {
                // SAVE SELECTED ITEM IN REDUX
                this.props.saveNavigationSelection(strings('orderPast'));
                this.props.navigation.navigate('myOrders');
            } else {
                // Take the user to login screen if not logged in
                this.props.navigation.navigate('login');
            }
        }
        // ACCOUNT
        else if (this.arrayFinalSideMenu[selectedIndex].screenName === strings('accountsTitle')) {
            // SAVE SELECTED ITEM IN REDUX
            this.props.saveNavigationSelection(strings('accountsTitle'));
            this.props.navigation.navigate('account');
        }
        // RATE APP
        else if (this.arrayFinalSideMenu[selectedIndex].screenName === strings('sidebar.rate')) {
            this.openStore();
        }
        // SHARE APP
        else if (this.arrayFinalSideMenu[selectedIndex].screenName === strings('sidebar.share')) {
            this.shareApp();
        }
        // CHANGE CENTER SCREEN
        else {
            // SAVE SELECTED ITEM IN REDUX
            this.props.saveNavigationSelection(this.arrayFinalSideMenu[selectedIndex].screenName);

            // CHANGE MAIN SCREEN
            this.props.navigation.navigate(this.arrayFinalSideMenu[selectedIndex].route, { routeParams: this.arrayFinalSideMenu[selectedIndex] });
        }
    }

    /** PROFILE DETAILS TAP EVENT */
    onProfilePressed = () => {
        if (this.props.isLoggedIn) {
            this.props.navigation.closeDrawer();
            // SAVE SELECTED ITEM IN REDUX

            this.props.navigation.navigate('editProfileFromSideMenu');
        } else {
            // Take the user to login screen if not logged in
            this.props.navigation.closeDrawer();
            this.props.navigation.navigate('login');
        }
    }

    /** YES BUTTON TAP EVENT OF LOGOUT CONFIRMATION DIALOGUE */
    onYesClick = () => {
        // CALL LOGOUT API
        this.setState({ isLogout: false })
        this.callLogoutAPI();
    }

    /** NO BUTTON TAP EVENT OF LOGOUT CONFIRMATION DIALOGUE */
    onNoClick = () => {
        // DISMISS LOGOUT DIALOGUE
        this.setState({ isLogout: false });
    }
    //#endregion

    //#region NETWORK

    /** LOGOUT API CALL */
    callLogoutAPI = () => {
        // CHECK INTERNET STATUS
        netStatus(isConnected => {
            if (isConnected) {
                // LOGOUT PARAMS
                const logoutParams = {
                    user_id: this.props.userDetails.UserID,
                    language_slug: this.props.lan,
                };
                // LOGOUT CALL
                this.setState({ isLoading: true });
                logoutUser(logoutParams, this.onLogoutSuccess, this.onLogoutFailure, this.props);
            } else {
                showNoInternetAlert();
            }
        });
    }

    /**
     *
     * @param {The success object returned in logout API response} _objSuccess
     */
    onLogoutSuccess = (_objSuccess) => {

        this.props.navigation.closeDrawer();

        const selectedLanguage = this.props.lan;

        // CLEAR USER DETAILS IN REDUX
        this.props.saveUserDetailsInRedux({});
        this.props.saveLanguageRedux(selectedLanguage);

        // SAVE SELECTED ITEM IN REDUX
        this.props.saveNavigationSelection(this.arrayFinalSideMenu[0].screenName);

        // CLEAR USER DETAILS FROM ASYNC STORE
        flushAllData(
            _response => {

                // MAINTAIN THE SELECTED LANGUAGE IN ASYNC STORE
                saveLanguage(selectedLanguage, _successSaveLanguage => { }, _error => { });

                // TAKE THE USER TO INITIAL SCREEN
                this.props.navigation.popToTop();
                this.props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{
                            name: "splash"
                        }],
                    })
                );
            },
            _error => { }
        );

        // DISMISS LOGOUT DIALOGUE
        this.setState({ isLogout: false, isLoading: false });
    }

    /**
     *
     * @param {The failure response object returned in logout API} _objFailure
     */
    onLogoutFailure = _objFailure => {
        // DISMISS LOGOUT DIALOGUE
        showTopDialogue(_objFailure.message || '', true);
        this.setState({ isLogout: false, isLoading: false });
    }
}

const style = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: EDColors.white, paddingTop: initialWindowMetrics.insets.top + 8, paddingBottom: initialWindowMetrics.insets.bottom + 8 },
    navItemContainer: { flex: 5, paddingBottom: 20 },
    versionStyle: { justifyContent: 'flex-start', alignItems: "center", marginHorizontal: 20, marginBottom: 10 },
    versionTextStyle: { fontSize: getProportionalFontSize(14), marginHorizontal: 5, fontFamily: EDFonts.medium, color: EDColors.text },
});

export default connect(
    state => {
        return {
            titleSelected: state.navigationReducer.selectedItem,
            userDetails: state.userOperations.userDetails || {},
            isLoggedIn: state.userOperations.isLoggedIn,
            lan: state.userOperations.lan,
            arrayCMSPages: state.userOperations.arrayCMSData,

        };
    },
    dispatch => {
        return {
            saveNavigationSelection: dataToSave => {
                dispatch(saveNavigationSelection(dataToSave));
            },
            saveUserDetailsInRedux: detailsToSave => {
                dispatch(saveUserDetailsInRedux(detailsToSave));
            },
            saveLanguageRedux: language => {
                dispatch(saveLanguageInRedux(language));
            }
        };
    }
)(SideBar);
