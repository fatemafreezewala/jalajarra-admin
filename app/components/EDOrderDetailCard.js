/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { EDColors } from '../utils/EDColors';
import { funGetDateStr, getProportionalFontSize, isRTLCheck } from '../utils/EDConstants';
import { EDFonts } from '../utils/EDFontConstants';
import { strings } from '../locales/i18n';
import EDAcceptRejectButtons from './EDAcceptRejectButtons';
import EDRTLView from '../components/EDRTLView'
import EDTextIcon from './EDTextIcon';
import Metrics from '../utils/metrics';
import EDButton from './EDButton';
import EDRTLText from './EDRTLText';
import EDImage from './EDImage';
import { Icon } from 'react-native-elements';
import moment from "moment"
import Assets from '../assets';

export default class EDOrderDetailCard extends Component {
    /** LIFE CYCLE METHODS */
    constructor(props) {
        super(props)
    }

    /** RENDER METHOD */
    render() {
        return (
           

            <EDRTLView style={style.rootView}>

                {/* PARENT VIEW */}
                <EDRTLView style={style.parentView}>

            
                    {/* HEADER ITEMS */}

                    <EDRTLView style={style.headerTextView}>
                        <View style={style.flexView}>
                            <EDRTLText style={[style.parentHeaderText, {alignSelf : isRTLCheck() ? 'flex-end' : "flex-start" }]}
                            title={strings("orderId") + this.props.order.item.order_id} 
                            numberOfLines={2}
                            />
                            <EDRTLText style={[style.parentHeaderText1, { alignSelf : isRTLCheck() ? 'flex-end' : "flex-start" }]}
                            title={strings("orderDate") + funGetDateStr(this.props.order.item.order_date, "MMM DD YYYY, hh:mm A")} 
                            numberOfLines={2}
                            />
                        </View>
                        <View style={style.flexView} >
                            <EDRTLText 
                            style={[style.headerText, { alignSelf : isRTLCheck() ? 'flex-start' : "flex-end" }]}
                            numberOfLines={2}
                            title={strings("orderStatus") + this.props.order.item.order_status_display} />
                            <EDRTLText 
                            style={[style.headerText1, { alignSelf : isRTLCheck() ? 'flex-start' : "flex-end" }]}
                            numberOfLines={2}
                            title={strings("orderAmount") + this.props.order.item.currency_symbol + this.props.order.item.total} />
                        </View>
                        
                    </EDRTLView>

                    


                    {/* SCHEDULED DELIVERY */}

                    {this.props.order.item.delivery_type == "Schedule" && this.props.order.item.delivery_type != undefined && this.props.order.item.delivery_type != null ? 
                            <EDRTLView style={style.marginView}>
                                <Icon name = "info"  size={12} />
                                <EDRTLText title={strings("orderPreOrderTime") + " " + moment(this.props.order.item.delivery_date, ["h:mm A"]).format("HH:mm")} style={style.preOrderText} />
                            </EDRTLView> : null }
                            

                    {/* PARENT MIDDDLE VIEW */}
                    <EDRTLView style={style.mainView}>

                        {/* MIDDLE CONTENT */}
                        <EDRTLView style={style.middleView}>
                                 {/* {RESTUARANT NAME} */}
                                <EDRTLView>
                                    <EDRTLText style={style.restaurantHeaderText}
                                        title={this.props.order.item.restaurant_name} />
                                    </EDRTLView>

                            {/* USER NAME */}
                            {this.props.order.item.users.first_name !== undefined && this.props.order.item.users.first_name !== null && this.props.order.item.users.first_name.trim().length !== 0 ?
                            <EDTextIcon
                                icon={'person-outline'}
                                text={this.props.order.item.users.first_name}
                                textStyle={style.nameText} 
                                style={style.textIconStyle}
                                /> : null}
                            {/* PHONE NUMBER */}
                            {this.props.order.item.users.mobile_number !== undefined && this.props.order.item.users.mobile_number !== null && this.props.order.item.users.mobile_number.trim().length !== 0 ?
                                <EDTextIcon
                                    icon={'phone'}
                                    isTouchable={true}
                                    type={'feather'}
                                    size={15}
                                    onPress={this.onPhoneNumberPressed}
                                    text={this.props.order.item.users.mobile_number}
                                    textStyle={style.phoneText} 
                                    style={{marginHorizontal: 2}}
                                    />
                            : null }

                            {/* ADDRESS */}
                            {this.props.order.item.users.address !== undefined && this.props.order.item.users.address !== null && this.props.order.item.users.address.trim().length !== 0 ?
                                <EDTextIcon
                                    icon={'location-pin'}
                                    type={'simple-line-icon'}
                                    size={15}
                                    numberOfLines={2}
                                    text={this.props.order.item.users.address + " , " + this.props.order.item.users.landmark}
                                    textStyle={style.addressText} /> : null}

    
                        </EDRTLView>
                            {/* CUTOMER ICON */}
                            <EDRTLView style={style.imageView}>
                                <View style={style.imageViewStyle}>
                                    <EDImage source={this.props.order.item.users.image} style={style.imageStyle}
                                    
                                    placeholder={Assets.logo_placeholder}/>
                                </View>
                            </EDRTLView>

                    </EDRTLView>
                     {/* VIEW BUTTON */}
                     <EDRTLView style={style.bottomView}>
                         
                            <EDButton textStyle={style.buttonTextStyle} style={style.buttonStyle} label={strings('generalView')} onPress={this.onOrderViewPressed} />
                        
                            {/* ACCEPT OR REJCT */}
                            {!this.props.order.item.order_accepted && this.props.order.item.order_status !== "Cancel" &&  this.props.order.item.order_status !== "Rejected" && this.props.order.item.order_status !== "Complete" ? (
                                <EDRTLView style={style.orderButtons}>
                                    <EDAcceptRejectButtons
                                        isShowAcceptButton={!this.props.order.item.order_accepted}
                                        onAcceptPressed={this.onOrderAcceptPressed}
                                        onRejectPressed={this.onOrderRejectPressed}
                                    />
                                </EDRTLView>
                            ) : null}
                        </EDRTLView>
                </EDRTLView>
            </EDRTLView>
        )
    }
    //#region BUTTON EVENTS
    onPhoneNumberPressed = () => {
        if (this.props.onPhoneNumberPressed != undefined) {
            this.props.onPhoneNumberPressed(this.props.order.item.users.mobile_number)
        }
    }

