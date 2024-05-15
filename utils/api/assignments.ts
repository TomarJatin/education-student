import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { BaseURL } from ".";

export const handleAddAssignments = async (data: any) => {
  console.log("adding video", JSON.stringify(data));
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "post",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/assignment/instructor/assignment",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    data: data,
  })
    .then((res) => {
      console.log("res: ", res.data);
      if (res.data?.data) {
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
    });
};

export const handleUpdateStudentAssignments = async (
  data: any,
  assignmentId: string
) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const url =
      BaseURL + "/api/assignment/instructor/assignment/" + assignmentId;
    const response = await axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    if (response.status === 200) {
      Toast.show("Assignment Submitted successfully", Toast.LONG);
      return response.data?.data;
    }
  } catch (err: any) {
    console.log(err.response.message);
  }
};

export const initiateAssignment = async (data: any) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const url =
      BaseURL + "/api/courseManagement/sudentAssignment?isSubmitted=false";
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    if (response.status === 200) {
      Toast.show("Assignment Started successfully", Toast.LONG);
      return response;
    }
  } catch (err: any) {
    console.log("ERROR RM");
    console.log("RM ERR", err);
  }
};

export const handleUpdateAssignments = async (
  data: any,
  assignmentId: string
) => {
  console.log("data: ", JSON.stringify(data));
  console.log("videoId: ", assignmentId);
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "put",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/assignment/instructor/assignment/" + assignmentId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    data: data,
  })
    .then((res) => {
      console.log("res: ", res.data);
      if (res.data?.data) {
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
      if (err?.response?.data?.data) {
        console.log(err.response.data.data);
      }
    });
};

export const handleDeleteAssignments = async (assignmentId: string) => {
  console.log("delete video id", assignmentId);
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "delete",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/assignment/instructor/assignment/" + assignmentId,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      console.log("res: ", res.data);
      if (res.data?.data) {
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
    });
};

export const getAllAssignments = async (
  chapterId: string,
  limit: number,
  skip: number,
  order: string,
  assignmentStatus: number,
  setAllVideos: any
) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "get",
    maxBodyLength: Infinity,
    url: `${BaseURL}/api/assignment/student/assignments?chapterId=${chapterId}&limit=${limit}&skip=${skip}&order=${order}&status=${assignmentStatus}`,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      console.log("res: ", res.data);
      if (res.data?.data) {
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
      if (res.data?.data) {
        setAllVideos([...res.data.data]);
      }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
    });
};

export const getAssignmentsById = async (assignemntId: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  axios({
    method: "get",
    maxBodyLength: Infinity,
    url: BaseURL + "/api/assignment/instructor/assignment/" + assignemntId,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => {
      console.log("res: ", res.data);
      if (res.data?.data) {
        Toast.show(JSON.stringify(res.data?.data), Toast.LONG);
      }
    })
    .catch((err) => {
      console.log("base url err: ", err?.response?.data);
    });
};
