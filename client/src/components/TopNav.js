import { View, Image } from "react-native";
import Kompos from '../../assets/KOMPOS.png'
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

export default function TopNav(){
    return(
        <>
        <View style={{flex: 12, flexDirection: "row", alignItems: "center", backgroundColor: "black", marginTop:10}}>
            <View style={{flex: 11, flexDirection: 'row', marginStart:30, justifyContent:"center"}}>
                <Image source={Kompos} style={{width:50, height: 50}} />
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:"flex-end", gap: 10}}>
                <SimpleLineIcons name="magnifier" size={24} color="white" />
                <Ionicons name="ios-person-outline" size={24} color="white" />
            </View>
        </View>
        </>
    )
}