    onOrderViewPressed = () => {
        if (this.props.onOrderViewPressed != undefined) {
            this.props.onOrderViewPressed(this.props.order.item)
        }
    }

    onOrderAcceptPressed = () => {
        if (this.props.onOrderAcceptPressed != undefined) {
            this.props.onOrderAcceptPressed(this.props.order.item)
        }
    }

    onOrderRejectPressed = () => {
        if (this.props.onOrderRejectPressed != undefined) {
            this.props.onOrderRejectPressed(this.props.order.item)
        }
    }
    //#endregion
}


const style = StyleSheet.create({
    rootView: {
        backgroundColor: EDColors.white, borderRadius: 16,
        shadowColor:EDColors.shadowColor, 
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        
        elevation: 16,
         margin: 10, marginVertical: 5, marginTop:10
    },
    bottomView: {justifyContent:'space-between' , marginTop:4},
    flexView: {flex: 1},
    textIconStyle: {justifyContent:'space-between' , marginTop:4, alignItems: "center", alignContent: "center"},
    parentView: { backgroundColor: EDColors.white, flex: 1, flexDirection: 'column', padding: 10,borderRadius: 16, },
    headerTextView: { flex:1, justifyContent: 'space-between', paddingBottom:10 , borderBottomWidth : 1 , borderBottomColor :EDColors.radioSelected },
    headerText: { fontSize: getProportionalFontSize(12), fontFamily: EDFonts.medium },
    headerText1: { marginTop: 5, fontSize: getProportionalFontSize(12), fontFamily: EDFonts.medium },
    preOrderText: { alignSelf: 'flex-start', fontSize: getProportionalFontSize(13), fontFamily: EDFonts.bold, color: EDColors.primary, marginLeft : 2.5},
    parentHeaderText: { fontSize: getProportionalFontSize(12), fontFamily: EDFonts.medium, flex:1, paddingRight:10},
    parentHeaderText1: {  marginTop: 5, fontSize: getProportionalFontSize(12), fontFamily: EDFonts.medium, flex:1, paddingRight:10},
    restaurantHeaderText: { alignSelf: 'flex-start', fontFamily: EDFonts.semibold, fontSize: getProportionalFontSize(16) },
    mainView: { flex: 1, justifyContent: 'space-evenly', marginTop: 5 , },
    imageView: { flexDirection: 'column',marginTop:5, overflow: 'hidden' },
    imageViewStyle: {},
    imageStyle: { alignSelf: 'center', width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.26, overflow: 'hidden', borderRadius: 8 },
    middleView: {
        flexDirection: 'column',
        flex: 1,paddingTop:5
    },
    phoneText: { alignSelf: 'center', flex: 1, color: EDColors.text, fontSize: getProportionalFontSize(12) , fontFamily : EDFonts.regular,  },
    addressText: { textAlignVertical: "center", alignSelf: 'center', flex: 1, color: EDColors.text, fontSize: getProportionalFontSize(12) , fontFamily :EDFonts.regular, marginBottom: 2},
    nameText: { textAlignVertical: "center", alignSelf: 'center', flex: 1, color: EDColors.text, fontSize: getProportionalFontSize(12) , fontFamily :EDFonts.regular, marginTop: 5, marginBottom: 2},
    orderButtons: { justifyContent: 'center', marginTop: 10 },
    buttonTextStyle: { fontSize: getProportionalFontSize(12) , fontFamily :EDFonts.medium ,marginHorizontal: 20, marginVertical: 7, textAlign :'center', textAlignVertical: "center"},
    buttonStyle: { marginHorizontal: 0,marginVertical:0 ,padding: 0 , borderRadius:16 , alignItems:'center' , marginHorizontal:5 , marginTop:7, justifyContent: "center", alignContent: "center"},
    marginView: {marginTop: 5}
})
