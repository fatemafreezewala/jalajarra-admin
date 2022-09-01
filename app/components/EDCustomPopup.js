import React from 'react'
import { StyleSheet, Text, TouchableOpacity , View} from 'react-native'
import { EDColors } from '../utils/EDColors'
import { EDFonts } from '../utils/EDFontConstants'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import EDRTLView from '../components/EDRTLView'
import { getProportionalFontSize } from '../utils/EDConstants'
import Metrics from '../utils/metrics'

export default class EDCustomPopup extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        
            <View style={styles.parentViewStyle}>  
            <EDRTLView style={styles.mainViewStyle}>

                {/* TITLE OF HEADER */}
                <EDRTLView style={styles.titleViewStyle}>
                    <Text style={styles.titleTextStyle}>{this.props.titleText}</Text>
                </EDRTLView>

                {/* MIDDLE TEXT VIEW */}
                <EDRTLView style={styles.middleTextView}>
                    <Text style={styles.middleTextStyle}>{this.props.middleText}</Text>
                </EDRTLView>

                {/* BOTTOM BUTTON VIEW */}

                <EDRTLView style={styles.bottomButtonView}>

                   

                    {/* CANCEL BUTTON */}
                    {this.props.cancelButton ? (
                        <TouchableOpacity onPress={this.props.onCancelPress}>
                            <EDRTLView style={styles.cancelButtonView}>
                                <Text style={styles.cancelTextStyle}>
                                    {this.props.cancelButtonTitle}
                                </Text>
                            </EDRTLView>
                        </TouchableOpacity>
                    ) : null}
                    
                     {/* OK BUTTON */}
                     {this.props.OKButton ? (
                        <TouchableOpacity onPress={this.props.onOkPress}>
                            <EDRTLView style={styles.OkButtonView}>
                                <Text style={styles.OkTextStyle}>
                                    {this.props.OkButtonTitle}
                                </Text>
                            </EDRTLView>
                        </TouchableOpacity>
                    ) : null}
                </EDRTLView>
            </EDRTLView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    parentViewStyle: {flex:1 , justifyContent:'flex-end'},
    //Main top view
    mainViewStyle: {
        justifyContent: 'flex-end',
        flexDirection: 'column',
        margin: 15,
        backgroundColor:EDColors.white,
        borderRadius:24,
        padding:10,
        marginBottom:50
    },
    titleViewStyle: {
        padding: 10,
        // backgroundColor: EDColors.primary,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    titleTextStyle: {
        color: EDColors.black,
        fontFamily: EDFonts.semibold,
        textAlign: 'left',
        fontSize: getProportionalFontSize(16),
    },
    middleTextView: {
        backgroundColor: EDColors.white,
    },
    middleTextStyle: {
        color: EDColors.black,
        fontFamily: EDFonts.regular,
        textAlign: 'left',
        fontSize: heightPercentageToDP('1.8%'),
        marginHorizontal: 5,
        padding: 5,
    },
    bottomButtonView: {
        // backgroundColor: EDColors.backgroundLight,
        padding: 10,
        marginTop: 15,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    cancelButtonView: {
        marginRight: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:16,
        backgroundColor: EDColors.primary,
        height : Metrics.screenHeight * 0.073,
        width : Metrics.screenWidth * 0.37
    },
    cancelTextStyle: {
        color: EDColors.white,
        fontFamily: EDFonts.medium,
        textAlign: 'center',
        fontSize: getProportionalFontSize(16),
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        // borderWidth: 1.3,
        borderColor: EDColors.textDisabled,
        borderRadius: 5,
    },
    OkButtonView: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:EDColors.radioSelected,
        borderRadius:16,
        height : Metrics.screenHeight * 0.073,
        width : Metrics.screenWidth * 0.37
    },
    OkTextStyle: {
        color: EDColors.black,
        fontFamily: EDFonts.medium,
        textAlign: 'center',
        fontSize:getProportionalFontSize(16),
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        // borderWidth: 1.3,
        borderColor: EDColors.textDisabled,
        borderRadius: 5,
    },
})
