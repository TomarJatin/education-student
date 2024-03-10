import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { BaseURL } from ".";

export const uploadFiles = async (file: any) => {
  return new Promise((resolve, reject) => {
    let data = new FormData();
    data.append("files", file);
    axios({
      method: "post",
      maxBodyLength: Infinity,
      url: "https://image-backend-go.onrender.com/api/instructor/upload/video",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .then((res) => {
        console.log("res: ", res.data);
        resolve(res.data);
      })
      .catch((err) => {
        Toast.show(JSON.stringify(err), Toast.LONG);
        console.log("error in uploading.... ", err.response.data);
        reject(null);
      });
  });
};
