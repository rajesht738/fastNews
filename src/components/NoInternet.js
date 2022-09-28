import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const NoInternet = ({onRefreshPress}) => {
  return (
    <View style={styles.container}>
     <MaterialCommunityIcons name="access-point-network-off" color="#383838" size={35} />
      <Text style={styles.text}>No Internet</Text>
<Pressable onPress={onRefreshPress} style={{flexDirection: 'row', alignItems:'center'}}>
<MaterialCommunityIcons name="refresh" size={35} />
<Text style={styles.text}>No Internet</Text>
</Pressable>

    </View>
  )
}

export default NoInternet

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    text: {
        fontSize: 18,
        padding:10,
        color: "#383838",
    }
})