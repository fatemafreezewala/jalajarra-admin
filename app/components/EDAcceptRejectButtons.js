import React, { Component } from 'react';
import { StyleSheet } from "react-native"
import { EDColors } from '../utils/EDColors';
import EDRTLView from './EDRTLView';
import EDButton from './EDButton';
import { getProportionalFontSize } from '../utils/EDConstants';
import { EDFonts } from '../utils/EDFontConstants';
import { strings } from '../locales/i18n';
export default class EDAcceptRejectButtons extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (

            <EDRTLView >
                {this.props.isShowAcceptButton
                    ? 
                    <EDButton textStyle={styles.buttonTextStyle} style={styles.acceptButtonStyle} label={strings('generalAccept')} onPress={this.props.onAcceptPressed} />
                    : null
                }

                <EDButton textStyle={styles.buttonTextStyle} style={styles.rejectButtonStyle} label={strings('generalReject')} onPress={this.props.onRejectPressed} />
            </EDRTLView>
        )
    }
}
const styles = StyleSheet.create({
    buttonTextStyle: { fontSize: getProportionalFontSize(12) , fontFamily :EDFonts.medium ,marginHorizontal: 15,marginVertical:5 },
    acceptButtonStyle: { marginHorizontal: 3,marginVertical:0 ,padding: 0 , borderRadius:16 , alignItems:'center' , backgroundColor : EDColors.accept},
    rejectButtonStyle: { marginHorizontal: 3,marginVertical:0 ,padding: 0 , borderRadius:16 , alignItems:'center' , backgroundColor : EDColors.reject},
})