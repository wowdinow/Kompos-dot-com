import { Button, Text, View, Image, ScrollView } from "react-native";
import TopNav from "../components/TopNav";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GET_POSTS } from "../config";
import MainCard from "../components/MainCard";
import Card from "../components/Card";
import List from "../components/List";
import { useQuery } from "@apollo/client";

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) return <Text>"Loading..."</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <>
      <View style={{ flex: 12, backgroundColor: "#403f3d" }}>
        <View style={{ flex: 2 }}>
          <TopNav />
        </View>
        <View style={{ flex: 10 }}>
          <ScrollView>
            <Text
              style={{
                color: "white",
                marginTop: 20,
                fontSize: 24,
                marginBottom: 10,
                marginStart: 20,
              }}>Editorial Top Stories</Text>
            <View style={{ marginBottom: 20, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Detail", {id: data.posts[data.posts.length-1].id})}}
              >
                <MainCard posts={data.posts[posts.length - 1]} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 2,
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 20,
                marginBottom: 50,
                marginHorizontal: 20,
              }}
            >
              {data.posts.map((el) => {
                if (el.id <= posts.length - 2 && el.id <= posts.length - 7) {
                  return (
                      <Card key={el.id} posts={el} />
                  );
                }
              })}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
              }}
            >
              {data.posts.map((el) => {
                if (el.id > 0 && el.id < posts.length - 7) {
                  return (
                      <List key={el.id} posts={el} />
                  );
                }
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
