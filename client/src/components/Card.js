import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Card({ posts, navigation }) {
  console.log(navigation);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail", { id: posts.id });
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: posts.imgUrl,
            }}
            style={{
              width: 165,
              height: 150,
              borderRadius: 8,
              marginBottom: 5,
            }}
          />
          <Text style={{ color: "white", fontSize: 16 }}>{posts.title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
