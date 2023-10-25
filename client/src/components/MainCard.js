import { Image, Text, View } from "react-native";

export default function MainCard({ posts }) {
  return (
    <>
        <View style={{}}>
          <Image
            source={{
              uri: posts.imgUrl,
            }}
            style={{
              width: 350,
              height: 200,
              borderRadius: 8,
              marginBottom: 5,
            }}
          />
        </View>
        <View>
          <Text style={{ color: "white", fontSize: 16 }}>{posts.title}</Text>
        </View>
    </>
  );
}
