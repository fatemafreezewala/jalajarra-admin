/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Platform, Text } from 'react-native';
import { EDFonts } from '../utils/EDFontConstants';
import Metrics from '../utils/metrics';
import EDRTLText from './EDRTLText';
import Assets from '../assets';
import DeviceInfo from 'react-native-device-info';
import { EDColors } from '../utils/EDColors';
import { isRTLCheck, getProportionalFontSize, capiString } from '../utils/EDConstants';
import { Icon } from 'react-native-elements';
import EDRTLView from './EDRTLView';

export default class EDThemeHeader extends Component {

    render() {
        return (
            <View>
                <Image
                    style={styles.imageBackground}
                    source={Assets.bg_profile_new} />

                { this.props.showLogo ?
                    <Image style={{ position: "absolute", bottom: ((Metrics.screenWidth * 216) / 314) / 4 + 25, width: "80%", height: 150, alignSelf: "center" }}
                        resizeMode="contain"

                        source={Assets.restaurant_logo} /> : null}
                <View style={[styles.backButtonContainer, { alignItems: isRTLCheck() ? 'flex-end' : 'flex-start' }]}>
                    <TouchableOpacity onPress={this.props.onLeftButtonPress}>
                        <Icon size={25} color={EDColors.white} name={this.props.icon} />
                    </TouchableOpacity>
                </View>
                <EDRTLView style={styles.welcomeContainer}>
                    <View>
                        <EDRTLText numberOfLines={2} style={styles.titleText} title={this.props.title} />
                    </View>
                    <View style={styles.languageView}>
                    <TouchableOpacity
                        style={[ styles.lanStyle, { flexDirection : isRTLCheck() ? 'row-reverse' : 'row' } ]}
                        onPress={this.props.onLanguagePress}
                    
                    >
                        <Icon name={'language'} size={15} color={EDColors.black} />
                        <Text  style={styles.languageTextStyle}> {capiString(this.props.lan) }  </Text>
                        <Icon name={'chevron-down'} size={15} color={EDColors.black} type={'feather'}  />
                    

                    </TouchableOpacity>
                    </View>
                </EDRTLView>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    imageBackground: {
        width: Metrics.screenWidth,
        height: (Metrics.screenWidth * 216) / 314,
    },
    lanStyle: { borderWidth: 1, borderColor: EDColors.grayNew, borderRadius: 16, padding: 10, alignItems: 'center', justifyContent: 'space-evenly' },
    languageView: { justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
    backButtonContainer: { position: 'absolute', marginHorizontal: 20, top: (DeviceInfo.hasNotch() && Platform.OS === 'ios') ? 44 : 20, width: Metrics.screenWidth - 40 },
    welcomeContainer: { position: 'absolute', top: '85%', width: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30, justifyContent: 'space-between', backgroundColor: EDColors.white, },
    languageTextStyle: { backgroundColor: EDColors.white, marginHorizontal: 0, padding: 0, fontFamily : EDFonts.semibold },
    titleText: { fontFamily: EDFonts.bold, fontSize: getProportionalFontSize(28), margin: 20, marginTop: 30 },
});
