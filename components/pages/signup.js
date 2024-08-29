import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
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

const SignupPage = ({ navigation }) => {
  const [animation] = useState(new Animated.Value(0));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        <BlurView intensity={120} style={styles.blurView}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView
              contentContainerStyle={styles.inner}
              keyboardShouldPersistTaps="handled"
            >
              <Animated.View
                style={[styles.innerContent, { transform: [{ translateY }] }]}
              >
                <TextInput
                  label="First Name"
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  style={styles.input}
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: "#0D9E6A",
                      underlineColor: "transparent",
                    },
                  }}
                  autoCapitalize="words"
                />
                <TextInput
                  label="Last Name"
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                  style={styles.input}
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: "#0D9E6A",
                      underlineColor: "transparent",
                    },
                  }}
                  autoCapitalize="words"
                />
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
                  onPress={() => navigation.navigate("login")}
                  style={styles.button}
                  theme={{ colors: { primary: "#0D9E6A" } }}
                >
                  Signup
                </Button>
                <Button
                  onPress={() => navigation.navigate("login")}
                  mode="text"
                  style={styles.forgotButton}
                  labelStyle={styles.forgotButtonLabel}
                >
                  Already have an Account ?
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
  blurView: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  inner: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  innerContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 8,
    padding: 24,
    elevation: 5,
    alignSelf: "center",
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

export default SignupPage;
