import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

export default function MainStacks(){
    const Stacks = createNativeStackNavigator()
    return(
        <>
            <Stacks.Navigator>
                <Stacks.Screen name='Home' component={HomeScreen} 
                    options={{headerShown: false}}/>
                <Stacks.Screen name='Detail' component={DetailScreen} options={{headerShown: false}} />
            </Stacks.Navigator>
        </>
    )
}