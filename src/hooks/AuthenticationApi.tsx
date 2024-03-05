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
  console.log('logInPayload', logInPayload, process.env.BASE_URL);
  try {
    const logInResponse = await api.post('/userLogin', logInPayload);
    loginResp = logInResponse.data;
    console.log(loginResp);
  } catch (error: any) {
    console.log('Error while logging in:', error.response.data, logInPayload);
    loginResp = error.response.data;
  }

  return loginResp;
}
