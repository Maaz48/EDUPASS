import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import {
  TextInput as PaperTextInput,
  Button as PaperButton,
} from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

// Animation setup
const AnimatedProgressSteps = Animated.createAnimatedComponent(ProgressSteps);

// Validation Schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
});

const COLORS = {
  primary: "#0D9E6A",
  textWhite: "white",
};

const DIMENSIONS = {
  headerHeight: 100,
  halfHeaderHeight: 50,
  rowHeight: 50,
};

const Home = () => {
  const [animation] = useState(new Animated.Value(0));
  const [currentStep, setCurrentStep] = useState(0);

  const animate = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
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

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      country: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // console.log(error);
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Form Submitted!",
        visibilityTime: 3000,
        autoHide: true,
      });
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleNext = async (step) => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Please fill out all required fields.",
        visibilityTime: 3000,
        autoHide: true,
      });
      return false; // Prevent moving to the next step
    }
    setCurrentStep(step); // Update step number
    return true; // Allow moving to the next step
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerSpacer} />
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Tracking ID</Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>123123423471</Text>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <AnimatedProgressSteps
            activeStepIconBorderColor={COLORS.primary} // Color for active step border
            activeStepNumColor={COLORS.primary} // Color for active step number
            activeStepIconColor="#fff" // Color for active step icon
            completedStepIconColor={COLORS.primary} // Color for completed step icon
            completedProgressBarColor={COLORS.primary} // Color for completed progress bar
            completedStepNumColor="#fff" // Color for completed step number
            disabledStepNumColor="#d3d3d3" // Color for disabled step number
            stepIndicatorSize={70}
            borderWidth={3}
            activeStep={currentStep}
            onNext={() => handleNext(currentStep + 1)}
            onPrevious={() => handleNext(currentStep - 1)}
            // Customize the labels to show numbers instead of names
            activeStepLabelStyle={styles.stepLabel}
            stepLabelStyle={styles.stepLabel}
          >
            <ProgressStep
              nextBtnTextStyle={styles.buttonText}
              previousBtnTextStyle={styles.buttonText}
              onNext={() => handleNext(currentStep + 1)}
            >
              <Animated.View
                style={[styles.stepContainer, { transform: [{ translateY }] }]}
              >
                <PaperTextInput
                  label="First Name"
                  value={formik.values.firstName}
                  onChangeText={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <Text style={styles.errorText}>
                    {formik.errors.firstName}
                  </Text>
                ) : null}

                <PaperTextInput
                  label="Last Name"
                  value={formik.values.lastName}
                  onChangeText={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <Text style={styles.errorText}>{formik.errors.lastName}</Text>
                ) : null}

                <PaperTextInput
                  label="Email"
                  value={formik.values.email}
                  onChangeText={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  style={styles.input}
                  mode="outlined"
                  keyboardType="email-address"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Text style={styles.errorText}>{formik.errors.email}</Text>
                ) : null}
              </Animated.View>
            </ProgressStep>

            <ProgressStep
              nextBtnTextStyle={styles.buttonText}
              previousBtnTextStyle={styles.buttonText}
              onNext={() => handleNext(currentStep + 1)}
            >
              <Animated.View
                style={[styles.stepContainer, { transform: [{ translateY }] }]}
              >
                <PaperTextInput
                  label="Address"
                  value={formik.values.address}
                  onChangeText={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.address && formik.errors.address ? (
                  <Text style={styles.errorText}>{formik.errors.address}</Text>
                ) : null}

                <PaperTextInput
                  label="City"
                  value={formik.values.city}
                  onChangeText={formik.handleChange("city")}
                  onBlur={formik.handleBlur("city")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.city && formik.errors.city ? (
                  <Text style={styles.errorText}>{formik.errors.city}</Text>
                ) : null}

                <PaperTextInput
                  label="Country"
                  value={formik.values.country}
                  onChangeText={formik.handleChange("country")}
                  onBlur={formik.handleBlur("country")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.country && formik.errors.country ? (
                  <Text style={styles.errorText}>{formik.errors.country}</Text>
                ) : null}
              </Animated.View>
            </ProgressStep>

            <ProgressStep
              previousBtnTextStyle={styles.buttonText}
              nextBtnTextStyle={styles.buttonText}
              finishBtnText="Submit Data"
              onSubmit={formik.handleSubmit}
            >
              <Animated.View
                style={[styles.stepContainer, { transform: [{ translateY }] }]}
              >
                <Text style={styles.confirmationText}>
                  Please confirm your details:
                </Text>
                <Text>First Name: {formik.values.firstName}</Text>
                <Text>Last Name: {formik.values.lastName}</Text>
                <Text>Email: {formik.values.email}</Text>
                <Text>Address: {formik.values.address}</Text>
                <Text>City: {formik.values.city}</Text>
                <Text>Country: {formik.values.country}</Text>
              </Animated.View>
            </ProgressStep>
          </AnimatedProgressSteps>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5", // Light background color
  },
  scrollView: {
    flexGrow: 1,
  },
  stepContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white", // White background for the form container
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  buttonText: {
    color: COLORS.primary, // Match button color with your theme
  },
  stepLabel: {
    fontSize: 16,
    color: COLORS.primary, // Color for step label
  },
  submitButton: {
    marginTop: 20,
  },
  headerContainer: {
    width: "100%",
    minHeight: DIMENSIONS.headerHeight,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerSpacer: {
    width: "100%",
    height: DIMENSIONS.halfHeaderHeight,
  },
  headerContent: {
    flexDirection: "row",
    height: DIMENSIONS.rowHeight,
  },
  headerTextContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: COLORS.textWhite,
    fontSize: 16, // Adjust as needed
  },
});

export default Home;
