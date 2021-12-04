import { View } from "react-native";
import React from "react";
const Layout = ({ children,img,bool=false,comp }) => {
  return <View >
     { img&&<Image source={img} style={{width:100,height:100}}/>}
     { bool&&<Text>hello</Text>}
     { comp&&comp()}
      {children}</View>;
};

export default Layout;
