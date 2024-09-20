import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../utils/AxiosInstance';

interface AuthState {
  user: [];
  loading: boolean;
  error: {} | null;
  access_token: string;
  userToken: any;
  success: [];
}
// interface PayloadType {
//   error: { message: string } | null;
// }

const initialState: AuthState = {
  user: [],
  loading: false,
  error: null,
  access_token: ' ',
  userToken: ' ',
  success: [],
};

export const baseApiUrl = 'http://localhost:3000';
//
//export const baseApiUrl = 'https://otisignals.onrender.com';

export const register = createAsyncThunk(
  'auth/register',
  async (userData: any) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/api/v1/auth/register/`,
        userData,
      );
      //  console.log(response, 'Registration Response');
      return response.data;
    } catch (error) {
      //  console.log(error, 'Registration Error');
      return (error as AxiosError).response;
    }
  },
);

export const login = createAsyncThunk('auth/login', async (loginData: any) => {
  try {
    const response = await axios.post(
      `${baseApiUrl}/api/v1/auth/login/`,
      loginData,
    );
    const tradersignalsapp_access_token = response.data.token;
    const tradersignalsapp_user = response?.data?.user;

    if (tradersignalsapp_access_token) {
      AsyncStorage.setItem(
        'tradersignalsapp_access_token',
        tradersignalsapp_access_token,
      );
    }
    // if (tradersignalsapp_user) {
    //   AsyncStorage.setItem('tradersignalsapp_user', tradersignalsapp_user);
    // }
    //jsjsj
    return response.data;
  } catch (error) {
    return (error as AxiosError).response;
  }
});

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (emailData: any) => {
    try {
      const response = await axios.get(
        `${baseApiUrl}/api/v1/auth/generateOTP/forgot/${emailData}`,
      );
      return response.status;
    } catch (error) {
      return (error as AxiosError).response?.status;
    }
  },
);

export const otpVerification = createAsyncThunk(
  'auth/otpVerification',
  async (otpData: any) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/api/v1/auth/verifyOTPs/`,
        otpData,
      );
      //  console.log(response.data, 'OTP Verification Response');
      return response.data;
    } catch (error) {
      //  console.log(error, 'OTP Verification Error');
      return (error as AxiosError).response?.data;
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (newData: any) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/api/v1/auth/reset-password/`,
        newData,
      );
      return response.data;
    } catch (error) {
      //  console.log(error, 'OTP Verification Error');
      return (error as AxiosError).response?.data;
    }
  },
);

export const generateOTP = createAsyncThunk(
  'auth/generateOTP',
  async (email: any) => {
    try {
      const response = await axios.get(
        `${baseApiUrl}/api/v1/auth/generateOTPs/${email}`,
      );
      console.log(response?.data, 'data');
      return response.data;
    } catch (error) {
      return (error as AxiosError).response?.data;
    }
  },
);

export const newUsersOtp = createAsyncThunk(
  'auth/newUsersOtp',
  async (email: any) => {
    try {
      const response = await axios.get(
        `${baseApiUrl}/api/v1/auth/generateOTPs/otp/${email}`,
      );
      console.log(response?.data, 'data');
      return response.data;
    } catch (error) {
      return (error as AxiosError).response?.data;
    }
  },
);

// export const forgotPassword = createAsyncThunk(
//   'auth/forgotPassword',
//   async (emailData: any) => {
//     try {
//       const response = await axios.post(
//         `${baseApiUrl}/auth/request-password-reset/`,
//         emailData,
//       );
//     //  console.log(response, 'Forgot Password Response');
//       return response.status;
//     } catch (error) {
//     //  console.error(error, 'Forgot Password Error');
//       return (error as AxiosError).response?.status;
//     }
//   },
// );

// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async (resetData: any) => {
//     try {
//       const response = await axios.post(
//         `${baseApiUrl}/auth/confirm-password-reset/`,
//         resetData,
//       );
//     //  console.log(response, 'Reset Password Response');
//       return response.status;
//     } catch (error) {
//     //  console.error(error, 'Reset Password Error');
//       return (error as AxiosError).response?.status;
//     }
//   },
// );

// export const resendOTP = createAsyncThunk(
//   'auth/resendOTP',
//   async (resendOTP: any) => {
//     try {
//       const response = await axios.post(
//         `${baseApiUrl}/auth/resend-otp/`,
//         resendOTP,
//       );
//     //  console.log(response, 'Resend OTP ');
//       return response.status;
//     } catch (error) {
//     //  console.error(error, 'Reset Password Error');
//       return (error as AxiosError).response?.status;
//     }
//   },
// );

// export const validateOTP = createAsyncThunk(
//   'auth/validateOTP',
//   async (validateOTP: any) => {
//     try {
//       const response = await axios.post(
//         `${baseApiUrl}/auth/validate-otp/`,
//         validateOTP,
//       );
//     //  console.log(response, 'Resend OTP ');
//       return response.data;
//     } catch (error) {
//     //  console.error(error, 'Reset Password Error');
//       return (error as AxiosError).response?.data;
//     }
//   },
// );

// export const confirmPasswordReset = createAsyncThunk(
//   'auth/confirmPasswordReset',
//   async (confirmPasswordReset: any) => {
//     try {
//       const response = await axios.post(
//         `${baseApiUrl}/auth/confirm-password-reset/`,
//         confirmPasswordReset,
//       );
//     //  console.log(response, 'Resend OTP ');
//       return response.status;
//     } catch (error) {
//     //  console.error(error, 'Reset Password Error');
//       return (error as AxiosError).response?.status;
//     }
//   },
// );
//Ib@antigravitygroup.ng
//NewTesting1234@

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    // Clear the stored token and user data
    await AsyncStorage.removeItem('tradersignalsapp_access_token');
    await AsyncStorage.removeItem('tradersignalsapp_user');
    return;
  } catch (error) {
    //  console.log('Logout Error:', error);
    return error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUs: state => {
      state.user = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, state => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      })
      .addCase(logout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false;
        state.user = [];
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userToken = action.payload.access_Token;
        {
          //  console.log(action.payload, 'payload');
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(forgotPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(newUsersOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newUsersOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(newUsersOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(generateOTP.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(generateOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(resetPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(otpVerification.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(otpVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(otpVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
  },
});

export default authSlice.reducer;
export const {logoutUs} = authSlice.actions;
