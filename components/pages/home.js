import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  TouchableOpacity,
} from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import {
  TextInput as PaperTextInput,
  Button as PaperButton,
  DefaultTheme,
} from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from "expo-document-picker";

import Toast from "react-native-toast-message";

// Validation Schema
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  nationality: Yup.string().required("Nationality is required"),
  contactNumber: Yup.string().required("Contact Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  currentEducationLevel: Yup.string().required("Education Level is required"),
  institutionsAttended: Yup.string().required(
    "Institutions Attended is required"
  ),
  academicPerformance: Yup.string().required(
    "Academic Performance is required"
  ),
  major: Yup.string().required("Major is required"),
  standardizedTests: Yup.string().required(
    "Standardized Test Scores are required"
  ),
  preferredCountries: Yup.array().min(
    1,
    "At least one country must be selected"
  ),
  preferredUniversities: Yup.array().min(
    1,
    "At least one university must be selected"
  ),
  programStartDate: Yup.date().required("Program Start Date is required"),
  budget: Yup.number()
    .required("Budget is required")
    .positive("Budget must be positive"),
  healthInsurance: Yup.string().required("Health Insurance is required"),
  documents: Yup.array().min(1, "At least one document must be uploaded"),
});

// Define Colors and Dimensions
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
  const themeData = { ...DefaultTheme, colors: { primary: "green" } };
  const [animation] = useState(new Animated.Value(0));
  const [currentStep, setCurrentStep] = useState(0);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerField, setDatePickerField] = useState("");
  const [documents, setDocuments] = useState([]);
  console.log(documents);
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
      fullName: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      contactNumber: "",
      email: "",
      address: "",
      currentEducationLevel: "",
      institutionsAttended: "",
      academicPerformance: "",
      major: "",
      standardizedTests: "",
      preferredCountries: [], // Initialize as empty array
      preferredUniversities: [], // Initialize as empty array
      programStartDate: "",
      budget: "",
      healthInsurance: "",
      documents: [],
    },
    validationSchema,
    onSubmit: (values) => {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Form Submitted Successfully!",
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

  const showDatePickerHandler = (field) => {
    setDatePickerField(field);
    setDatePickerVisible(true);
  };

  const handleDateConfirm = (date) => {
    setDatePickerVisible(false);
    if (date) {
      const today = new Date();
      if (date > today) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Date cannot be in the future.",
          visibilityTime: 3000,
          autoHide: true,
        });
        return;
      }
      const formattedDate = date.toISOString().split("T")[0];
      formik.setFieldValue(datePickerField, formattedDate);
    }
  };

  const handleDocumentSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"], // Accept image and PDF files
        multiple: true,
      });

      if (!result.canceled && result.assets) {
        // Update state with selected documents
        setDocuments((prevDocuments) => [...prevDocuments, ...result.assets]);
      }
    } catch (error) {
      console.error("Document selection error:", error);
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerSpacer}>
          <Text>asdas</Text>
        </View>
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
          <Animated.View
            style={[styles.stepContainer, { transform: [{ translateY }] }]}
          >
            <ProgressSteps
              activeStepIconBorderColor={COLORS.primary}
              activeStepNumColor={COLORS.primary}
              activeStepIconColor="#fff"
              completedStepIconColor={COLORS.primary}
              completedProgressBarColor={COLORS.primary}
              completedStepNumColor="#fff"
              disabledStepNumColor="#d3d3d3"
              stepIndicatorSize={70}
              borderWidth={3}
              activeStep={currentStep}
              onNext={() => handleNext(currentStep + 1)}
              onPrevious={() => handleNext(currentStep - 1)}
              activeStepLabelStyle={styles.stepLabel}
              stepLabelStyle={styles.stepLabel}
            >
              <ProgressStep
                nextBtnTextStyle={styles.buttonText}
                onNext={() => handleNext(currentStep + 1)}
              >
                <PaperTextInput
                  label="Full Name"
                  value={formik.values.fullName}
                  onChangeText={formik.handleChange("fullName")}
                  onBlur={formik.handleBlur("fullName")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <Text style={styles.errorText}>{formik.errors.fullName}</Text>
                ) : null}

                <TouchableOpacity
                  onPress={() => showDatePickerHandler("dateOfBirth")}
                >
                  <PaperTextInput
                    label="Date of Birth"
                    value={formik.values.dateOfBirth}
                    editable={false}
                    style={styles.input}
                    mode="outlined"
                    theme={{ colors: { primary: COLORS.primary } }}
                  />
                </TouchableOpacity>
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                  <Text style={styles.errorText}>
                    {formik.errors.dateOfBirth}
                  </Text>
                ) : null}

                <PaperTextInput
                  label="Gender"
                  value={formik.values.gender}
                  onChangeText={formik.handleChange("gender")}
                  onBlur={formik.handleBlur("gender")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.gender && formik.errors.gender ? (
                  <Text style={styles.errorText}>{formik.errors.gender}</Text>
                ) : null}

                <PaperTextInput
                  label="Nationality"
                  value={formik.values.nationality}
                  onChangeText={formik.handleChange("nationality")}
                  onBlur={formik.handleBlur("nationality")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.nationality && formik.errors.nationality ? (
                  <Text style={styles.errorText}>
                    {formik.errors.nationality}
                  </Text>
                ) : null}

                <PaperTextInput
                  label="Contact Number"
                  value={formik.values.contactNumber}
                  onChangeText={formik.handleChange("contactNumber")}
                  onBlur={formik.handleBlur("contactNumber")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.contactNumber && formik.errors.contactNumber ? (
                  <Text style={styles.errorText}>
                    {formik.errors.contactNumber}
                  </Text>
                ) : null}

                <PaperTextInput
                  label="Email"
                  value={formik.values.email}
                  onChangeText={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Text style={styles.errorText}>{formik.errors.email}</Text>
                ) : null}

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
              </ProgressStep>

              <ProgressStep
                nextBtnTextStyle={styles.buttonText}
                previousBtnTextStyle={styles.buttonText}
                onPrevious={() => handleNext(currentStep - 1)}
                onNext={() => handleNext(currentStep + 1)}
              >
                <PaperTextInput
                  label="Current Education Level"
                  value={formik.values.currentEducationLevel}
                  onChangeText={formik.handleChange("currentEducationLevel")}
                  onBlur={formik.handleBlur("currentEducationLevel")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.currentEducationLevel &&
                formik.errors.currentEducationLevel ? (
                  <Text style={styles.errorText}>
                    {formik.errors.currentEducationLevel}
                  </Text>
                ) : null}

                <PaperTextInput
                  label="Institutions Attended"
                  value={formik.values.institutionsAttended}
                  onChangeText={formik.handleChange("institutionsAttended")}
                  onBlur={formik.handleBlur("institutionsAttended")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.institutionsAttended &&
                formik.errors.institutionsAttended ? (
                  <Text style={styles.errorText}>
                    {formik.errors.institutionsAttended}
                  </Text>
                ) : null}

                <PaperTextInput
                  label="Academic Performance"
                  value={formik.values.academicPerformance}
                  onChangeText={formik.handleChange("academicPerformance")}
                  onBlur={formik.handleBlur("academicPerformance")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.academicPerformance &&
                formik.errors.academicPerformance ? (
                  <Text style={styles.errorText}>
                    {formik.errors.academicPerformance}
                  </Text>
                ) : null}

                <PaperTextInput
                  label="Major"
                  value={formik.values.major}
                  onChangeText={formik.handleChange("major")}
                  onBlur={formik.handleBlur("major")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.major && formik.errors.major ? (
                  <Text style={styles.errorText}>{formik.errors.major}</Text>
                ) : null}

                <PaperTextInput
                  label="Standardized Tests"
                  value={formik.values.standardizedTests}
                  onChangeText={formik.handleChange("standardizedTests")}
                  onBlur={formik.handleBlur("standardizedTests")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.standardizedTests &&
                formik.errors.standardizedTests ? (
                  <Text style={styles.errorText}>
                    {formik.errors.standardizedTests}
                  </Text>
                ) : null}

                {/* Add your preferred countries and universities fields here */}
              </ProgressStep>

              <ProgressStep
                nextBtnTextStyle={styles.buttonText}
                previousBtnTextStyle={styles.buttonText}
                onPrevious={() => handleNext(currentStep - 1)}
                onNext={() => handleNext(currentStep + 1)}
              >
                <PaperTextInput
                  label="Program Start Date"
                  value={formik.values.programStartDate}
                  onChangeText={formik.handleChange("programStartDate")}
                  onBlur={formik.handleBlur("programStartDate")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.programStartDate &&
                formik.errors.programStartDate ? (
                  <Text style={styles.errorText}>
                    {formik.errors.programStartDate}
                  </Text>
                ) : null}

                <PaperTextInput
                  label="Budget"
                  value={formik.values.budget}
                  onChangeText={formik.handleChange("budget")}
                  onBlur={formik.handleBlur("budget")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.budget && formik.errors.budget ? (
                  <Text style={styles.errorText}>{formik.errors.budget}</Text>
                ) : null}

                <PaperTextInput
                  label="Health Insurance"
                  value={formik.values.healthInsurance}
                  onChangeText={formik.handleChange("healthInsurance")}
                  onBlur={formik.handleBlur("healthInsurance")}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: COLORS.primary } }}
                />
                {formik.touched.healthInsurance &&
                formik.errors.healthInsurance ? (
                  <Text style={styles.errorText}>
                    {formik.errors.healthInsurance}
                  </Text>
                ) : null}
              </ProgressStep>
              <ProgressStep
                finishBtnTextStyle={styles.buttonText}
                onSubmit={() => formik.handleSubmit()}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleDocumentSelection}
                >
                  <Text style={styles.buttonText}>Select Documents</Text>
                </TouchableOpacity>
                {formik.touched.documents && formik.errors.documents ? (
                  <Text style={styles.errorText}>
                    {formik.errors.documents}
                  </Text>
                ) : null}
                <Text>Review & Submit</Text>
              </ProgressStep>
            </ProgressSteps>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
        maximumDate={new Date()} // Restrict future dates
        customThemeVariant={themeData}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    height: DIMENSIONS.headerHeight,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  headerSpacer: {
    height: DIMENSIONS.halfHeaderHeight,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  headerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    color: COLORS.textWhite,
  },
  scrollView: {
    padding: 20,
  },
  stepContainer: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  stepLabel: {
    fontSize: 14,
  },
  buttonText: {
    color: COLORS.primary,
  },
});

export default Home;
