import { AxiosError } from "axios";
import { Alert } from "react-native";
import { ErrorResponse } from "../interface/auth";
import { api } from "../lib/api";
import { ForgotPasswordType, PasswordEmail, ResetType, TokenResetPasswordType } from "../types/auth-data";

export const signInRequest = async (data: PasswordEmail) => {
  try {
    const response = await api.post("login?AUTHORIZATION=production", data);
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = "";
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as ErrorResponse).message;
      Alert.alert(errorMessage);
      throw new Error(errorMessage);
    } else {
      Alert.alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};

export const registerRequest = async (data: PasswordEmail) => {
  try {
    const response = await api.post(
      `registerUsers?AUTHORIZATION=production`,
      data
    );
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = "";
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as ErrorResponse).message;
      throw new Error(errorMessage);
    } else {
      Alert.alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};

export const forgotPasswordRequest = async (data: ForgotPasswordType) => {
  try {
    const { email } = data;
    const response = await api.get(`forgot-password/${email}`, {
      headers: {
        AUTHORIZATION: "AUTHORIZATION=production",
      },
    });
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = "";
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as ErrorResponse).message;
      Alert.alert(errorMessage);
      throw new Error(errorMessage);
    } else {
      Alert.alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};

export const tokenPasswordRequest = async (data: TokenResetPasswordType) => {
  try {
    const { token } = data;
    const response = await api.get(`forgotWithToken/${token}`, {
      headers: {
        AUTHORIZATION: "AUTHORIZATION=production",
      },
    });
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = "";
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as ErrorResponse).message;
      Alert.alert(errorMessage);
      throw new Error(errorMessage);
    } else {
      Alert.alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};

export const resetPasswordRequest = async (
  newPassword: ResetType,
  email: string | null | undefined
) => {
  try {
    const response = await api.put(`resetPassword/${email}`, newPassword);
    const {
      data: { message },
    } = response || {};
    Alert.alert(message);
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = "";
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as ErrorResponse).message;
      Alert.alert(errorMessage);
      throw new Error(errorMessage);
    } else {
      Alert.alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};
