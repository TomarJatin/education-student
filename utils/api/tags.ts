import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { BaseURL } from ".";

export const handleAddTag = async (data: any) => {
    console.log("adding tags")
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "post",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/forum/tag",
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

export const handleUpdateTags = async (data: any, tagId: string) => {
  console.log("data: ", JSON.stringify(data));
  console.log("tagId: ", tagId);
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "put",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/forum/tag/" + tagId,
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

export const handleDeleteTags = async (tagId: string) => {
  console.log("delete tagId", tagId)
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "delete",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/forum/tag/" + tagId,
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

export const getAllTags = async (
    courseId: string,
  limit: number,
  skip: number,
  order: string,
  tagStatus: number,
  setAllTags: any
) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "get",
    maxBodyLength: Infinity,
    url: `${BaseURL}/api/forum/tags?courseId=${courseId}&limit=${limit}&skip=${skip}&order=${order}&status=${tagStatus}`,
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
        setAllTags([...res.data.data])
     }
     else{
        setAllTags([]);
     }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
    });
};

export const getTagById = async (courseId: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "get",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/forum/tag/course/" + courseId,
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
