import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { BaseURL } from ".";

export const handleAddNotes = async (data: any) => {
    console.log("adding video")
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "post",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/note/instructor/note",
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

export const handleUpdateNotes = async (data: any, videoId: string) => {
  console.log("data: ", JSON.stringify(data));
  console.log("videoId: ", videoId);
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "put",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/note/instructor/note/" + videoId,
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

export const handleDeleteNotes = async (videoId: string) => {
  console.log("delete video id", videoId)
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "delete",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/note/instructor/note/" + videoId,
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

export const getAllNotes = async (
    chapterId: string,
  limit: number,
  skip: number,
  order: string,
  notesStatus: number,
  setAllNotes: any
) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "get",
    maxBodyLength: Infinity,
    url: `${BaseURL}/api/note/instructor/notes?chapterId=${chapterId}&limit=${limit}&skip=${skip}&order=${order}&status=${notesStatus}`,
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
        setAllNotes([...res.data.data])
     }
     else{
      setAllNotes([]);
     }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
    });
};

export const getTestById = async (videoId: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "get",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/note/instructor/note/" + videoId,
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
