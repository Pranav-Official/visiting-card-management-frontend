import api from './api';

import { useNavigation } from '@react-navigation/native';

interface LogInUserProp {
  loginUsername: string;
  loginPassword: string;
}
interface signUpUserProp {
  signUpUsername: string;
  signUpPassword: string;
  signUpEmail: string;
}

interface LoginUserResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
    user_id: string;
  };
}

export async function loginUser({
  loginUsername,
  loginPassword,
}: LogInUserProp): Promise<LoginUserResponse> {
  let loginResp: any;

  const logInPayload = {
    user_email: loginUsername,
    password: loginPassword,
  };
  try {
    const logInResponse = await api.post('/userLogin', logInPayload);
    loginResp = logInResponse.data;
    console.log(loginResp);
  } catch (error: any) {
    console.log('Error while logging in:', error, logInPayload);
    loginResp = {
      status: false,
      message: error.message,
      data: {
        error: error.message,
      },
    };
  }

  return loginResp;
}

export const SignUpUser = async ({
  signUpUsername,
  signUpPassword,
  signUpEmail,
}: signUpUserProp): Promise<LoginUserResponse> => {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let loginResp: any;

  const signUpPayload = {
    user_fullname: signUpUsername,
    user_email: signUpEmail,
    password: signUpPassword,
  };
  console.log('signUpPayload', signUpPayload);
  try {
    const logInResponse = await api.post('/userRegistration', signUpPayload);
    loginResp = logInResponse.data;
    // console.log(loginResp);
  } catch (error: any) {
    console.log('Error while logging in:', error, signUpPayload);
    errorMessage = error.message;
  }

  return loginResp;
};
