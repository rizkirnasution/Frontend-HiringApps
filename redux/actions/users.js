import axios from "axios";
import {
  GET_LIST_WORKER_PENDING,
  GET_LIST_WORKER_SUCCESS,
  GET_LIST_WORKER_FAILED,
  GET_LIST_RECRUITER_PENDING,
  GET_LIST_RECRUITER_SUCCESS,
  GET_LIST_RECRUITER_FAILED,
  GET_DETAIL_USER_PENDING,
  GET_DETAIL_USER_SUCCESS,
  GET_DETAIL_USER_FAILED,
} from "../actions/type";

export const getListWorker = (token) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_WORKER_PENDING,
      payload: null,
    });

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/worker`,
      {
        headers: {
          token,
        },
      }
    );

    dispatch({
      type: GET_LIST_WORKER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_LIST_WORKER_FAILED,
      payload: error.message || "Internal Server Error",
    });
  }
};

export const getListRecruiter = (token) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_RECRUITER_PENDING,
      payload: null,
    });

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/recruiter`,
      {
        headers: {
          token,
        },
      }
    );

    dispatch({
      type: GET_LIST_RECRUITER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_LIST_RECRUITER_FAILED,
      payload: error.message || "Internal Server Error",
    });
  }
};

export const getDetailUser = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DETAIL_USER_PENDING,
      payload: null,
    });

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      }
    );

    dispatch({
      type: GET_DETAIL_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DETAIL_USER_FAILED,
      payload: error.message,
    });
  }
};

export const editProfile = async (id, token, data, setErrors) => {
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}/profile`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      }
    );

    return true;
  } catch (error) {
    if (error.response) {
      if (Array.isArray(error.response.data.error)) {
        setErrors(error.response.data.error);
      } else {
        setErrors([{ msg: error.response.data.error }]);
      }
    } else {
      setErrors([{ msg: error.message }]);
    }

    return false;
  }
};

export const editPhoto = async (id, token, data, setErrors) => {
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}/photo`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return true;
  } catch (error) {
    if (error.response) {
      if (Array.isArray(error.response.data.error)) {
        setErrors(error.response.data.error);
      } else {
        setErrors([{ msg: error.response.data.error }]);
      }
    } else {
      setErrors([{ msg: error.message }]);
    }

    return false;
  }
};

export const editPhotoProject = async (id, token, data, setErrors) => {
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/project/${id}/photo`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return true;
  } catch (error) {
    if (error.response) {
      if (Array.isArray(error.response.data.error)) {
        setErrors(error.response.data.error);
      } else {
        setErrors([{ msg: error.response.data.error }]);
      }
    } else {
      setErrors([{ msg: error.message }]);
    }

    return false;
  }
};
