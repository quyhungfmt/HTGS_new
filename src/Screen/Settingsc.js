import { Button, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Realtime_Sc from './realtime_Sc';
import HeaderShown from '../navigation/HeaderShown';
import DrawerSceneWrapper from '../navigation/Drawerscreen';
export default function Settingsc({navigation})  {
  return (
    <DrawerSceneWrapper title={'Setting'}>
   
  </DrawerSceneWrapper>
  )
}

const styles = StyleSheet.create({
  contariner:{
    flex:1,
    backgroundColor:"white"
  }
})