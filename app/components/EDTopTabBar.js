// Vikrant 19-07-21
import React,{Component} from 'react';
import {View,Text,TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { EDColors } from '../utils/EDColors';
import { getProportionalFontSize } from '../utils/EDConstants';
import { EDFonts } from '../utils/EDFontConstants';
import Metrics from '../utils/metrics';
import EDRTLView from './EDRTLView';


export default class EDTopTabBar extends Component{

render(){
    return(
            <View>
                <ScrollView
                    horizontal={true}
                    
                >
                <EDRTLView style={styles.tabView}>
                    {
                        this.props.data.map((item,index)=>(
                            <TouchableOpacity
                            style={[styles.buttonStyle , {borderBottomColor: this.props.selectedIndex == item.index ? 'white' : EDColors.primary }]}
                            onPress={()=>item.onPress(item.index)}
                                >
                            <Text
                                // style={styles.buttonTextStyle}
                                style={ [styles.buttonTextStyle , { color: this.props.selectedIndex == item.index ?  EDColors.white : EDColors.white }]}
                                numberOfLines={2}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                        ))
                
                    }
                    
                </EDRTLView>
                </ScrollView>
            </View>
             )
        }
}

const styles = StyleSheet.create({
    tabView: {
        width: Metrics.screenWidth, backgroundColor: EDColors.primary, alignItems: 'center'
    },
    buttonTextStyle: { paddingVertical: 16, fontSize: getProportionalFontSize(16), fontFamily: EDFonts.semibold, color: EDColors.white, textAlign: 'center' }
    ,
    buttonStyle: { height: '100%', alignItems: 'center', alignSelf: 'center', marginHorizontal: 15, borderBottomWidth: 3 }
})
