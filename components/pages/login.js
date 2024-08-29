import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { BlurView } from "expo-blur";
import BackgroundImage from "../../assets/images/loginbg.png";
const Login = ({ navigation }) => {
  const [animation] = useState(new Animated.Value(0));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const animate = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    animate();
  }, []);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
        <BlurView intensity={100} style={styles.blurView}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView
              contentContainerStyle={styles.inner}
              keyboardShouldPersistTaps="handled"
            >
              <Animated.View
                style={[styles.innerContent, { transform: [{ translateY }] }]}
              >
                <Text style={styles.title}>Login</Text>
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: "#0D9E6A",
                      underlineColor: "transparent",
                    },
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                />
                <TextInput
                  label="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                  style={styles.input}
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: "#0D9E6A",
                      underlineColor: "transparent",
                    },
                  }}
                  returnKeyType="done"
                />
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate("Home")}
                  style={styles.button}
                  theme={{ colors: { primary: "#0D9E6A" } }}
                >
                  Login
                </Button>
                <Button
                  mode="text"
                  onPress={() => console.log("Forgot Password Pressed")}
                  style={styles.forgotButton}
                  labelStyle={styles.forgotButtonLabel}
                >
                  Forgot Password?
                </Button>
                <Button
                  mode="text"
                  onPress={() => navigation.navigate("signup")}
                  style={styles.forgotButton}
                  labelStyle={styles.forgotButtonLabel}
                >
                  Don't have an account ?
                </Button>
              </Animated.View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </BlurView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  inner: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  blurView: {
    flex: 1,
    justifyContent: "center",
  },
  innerContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
    padding: 24,
    elevation: 5,
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    color: "#0D9E6A",
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  forgotButton: {
    marginTop: 12,
  },
  forgotButtonLabel: {
    color: "#0D9E6A",
  },
});

export default Login;
