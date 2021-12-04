import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import 'react-native-gesture-handler';
import NavigatorContainer from './navigation';


const Stack = createStackNavigator();

const Navigator = () => {
    /*const notificationListener = useRef();
    const responseListener = useRef();
    const dispatch = useAppDispatch()*/


    /* useEffect(() => {

         notificationListener.current = Notifications.addNotificationResponseReceivedListener(value => {
             dispatch(addToNotificationList(value));
             console.log(value);
             const url = value.notification.request.content.data.data.screen;
             console.log(url);


         });
         return () => {
             Notifications.removeNotificationSubscription(notificationListener.current);
             Notifications.removeNotificationSubscription(responseListener.current);
         };
     }, []);*/
    return (
        <NavigationContainer>
           <NavigatorContainer/>
        </NavigationContainer>


    )
}
export default Navigator;
