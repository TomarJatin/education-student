import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { BaseURL } from ".";

export const handleAddQuestions = async (data: any) => {
    console.log("adding questions", JSON.stringify(data))
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "post",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/question/instructor/question",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    data: data,
  })
    .then((res) => {
      console.log("res: ", res.data);
      if(res.data?.data){
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
    });
};

export const handleUpdateQuestions = async (data: any, videoId: string) => {
  console.log("data: ", JSON.stringify(data));
  console.log("videoId: ", videoId);
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "put",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/question/instructor/question/" + videoId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    data: data,
  })
    .then((res) => {
      console.log("res: ", res.data);
      if(res.data?.data){
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
      if(err?.response?.data?.data){
        console.log(err.response.data.data);
      }
    });
};

export const handleDeleteQuestions = async (videoId: string) => {
  console.log("delete question id", videoId)
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "delete",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/question/instructor/question/" + videoId,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      console.log("res: ", res.data);
      if(res.data?.data){
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
    });
};

export const getAllQuestions = async (
    chapterId: string,
  limit: number,
  skip: number,
  order: string,
  videoStatus: number,
  setAllVideos: any,
  idType: string
) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "get",
    maxBodyLength: Infinity,
    url: `${BaseURL}/api/question/instructor/questions?${idType}=${chapterId}&limit=${limit}&skip=${skip}&order=${order}&status=${videoStatus}`,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      console.log("res: ", res.data, `${BaseURL}/api/question/instructor/question?${idType}=${chapterId}&limit=${limit}&skip=${skip}&order=${order}&status=${videoStatus}`, accessToken);
      if(res.data?.data){
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
     if(res.data?.data){
        setAllVideos([...res.data.data])
     }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
    });
};

export const getQuestionById = async (videoId: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "get",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/question/instructor/question/" + videoId,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      console.log("res: ", res.data);
      if(res.data?.data){
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
    });
};
