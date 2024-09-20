import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseApiUrl} from '../Auth/Auth';

interface profileState {
  loading: boolean;
  error: {} | null;
  success: [];
}

const initialState: profileState = {
  loading: false,
  error: null,
  success: [],
};

interface FollowUserParams {
  userId: string;
  followerId: string;
}

interface FollowUserResponse {
  following: boolean;
  followersCount: number;
}

export const getCurrentUser = createAsyncThunk(
  'profile/getCurrentUser',
  async () => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.get(
        `${baseApiUrl}/api/v1/auth/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      ////console.log(response, 'Registration Response');
      return response.data;
    } catch (error) {
      ////console.log(error, 'Registration Error');
      return (error as AxiosError).response;
    }
  },
);

interface PostWithdrawalPayload {
  amount: number;
  recipientAddress: string;
}

export const postWithdrawal = createAsyncThunk<
  any, // Replace 'any' with your expected return type from the API response
  PostWithdrawalPayload,
  {rejectValue: AxiosError}
>(
  'profile/postWithdrawal',
  async ({amount, recipientAddress}, {rejectWithValue}) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      // Make POST request to update user data
      const response = await axios.post(
        `${baseApiUrl}/api/v1/auth/users/withdraw`,
        {amount, recipientAddress},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );

      return response.data; // Return the data received from the API
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error);
      } else {
        //console.error('Error during withdrawal:', error);
        throw error; // Rethrow the error to propagate it to the caller
      }
    }
  },
);

export const profilePic = createAsyncThunk(
  'profile/profilePic',
  async (userData: FormData) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      // Make PUT request to update user data
      const response = await axios.put(
        `${baseApiUrl}/api/v1/auth/profilepic/`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
            'Content-Type': 'multipart/form-data', // Set the content type for form data
          },
        },
      );

      return response.data;
    } catch (error) {
      ////console.log(error, 'Registration Error');
      return (error as AxiosError).response;
    }
  },
);

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (userData: any) => {
    try {
      ////console.log(userData, 'userDatauserData');
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.put(
        `${baseApiUrl}/api/v1/auth/updateUser/`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      ////console.log(response, 'Registration Response');
      return response.data;
    } catch (error) {
      ////console.log(error, 'Registration Error');
      return (error as AxiosError).response;
    }
  },
);

export const reportUser = createAsyncThunk(
  'profile/reportUser',
  async (userData: any) => {
    try {
      ////console.log(userData, 'userDatauserData');
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.post(
        `${baseApiUrl}/api/v1/requests/report`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      ////console.log(response, 'Registration Response');
      return response.data;
    } catch (error) {
      ////console.log(error, 'Registration Error');
      return (error as AxiosError).response;
    }
  },
);

export const updatePassword = createAsyncThunk(
  'profile/updatePassword',
  async (userData: any) => {
    try {
      ////console.log(userData, 'userDatauserData');
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.put(
        `${baseApiUrl}/api/v1/auth/updateUser/password`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      ////console.log(response, 'Registration Response');
      return response.data;
    } catch (error) {
      ////console.log(error, 'Registration Error');
      return (error as AxiosError).response;
    }
  },
);

export const getUserProfile = createAsyncThunk(
  'profile/getUserProfile',
  async (userData: any) => {
    try {
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.get(
        `${baseApiUrl}/api/v1/auth/users/${userData}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      ////console.log(response, 'Registration Response');
      return response.data;
    } catch (error) {
      ////console.log(error, 'Registration Error');
      return (error as AxiosError).response;
    }
  },
);

export const getProviders = createAsyncThunk(
  'profile/getProviders',
  async () => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.get(
        `${baseApiUrl}/api/v1/auth/users/providers`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      ////console.log(response, 'Registration Response');
      return response.data;
    } catch (error) {
      ////console.log(error, 'Registration Error');
      return (error as AxiosError).response;
    }
  },
);

export const getSingleUser = createAsyncThunk(
  'profile/getSingleUser',
  async (data: string) => {
    try {
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.get(
        `${baseApiUrl}/api/v1/auth/users/${data}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      return response.data;
    } catch (error) {
      return (error as AxiosError).response;
    }
  },
);

export const deleteUser = createAsyncThunk('profile/deleteUser', async () => {
  try {
    const accessToken = await AsyncStorage.getItem(
      'tradersignalsapp_access_token',
    );

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const response = await axios.delete(
      `${baseApiUrl}/api/v1/auth/users/`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return (error as AxiosError).response;
  }
});

export const uploadVideo = createAsyncThunk(
  'profile/uploadVideo',
  async (formData: any) => {
    try {
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.post(
        `${baseApiUrl}/api/v1/auth/videos/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
          },
        },
      );
      //console.log(formData, 'formDataformData');
      return response.data;
    } catch (error) {
      return (error as AxiosError).response;
    }
  },
);

export const followUser = createAsyncThunk<
  FollowUserResponse,
  FollowUserParams
>('profile/followUser', async ({userId, followerId}, thunkAPI) => {
  try {
    //console.log(followerId, userId, 'followerIdfollowerId');
    // Retrieve the access token from AsyncStorage
    const accessToken = await AsyncStorage.getItem(
      'tradersignalsapp_access_token',
    );

    if (!accessToken) {
      return thunkAPI.rejectWithValue('Access token not found');
    }

    const response = await axios.post<FollowUserResponse>(
      `${baseApiUrl}/api/v1/auth/users/toggle-follow/${userId}`,
      {followerId}, // Wrap followerId in an object
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Server error');
    }
    return thunkAPI.rejectWithValue('Unknown error occurred');
  }
});

export const getFreeCommunityFollowed = createAsyncThunk(
  'profile/getFreeCommunityFollowed',
  async (userId: any) => {
    try {
      //console.log(userId, 'userIduserIduserIduserIduserId')
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.get(
        `${baseApiUrl}/api/v1/auth/users/free-community-followed/${userId}/`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      //console.log(response.data, 's/free-commu Response');
      return response.data;
    } catch (error) {
      ////console.log(error, 'Registration Error');
      return (error as AxiosError).response;
    }
  },
);

//${baseApiUrl}/api/v1/courses/

export const getAcademycoursesList = createAsyncThunk(
  'profile/getAcademycoursesList',
  async () => {
    try {
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.get(
        `${baseApiUrl}/api/v1/courses/`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      return response.data;
    } catch (error) {
      return (error as AxiosError).response;
    }
  },
);

const Profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadVideo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadVideo.fulfilled, state => {
        state.loading = false;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(followUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(reportUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reportUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(reportUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(postWithdrawal.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postWithdrawal.fulfilled, state => {
        state.loading = false;
      })
      .addCase(postWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getSingleUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(getProviders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviders.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(getFreeCommunityFollowed.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFreeCommunityFollowed.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getFreeCommunityFollowed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getCurrentUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getAcademycoursesList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAcademycoursesList.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getAcademycoursesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(deleteUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(updateUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(getUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(profilePic.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profilePic.fulfilled, state => {
        state.loading = false;
      })
      .addCase(profilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(updatePassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
  },
});

export default Profile.reducer;
