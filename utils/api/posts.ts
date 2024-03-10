import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { BaseURL } from ".";

export const handleAddPosts = async (data: any) => {
    console.log("adding post")
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "post",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/forum/post",
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

export const handleUpdatePosts = async (data: any, videoId: string) => {
  console.log("data: ", JSON.stringify(data));
  console.log("videoId: ", videoId);
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "put",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/test/instructor/test/" + videoId,
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

export const handleDeletePosts = async (videoId: string) => {
  console.log("delete video id", videoId)
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "delete",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/test/instructor/test/" + videoId,
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

export const getAllPosts = async (
    courseId: string,
  limit: number,
  skip: number,
  order: string,
  postStatus: number,
  setAllPosts: any
) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "get",
    maxBodyLength: Infinity,
    url: `${BaseURL}/api/forum/posts?courseId=${courseId}&limit=${limit}&skip=${skip}&order=${order}&status=${postStatus}`,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      console.log("res: ", JSON.stringify(res.data));
      if(res.data?.data){
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
     if(res.data?.data){
        setAllPosts([...res.data.data])
     }
     else{
        setAllPosts([]);
     }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
    });
};

export const getPostById = async (postId: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "get",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/forum/post/" + postId,
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
