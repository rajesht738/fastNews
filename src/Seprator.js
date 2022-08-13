import React from 'react'
import { View } from 'react-native'

export default function Seprator({width='100%', height=2, backgroundColor='#3d3d3d' , style}) {
  return (
    <View style={[{width , height , backgroundColor, alignSelf: "center"}, style]}/>
  )
}
 