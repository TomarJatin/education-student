import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BaseURL } from ".";
import Toast from "react-native-simple-toast";

export const getBannerByStudent = async (
  limit: number,
  skip: number,
  order: string,
  bannerStatus: number,
  setBanners: any
) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "get",
    maxBodyLength: Infinity,
    url: `${BaseURL}/api/banner/student/banners?limit=${limit}&skip=${skip}&order=${order}&status=${bannerStatus}`,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      console.log("res: ", res.data);
      if (res.data?.data) {
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
      setBanners([...res.data.data]);
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
    });
};
