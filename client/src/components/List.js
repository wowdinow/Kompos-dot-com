import { useNavigation } from "@react-navigation/native";
import { Image, Text } from "react-native";

export default function List({ posts }) {
  const navigation = useNavigation()
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail", { id: posts.id });
        }}
      >
        <Text style={{ fontSize: 16, color: "white" }}>{posts.title}</Text>
        <Image
          source={{
            uri: posts.imgUrl,
          }}
          style={{ width: 70, height: 70, borderRadius: 8 }}
        />
      </TouchableOpacity>
    </>
  );
}
