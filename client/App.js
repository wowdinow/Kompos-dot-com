import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./src/tabs/MainTabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ApolloProvider } from '@apollo/client';
import {client} from "./src/config";

export default function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <SafeAreaView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <MainTabs />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ApolloProvider>
    </>
  );
}
