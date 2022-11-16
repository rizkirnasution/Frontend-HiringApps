import axios from "axios";
import { setCookie } from "cookies-next";

export const login = async (data, setErrors) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      data
    );
    setCookie("token", `${res.data.token.jwt}`);
    setCookie("id", `${res.data.token.id}`);
    setCookie("role", `${res.data.token.role}`);

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

export const register = async (data, setErrors) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);

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
