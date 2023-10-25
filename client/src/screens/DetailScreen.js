import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import TopNav from "../components/TopNav";
import { GET_SINGLE_POST } from "../config";
import { useQuery } from "@apollo/client";

export default function DetailScreen({id}) {
    const { loading, error, data } = useQuery(GET_SINGLE_POST, {variable: {id}});
  if (loading) return <Text>"Loading..."</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;
  return (
    <>
      <View
        style={{
          flex: 12,
          justifyContent: "center",
          backgroundColor: "#403f3d",
        }}
      >
        <View style={{ flex: 2 }}>
          <TopNav />
        </View>
        <View style={style.container}>
          <ScrollView>
            <Text style={{ fontSize: 36, color: "white" }}>{data.post.title}</Text>
            <View style={{flex: 1, alignItems: "center", marginVertical: 20}}>
            <Image
              source={{
                uri: data.post.imgUrl,
              }}
              style={{ width: 370, height: 350, borderRadius: 10 }}
            />
            </View>
            <Text style={{color: "white", fontSize: 20}} >{data.post.content}</Text>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 10,
    marginTop: 20,
    marginHorizontal: 10
    // alignItems: "center"
  },
});
