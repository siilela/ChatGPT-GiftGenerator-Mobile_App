import react, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  SafeAreaView,
  Image
} from "react-native";
import loadingGif from "./assets/loading.gif";
//const API_URL=`https://christman-gift-ideas.vercel.app/api`;
const API_URL = `http://localhost:3000/api`;

export default function App() {
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState("man");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/generate-gifts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setLoading(false);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      Alert.alert(error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.title}>Looking for the best gift ideas 🎁 💡</Text>
        <Image
          source={loadingGif}
          style={styles.loading}
          resizeMode="contain"
        />
      </View>
    );
  }


  const onTryAgain = () => {
    setResult('');
  };
  
  if (result) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Here are some great Christmas gift ideas 🎁 💡
        </Text>
        <Text style={styles.result}>{result}</Text>
        <Pressable onPress={onTryAgain} style={styles.button}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>For who is the gift?</Text>
        <View style={styles.selectorContainer}>
          <Text
            style={[
              styles.selector,
              gender === "man" && { backgroundColor: "green" },
            ]}
            onPress={() => setGender("man")}
          >
            Man
          </Text>
          <Text
            style={[
              styles.selector,
              gender === "woman" && { backgroundColor: "green" },
            ]}
            onPress={() => setGender("woman")}
          >
            Woman
          </Text>
        </View>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          placeholder="Please enter your age"
          onChange={(e) => setAge(e.target.value)}
        ></TextInput>
        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          value={gender}
          placeholder="Please enter your gender"
          onChange={(e) => setGender(e.target.value)}
        ></TextInput>
        <Text style={styles.label}>Minimum Price</Text>
        <TextInput
          style={styles.input}
          value={priceMin}
          placeholder="Please enter min amount "
          onChange={(e) => setPriceMin(e.target.value)}
        ></TextInput>
        <Text style={styles.label}>Maximum Price</Text>
        <TextInput
          style={styles.input}
          value={priceMax}
          placeholder="Please enter max amount"
          onChange={(e) => setPriceMax(e.target.value)}
        ></TextInput>
        <Text style={styles.label}>Hobbies</Text>
        <TextInput
          style={styles.input}
          value={hobbies}
          placeholder="Please enter Hobbies"
          onChange={(e) => setHobbies(e.target.value)}
        ></TextInput>
        {/* submit button */}
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Generate gift ideas</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,

    borderColor: "#353740;",
    borderWidth: 1,
    borderRadius: 4,

    padding: 16,
    marginTop: 6,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: "gray",
  },
  //selector
  selectorContainer: {
    flexDirection: "row",
  },
  selector: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "gainsboro",
    margin: 5,
    padding: 16,
    borderRadius: 5,
    overflow: "hidden",
  },

  button: {
    marginTop: "auto",
    backgroundColor: "#10a37f",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10,
  },
  loading: {
    width: "100%",
  },
});
