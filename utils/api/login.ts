import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { BaseURL } from ".";

export const handleLogin = async (
  email: string,
  password: string,
  setAuth: any
) => {
  let data = JSON.stringify({
    email: email,
    password: password,
  });
  axios({
    method: "post",
    url: BaseURL + "/api/auth/instructor/local/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then(async (res) => {
      if (res.data?.data) {
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
      if (res.data?.data?.refreshToken) {
        await AsyncStorage.setItem(
          "refreshToken",
          res.data?.data?.refreshToken
        );
      }
      if (res.data?.data?.accessToken) {
        await AsyncStorage.setItem("accessToken", res.data?.data?.accessToken);
      }
      setAuth(true);
    })
    .catch((err) => {
      console.log("err: ", err, err.response.data.data.error);
      if (err.response.data.data.error) {
        Toast.show(err.response.data.data.error, Toast.LONG);
      }
    });
};

export const checkRefreshToken = async (setAuth: any) => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (refreshToken === null) {
    console.log("no refresh token here");
    return false;
  } else {
    axios({
      method: "post",
      maxBodyLength: Infinity,
      url: BaseURL+"/api/auth/token/refresh",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        refreshToken: refreshToken,
      }),
    })
      .then(async (res) => {
        if(res.data?.data){
          Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
          setAuth(true);
        }
        if (res.data?.data?.refreshToken) {
          await AsyncStorage.setItem(
            "refreshToken",
            res.data?.data?.refreshToken
          );
          console.log("refresh token updated");
        }
        if (res.data?.data?.accessToken) {
          await AsyncStorage.setItem(
            "accessToken",
            res.data?.data?.accessToken
          );
          console.log("accessToken token updated", res.data.data.accessToken);
        }
      })
      .catch((err) => {
        console.log("error: ", err);
        if(err.response.data.data.error){
            Toast.show(err.response.data.data.error, Toast.LONG);
          }
        setAuth(false);
      });
  }
};

export const verifyGoogleIdToken = async (token: string) => {
  console.log("verifing google token: ")
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
        console.log("res.........: ", res.data);
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
