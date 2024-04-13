import { Image } from "expo-image";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { Color, FontSize } from "../../GlobalStyles";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts";
import { AuthContextType } from "../../types/context";
import { handleLogin, verifyGoogleIdToken } from "../../utils/api/login";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as AppleAuthentication from "expo-apple-authentication";
import Toast from "react-native-simple-toast";
import { BaseURL } from "../../utils/api";
import { StatusBar } from "expo-status-bar";

export default function Login() {
  const { setAuth } = useContext(AuthContext) as AuthContextType;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [component, setComponent] = useState("login");
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");

  const DoLogin = () => {
    if (password === "" || email === "") {
      return;
    }
    handleLogin(email.toLowerCase(), password, setAuth);
  };

  const verifyGoogleIdToken = async (token: string) => {
    let _data = JSON.stringify({
      token: token,
      vendorCode: "DLVBC",
      country: "IN",
    });

    if (token) {
      axios({
        method: "post",
        maxBodyLength: Infinity,
        url: `${BaseURL}/api/auth/user/google/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: _data,
      })
        .then(async (res) => {
          console.log("res: ", res.data);
          if (res.data?.data?.refreshToken) {
            await AsyncStorage.setItem(
              "refreshToken",
              res.data?.data?.refreshToken
            );
          }
          if (res.data?.data?.accessToken) {
            await AsyncStorage.setItem(
              "accessToken",
              res.data?.data?.accessToken
            );
          }
          if (res.data?.message === "mobile verification pending") {
            setComponent("otp");
          }
          else{
            setAuth(true);
          }
          // setAuth(true);
        })
        .catch((err) => {
          console.log("err: ", err);
          if (err?.response?.data?.data?.error) {
            Toast.show(err?.response?.data?.data?.error, Toast.LONG, {
              textColor: "#ffffff",
            });
          } else {
            Toast.show("Try google signIn again", Toast.LONG);
          }
        });
    }
  };

  const handleAppleSignIn = async (
    token: string,
    firstName: string,
    lastName: string,
    email: string,
    authorizationCode: string
  ) => {
    let _data = JSON.stringify({
      token: token,
      firstName: firstName,
      lastName: lastName,
      email: email,
      authorizationCode: authorizationCode,
    });

    if (token) {
      axios({
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.haexr.com/api/auth/apple/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: _data,
      })
        .then(async (res) => {
          if (res.data?.data?.refreshToken) {
            await AsyncStorage.setItem(
              "refreshToken",
              res.data?.data?.refreshToken
            );
          }
        })
        .catch((err) => {
          Toast.show("Try apple signIn again", Toast.LONG);
        });
    }
  };

  const handleGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId:
        "483541033650-p1qmgvgu9i4r9t4lbqe2c7ru3ehcbjum.apps.googleusercontent.com",
      iosClientId:
        "791454100200-ttb7g5fb251cg8rdics8u7u9rh0o5mh0.apps.googleusercontent.com",
    });
    GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      .then((hasPlayService) => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then((userInfo: any) => {
              verifyGoogleIdToken(userInfo.idToken);
              Toast.show("Google Sign In Success", Toast.LONG, userInfo);
              console.log(userInfo);
            })
            .catch((e) => {
              Toast.show(JSON.stringify(e), Toast.LONG);
            });
        }
      })
      .catch((e) => {
        Toast.show(JSON.stringify(e), Toast.LONG);
      });
  };

  const handleGetOtp = async () => {
    let _data = JSON.stringify({
      "mobile": number,
      "country": "IN"
  });

  const accessToken = await AsyncStorage.getItem("accessToken");

    if (number && accessToken) {
      axios({
        method: "post",
        maxBodyLength: Infinity,
        url: `${BaseURL}/api/auth/user/sendOtp`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        data: _data,
      })
        .then(async (res) => {
          console.log("res: ", res.data);
          Toast.show("Otp sent", Toast.LONG);
        })
        .catch((err) => {
          console.log("err: ", err);
          if (err?.response?.data?.data?.error) {
            Toast.show(err?.response?.data?.data?.error, Toast.LONG, {
              textColor: "#ffffff",
            });
          } else {
            Toast.show("Try again", Toast.LONG);
          }
        });
    }
  }

  const handleVerifyOtp = async() => {
    let _data = JSON.stringify({
      "otp": otp,
      "mobile": number,
      "country": "IN"
  });
  const accessToken = await AsyncStorage.getItem("accessToken");

    if (otp && accessToken) {
      axios({
        method: "post",
        maxBodyLength: Infinity,
        url: `${BaseURL}/api/auth/user/verifyOtp`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        data: _data,
      })
        .then(async (res) => {
          console.log("res: ", res.data);
          Toast.show("Otp verified", Toast.LONG);
          setAuth(true);
        })
        .catch((err) => {
          console.log("err: ", JSON.stringify(err));
          if (err?.response?.data?.data?.error) {
            Toast.show(err?.response?.data?.data?.error, Toast.LONG, {
              textColor: "#ffffff",
            });
          } else {
            Toast.show("Try again", Toast.LONG);
          }
        });
    }
  }

  return (
    <SafeAreaView>
      <StatusBar style="auto" backgroundColor={Color.textWhite} />
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
          backgroundColor: Color.textWhite,
          minHeight: Dimensions.get("window").height,
        }}
      >
        {component === "login" ? (
          <>
            <Image
              style={{
                width: 167,
                height: 100,
                marginTop: Dimensions.get("window").height * 0.15,
              }}
              contentFit="contain"
              source={require("../../assets/login-img.png")}
            />
            <View
              style={{
                marginTop: Dimensions.get("window").height * 0.14,
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: FontSize.semi16pxSemi_size,
                  fontWeight: "600",
                  color: Color.textPrim,
                  textAlign: "center",
                }}
              >
                Lets get started
              </Text>
              <Text
                style={{
                  fontSize: FontSize.medium11pxMed_size,
                  fontWeight: "400",
                  color: Color.textSecondary,
                  marginTop: 5,
                  textAlign: "center",
                  width: Dimensions.get("window").width * 0.75,
                }}
              >
                Anyone can join the Millions of members in our community to
                learn cutting edge skills
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                gap: 20,
                marginTop: Dimensions.get("window").height * 0.06,
              }}
            >
              <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={handleGoogleSignIn}
                style={{
                  width: "100%",
                }}
                // disabled={this.state.isSigninInProgress}
              />
              {Platform.OS === "ios" && (
                <AppleAuthentication.AppleAuthenticationButton
                  buttonType={
                    AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                  }
                  buttonStyle={
                    AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                  }
                  cornerRadius={5}
                  style={{
                    width: "100%",
                    height: 40,
                    marginTop: 20,
                  }}
                  onPress={async () => {
                    try {
                      const credential: any =
                        await AppleAuthentication.signInAsync({
                          requestedScopes: [
                            AppleAuthentication.AppleAuthenticationScope
                              .FULL_NAME,
                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                          ],
                        });
                      handleAppleSignIn(
                        credential.identityToken,
                        credential.fullName.givenName,
                        credential.fullName.familyName,
                        credential.email,
                        credential.authorizationCode
                      );
                      // signed in
                    } catch (e: any) {
                      if (e.code === "ERR_REQUEST_CANCELED") {
                        Toast.show(e.code, Toast.LONG, { textColor: "#fff" });
                        // handle that the user canceled the sign-in flow
                      } else {
                        // handle other errors
                        Toast.show(JSON.stringify(e.code), Toast.LONG, {
                          textColor: "#fff",
                        });
                      }
                    }
                  }}
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 10,
                  gap: 10,
                  borderColor: Color.border,
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                }}
              >
                <MaterialIcons name="email" size={24} color="black" />
                <TextInput
                  style={{
                    width: "100%",
                    fontSize: FontSize.medium12pxMed_size,
                  }}
                  placeholder="Login Id"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 10,
                  gap: 10,
                  borderColor: Color.border,
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                }}
              >
                <MaterialIcons name="lock" size={24} color="black" />
                <TextInput
                  style={{
                    width: "100%",
                    fontSize: FontSize.medium12pxMed_size,
                  }}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={DoLogin}
              activeOpacity={0.5}
              style={{
                width: "100%",
                backgroundColor: Color.buttonBg,
                paddingVertical: 10,
                borderRadius: 100,
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontSize: FontSize.medium12pxMed_size,
                  fontWeight: "500",
                  color: Color.textWhite,
                  textAlign: "center",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Image
              style={{
                width: 167,
                height: 100,
                marginTop: Dimensions.get("window").height * 0.15,
              }}
              contentFit="contain"
              source={require("../../assets/login-img.png")}
            />
            
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                gap: 20,
                marginTop: Dimensions.get("window").height * 0.06,
              }}
            >
              <View>
              <Text style={{
                  fontSize: FontSize.rehular10pxRegular_size,
                  fontWeight: "500",
                  marginBottom: 8
                }}>
                  Enter phone number
                </Text>
                <View style={{
                flexDirection: "row",
                gap: 20
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 50,
                  gap: 10,
                  borderColor: Color.border,
                  backgroundColor: Color.cardBg,
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  width: "70%"
                }}
              >
                <TextInput
                  style={{
                    fontSize: FontSize.medium12pxMed_size,
                  }}
                  placeholder="Enter phone number"
                  keyboardType="numeric"
                  value={number}
                  onChangeText={(text) => setNumber(text)}
                />
              </View>
              <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleGetOtp}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 50,
                  gap: 10,
                  borderColor: Color.border,
                  backgroundColor: Color.cardBg,
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                }}
              >
                <Text style={{
                    fontSize: FontSize.medium12pxMed_size,
                  }}>
                  Get Otp
                </Text>
              </TouchableOpacity>
              </View>
              </View>
             
              <View>
                <Text style={{
                  fontSize: FontSize.rehular10pxRegular_size,
                  fontWeight: "500",
                  marginBottom: 8
                }}>
                  Enter Otp
                </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 50,
                  gap: 10,
                  borderColor: Color.border,
                  borderWidth: 1,
                  paddingVertical: 10,
                  backgroundColor: Color.cardBg,
                  paddingHorizontal: 14,
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    fontSize: FontSize.medium12pxMed_size,
                  }}
                  placeholder="Enter OTP"
                  keyboardType="numeric"
                  value={otp}
                  onChangeText={(text) => setOtp(text)}
                />
              </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleVerifyOtp}
              activeOpacity={0.5}
              style={{
                width: "100%",
                backgroundColor: Color.buttonBg,
                paddingVertical: 10,
                borderRadius: 100,
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontSize: FontSize.medium12pxMed_size,
                  fontWeight: "500",
                  color: Color.textWhite,
                  textAlign: "center",
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
