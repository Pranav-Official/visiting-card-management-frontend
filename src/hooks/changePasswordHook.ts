import axios from 'axios';
import api from './api';

export interface changePasswordProp {
  email: string;
  new_password: string;
  jwt_token: string;
}

type changePasswordReturn = {
  user_email: string;
  message: string;
  status: boolean;
};

interface changePasswordResponse {
  statusCode?: string;
  changePasswordResp: changePasswordReturn;
}

export async function changePassword({
  email,
  new_password,
  jwt_token,
}: changePasswordProp): Promise<changePasswordResponse> {
  let statusCode = '';
  let changePasswordResp: changePasswordReturn = {
    user_email: '',
    message: '',
    status: false,
  };
  try {
    const changePasswordDetails = await api.patch(
      '/changePassword',
      {
        email,
        new_password,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      },
    );

    changePasswordResp = changePasswordDetails.data;
    statusCode = changePasswordDetails.status.toString();
    return { statusCode, changePasswordResp };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Error while changing password:', error);
      changePasswordResp = error.response?.data;
    } else {
      console.log('Error while signing in', error);
      changePasswordResp = {
        user_email: '',
        status: false,
        message: 'Error while changing password',
      };
    }
    return { changePasswordResp };
  }
}
