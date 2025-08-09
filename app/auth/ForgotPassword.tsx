// app/auth/ForgotPassword.tsx

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { Formik } from "formik";
import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as Yup from "yup";
import { auth } from "../../lib/firebase";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .email("Please enter a valid email address"),
});

export default function ForgotPasswordScreen() {
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async (values: { email: string }) => {
        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, values.email);
            Alert.alert(
                "Password Reset",
                "A link to reset your password has been sent to your email.",
                [{ text: "OK", onPress: () => router.back() }]
            );
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Ionicons name="key-outline" size={60} color="#007bff" style={styles.icon} />
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtitle}>
                    Enter your email to receive a password reset link
                </Text>

                <Formik
                    initialValues={{ email: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handlePasswordReset}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color="#666"
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    placeholder="Email Address"
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    style={styles.input}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                            {errors.email && touched.email && (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            )}

                            <TouchableOpacity
                                style={[
                                    styles.submitButton,
                                    loading && styles.submitButtonDisabled,
                                ]}
                                onPress={() => handleSubmit()}
                                disabled={loading}
                            >
                                <Text style={styles.submitButtonText}>
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        justifyContent: "center",
    },
    content: {
        padding: 20,
    },
    icon: {
        alignSelf: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 40,
    },
    form: {
        width: "100%",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    errorText: {
        color: "#dc3545",
        fontSize: 14,
        marginTop: -10,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    submitButtonDisabled: {
        backgroundColor: "#6c757d",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});