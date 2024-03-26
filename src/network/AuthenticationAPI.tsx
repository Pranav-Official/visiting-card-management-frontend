import axios from 'axios';
import api from './api';

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
  data?: {
    token: string;
    user_id: string;
  };
}

export async function loginUser({
  loginUsername,
  loginPassword,
}: LogInUserProp): Promise<LoginUserResponse> {
  let loginResp: LoginUserResponse;

  const logInPayload = {
    user_email: loginUsername,
    password: loginPassword,
  };
  try {
    const logInResponse = await api.post('/userLogin', logInPayload);
    loginResp = logInResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Error while signing in:', error);
      loginResp = error.response?.data;
    } else {
      console.log('Error while signing in', error);
      loginResp = { status: false, message: 'Error while signing in' };
    }
  }

  return loginResp;
}

///////////////////////
type SignUpRespType = {
  status: boolean;
  message: string;
  data?: {
    user_id: string;
    token: string;
  };
};
export const SignUpUser = async ({
  signUpUsername,
  signUpPassword,
  signUpEmail,
}: signUpUserProp): Promise<SignUpRespType> => {
  let signUpResp: SignUpRespType;

  const signUpPayload = {
    user_fullname: signUpUsername,
    user_email: signUpEmail,
    password: signUpPassword,
  };
  try {
    const logInResponse = await api.post('/userRegistration', signUpPayload);
    signUpResp = logInResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Error while signing in:', error);
      signUpResp = error.response?.data;
    } else {
      console.log('Error while signing in', error);
      signUpResp = { status: false, message: 'Error while signing in' };
    }
  }

  return signUpResp;
};
