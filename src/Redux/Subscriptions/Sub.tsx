import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseApiUrl} from '../Auth/Auth';

interface subState {
  loading: boolean;
  error: {} | null;
  success: [];
}

const initialState: subState = {
  loading: false,
  error: null,
  success: [],
};

export const getWithdrawals = createAsyncThunk(
  'sub/getWithdrawals',
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
        `${baseApiUrl}/api/v1/withdraws/withdrawals`,
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

export const getAllCourses = createAsyncThunk('sub/getAllCourses', async () => {
  try {
    // Retrieve the access token from AsyncStorage
    const accessToken = await AsyncStorage.getItem(
      'tradersignalsapp_access_token',
    );

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(`${baseApiUrl}/api/v1/courses/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
      },
    });
    console.log(response.data, 'courses-courser');

    return response.data;
  } catch (error) {
    return (error as AxiosError).response;
  }
});
export const getWalletAddress = createAsyncThunk(
  'sub/getWalletAddress',
  async (data: any) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.get(
        `${baseApiUrl}/api/v1/wallet-addresses/${data}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      console.log(response.data, 'courses-courser');

      return response.data;
    } catch (error) {
      return (error as AxiosError).response;
    }
  },
);

export const createWithdrawals = createAsyncThunk(
  'sub/createWithdrawals',
  async (userData: any) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.post(
        `${baseApiUrl}/api/v1/withdraws/withdrawals`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);

export const getUsersSubCreated = createAsyncThunk(
  'sub/getUsersSubCreated',
  async (userID: string) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.get(
        `${baseApiUrl}/api/v1/sub/user/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);

export const getCommunity = createAsyncThunk('sub/getCommunity', async () => {
  try {
    // Retrieve the access token from AsyncStorage
    const accessToken = await AsyncStorage.getItem(
      'tradersignalsapp_access_token',
    );

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(`${baseApiUrl}/api/v1/communitysub/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
      },
    });
    //console.log(response, 'sub Response');
    return response.data;
  } catch (error) {
    //console.log(error, 'sub Error');
    return (error as AxiosError).response;
  }
});

export const getProTraderHistory = createAsyncThunk(
  'sub/getProTraderHistory',
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
        `${baseApiUrl}/api/v1/communitysub/user/pro-trader`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);

export const getAcademyHistory = createAsyncThunk(
  'sub/getAcademyHistory',
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
        `${baseApiUrl}/api/v1/communitysub/user/academy`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);

export const getCommunityMessagesNoToken = createAsyncThunk(
  'sub/getCommunityMessagesNoToken',
  async () => {
    try {
      const response = await axios.get(
        `${baseApiUrl}/api/v1/allCommunityChats/`,
      );
      console.log(response, 'sub allCommunityChats');
      return response.data;
    } catch (error) {
      return (error as AxiosError).response;
    }
  },
);

export const getCommunityMessages = createAsyncThunk(
  'sub/getCommunityMessages',
  async () => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
        const response = await axios.get(
          `${baseApiUrl}/api/v1/allCommunityChats/`,
        );
      }

      const response = await axios.get(
        `${baseApiUrl}/api/v1/allCommunityChats/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);

export const getGroupMessages = createAsyncThunk(
  'sub/getGroupMessages',
  async (groupID: string) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.get(
        `${baseApiUrl}/api/v1/messages/${groupID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      //console.log(response, 'group Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'group Error');
      return (error as AxiosError).response;
    }
  },
);

export const getPostPerSubscription = createAsyncThunk(
  'sub/getPostPerSubscription',
  async (subscriptionId: string) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      // Make HTTP GET request using axios
      const response = await axios.get(
        `${baseApiUrl}/api/v1/posts/create/subscription/${subscriptionId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );

      //console.log(response, 'group Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'group Error');
      throw error; // Re-throw the error to be handled by the caller
    }
  },
);

export const createPost = createAsyncThunk(
  'sub/createPost',
  async ({
    formData,
    subscriptionId,
  }: {
    formData: any;
    subscriptionId: string;
  }) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      // Construct form data

      // Make POST request to create a new post
      const response = await axios.post(
        `${baseApiUrl}/api/v1/posts/create/${subscriptionId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
            'Content-Type': 'multipart/form-data', // Set the content type for form data
          },
        },
      );

      return response.data; // Return the response data, which should contain the created post
    } catch (error) {
      //console.log(error, 'sub Error');
      // Return the error response if the request fails
      return (error as AxiosError).response;
    }
  },
);

export const createSub = createAsyncThunk(
  'sub/createSub',
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
      const response = await axios.post(`${baseApiUrl}/api/v1/sub/`, userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          //  'Content-Type': 'multipart/form-data', // Set the content type for form data
        },
      });

      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);

export const editSub = createAsyncThunk(
  'sub/editSub',
  async ({
    title,
    durationInDays,
    description,
    price,
    subID,
  }: {
    title: string;
    durationInDays: string;
    description: string;
    price: string;
    subID: string;
  }) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const userData = {
        title,
        durationInDays,
        description,
        price,
      };

      const response = await axios.put(
        `${baseApiUrl}/api/v1/sub/${subID}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );

      return response.data;
    } catch (error) {
      // Return the error response
      throw (error as AxiosError).response;
    }
  },
);

export const joinSub = createAsyncThunk(
  'sub/joinSub',
  async ({
    userData,
    userID,
    subID,
  }: {
    userData: any;
    userID: string;
    subID: string;
  }) => {
    try {
      //console.log(userData, 'userDatauserData');
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.post(
        `${baseApiUrl}/api/v1/sub/join/${subID}/${userID}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);

export const getUsersub = createAsyncThunk(
  'sub/getUsersub',
  async (subID: any) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.get(
        `${baseApiUrl}/api/v1/sub/${subID}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);

export const getUsersubJoined = createAsyncThunk(
  'sub/getUsersubJoined',
  async (userID: any) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.get(
        `${baseApiUrl}/api/v1/sub/user/${userID}/subscriptions`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);

export const deleteSub = createAsyncThunk(
  'sub/deleteSub',
  async (subID: string) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.delete(
        `${baseApiUrl}/api/v1/sub/${subID}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);

export const createStatus = createAsyncThunk(
  'sub/createStatus',
  async ({
    subscriberId,
    durationInDays,
    price,
    subscriptionId,
    status,
    image,
    title,
    description,
    creator,
  }: {
    subscriberId: string;
    durationInDays: number;
    price: number;
    subscriptionId: string;
    status: string;
    image: any;
    title: string;
    description: string;
    creator: string;
  }) => {
    try {
      // file:///Users/user/Library/Developer/CoreSimulator/Devices/85A914F2-E0AF-4CC9-B032-AF8CBD8B4890/data/Containers/Data/Application/D412A74D-0F73-4B6E-AEBD-07FAF990B42E/tmp/967DD7F5-5B56-4D94-B438-9596701087B8.png
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      // const formData = new FormData();
      // formData.append('image', image); // Append the image data to FormData

      //console.log(image, image, 'imaget');

      const response = await axios.post(
        `${baseApiUrl}/api/v1/status/${subscriberId}/${durationInDays}/${price}/${subscriptionId}/${status}/${title}/${description}/${creator}`,
        image, // Send formData as the request body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
            'Content-Type': 'multipart/form-data', // Set the content type for form data
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);

export const createComStatus = createAsyncThunk(
  'sub/createComStatus',
  async ({
    subscriberId,
    status,
    image,
  }: {
    subscriberId: string;
    status: string;
    image: any;
  }) => {
    try {
      // file:///Users/user/Library/Developer/CoreSimulator/Devices/85A914F2-E0AF-4CC9-B032-AF8CBD8B4890/data/Containers/Data/Application/D412A74D-0F73-4B6E-AEBD-07FAF990B42E/tmp/967DD7F5-5B56-4D94-B438-9596701087B8.png
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      // const formData = new FormData();
      // formData.append('image', image); // Append the image data to FormData

      //console.log(image, image, 'imaget');

      const response = await axios.post(
        `${baseApiUrl}/api/v1/communitysub/${subscriberId}/${status}/`,
        image, // Send formData as the request body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
            'Content-Type': 'multipart/form-data', // Set the content type for form data
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);

export const createProTraderStatus = createAsyncThunk(
  'sub/createProTraderStatus',
  async ({
    subscriberId,
    status,
    image,
  }: {
    subscriberId: string;
    status: string;
    image: any;
  }) => {
    try {
      // file:///Users/user/Library/Developer/CoreSimulator/Devices/85A914F2-E0AF-4CC9-B032-AF8CBD8B4890/data/Containers/Data/Application/D412A74D-0F73-4B6E-AEBD-07FAF990B42E/tmp/967DD7F5-5B56-4D94-B438-9596701087B8.png
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      // const formData = new FormData();
      // formData.append('image', image); // Append the image data to FormData

      //console.log(image, image, 'imaget');

      const response = await axios.post(
        `${baseApiUrl}/api/v1/communitysub/${subscriberId}/${status}/protrader`,
        image, // Send formData as the request body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
            'Content-Type': 'multipart/form-data', // Set the content type for form data
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);
export const createAcademyStatus = createAsyncThunk(
  'sub/createAcademyStatus',
  async ({
    subscriberId,
    status,
    image,
  }: {
    subscriberId: string;
    status: string;
    image: any;
  }) => {
    try {
      // file:///Users/user/Library/Developer/CoreSimulator/Devices/85A914F2-E0AF-4CC9-B032-AF8CBD8B4890/data/Containers/Data/Application/D412A74D-0F73-4B6E-AEBD-07FAF990B42E/tmp/967DD7F5-5B56-4D94-B438-9596701087B8.png
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      // const formData = new FormData();
      // formData.append('image', image); // Append the image data to FormData

      //console.log(image, image, 'imaget');

      const response = await axios.post(
        `${baseApiUrl}/api/v1/communitysub/${subscriberId}/${status}/academy`,
        image, // Send formData as the request body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
            'Content-Type': 'multipart/form-data', // Set the content type for form data
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);
export const getUserStatus = createAsyncThunk('sub/getUserStatus', async () => {
  try {
    // Retrieve the access token from AsyncStorage
    const accessToken = await AsyncStorage.getItem(
      'tradersignalsapp_access_token',
    );

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(
      `${baseApiUrl}/api/v1/status/user`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
        },
      },
    );
    //console.log(response, 'sub Response');
    return response.data;
  } catch (error) {
    //console.log(error, 'sub Error');
    return (error as AxiosError).response;
  }
});

export const getCourses = createAsyncThunk('sub/courses', async () => {
  try {
    // Retrieve the access token from AsyncStorage
    const accessToken = await AsyncStorage.getItem(
      'tradersignalsapp_access_token',
    );

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(`${baseApiUrl}/api/v1/courses`);
    //console.log(response, 'sub Response');
    return response.data;
  } catch (error) {
    //console.log(error, 'sub Error');
    return (error as AxiosError).response;
  }
});

export const editStatus = createAsyncThunk(
  'sub/editStatus',
  async ({
    subscriberId,
    durationInDays,
    price,
    subscriptionId,
    status,
    image,
  }: {
    subscriberId: string;
    durationInDays: number;
    price: number;
    subscriptionId: string;
    status: string;
    image: any;
  }) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const formData = new FormData();
      formData.append('image', image); // Append the image data to FormData

      const response = await axios.post(
        `${baseApiUrl}/api/v1/status/${subscriberId}/${durationInDays}/${price}/${subscriptionId}/${status}`,
        // Pass subID as part of the URL
        formData, // Send formData as the request body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
            'Content-Type': 'multipart/form-data', // Set the content type for form data
          },
        },
      );
      //console.log(response, 'sub Response');
      return response.data;
    } catch (error) {
      //console.log(error, 'sub Error');
      return (error as AxiosError).response;
    }
  },
);
interface RatingData {
  review: string;
  rating: number;
  _id: string;
}

export const createRating = createAsyncThunk(
  'sub/createRating',
  async ({review, rating, _id}: RatingData, {rejectWithValue}) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const body = {review, rating, _id}; // Construct the request body
      const response = await axios.post(
        `${baseApiUrl}/api/v1/rating/rate/`,
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json', // Set the content type for JSON data
          },
        },
      );

      return response.data;
    } catch (error) {
      // If an error occurs, return it to be handled by Redux Toolkit
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const getAllUsersPosts = createAsyncThunk(
  'sub/getAllUsersPosts',
  async (author: string) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );

      if (!accessToken) {
        throw new Error('Access token not found');
      }
      const response = await axios.get(
        `${baseApiUrl}/api/v1/sub/posts/${author}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json', // Set the content type for JSON data
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const getRating = createAsyncThunk('sub/getRating', async () => {
  try {
    // Retrieve the access token from AsyncStorage
    const accessToken = await AsyncStorage.getItem(
      'tradersignalsapp_access_token',
    );

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(
      `${baseApiUrl}/api/v1/rating/ratings/`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
        },
      },
    );
    //console.log(response, 'sub Response');
    return response.data;
  } catch (error) {
    //console.log(error, 'sub Error');
    return (error as AxiosError).response;
  }
});

export const getBalance = createAsyncThunk('sub/getBalance', async () => {
  try {
    // Retrieve the access token from AsyncStorage
    const accessToken = await AsyncStorage.getItem(
      'tradersignalsapp_access_token',
    );

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(
      `${baseApiUrl}/api/v1/sub/users/subscribed`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
        },
      },
    );
    //console.log(response, 'sub Response');
    return response.data;
  } catch (error) {
    //console.log(error, 'sub Error');
    return (error as AxiosError).response;
  }
});

const sub = createSlice({
  name: 'sub',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getRating.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRating.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getCommunity.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommunity.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getWalletAddress.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWalletAddress.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getWalletAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getCommunityMessages.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommunityMessages.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getCommunityMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(getCommunityMessagesNoToken.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommunityMessagesNoToken.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getCommunityMessagesNoToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getBalance.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBalance.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getAllCourses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(createProTraderStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProTraderStatus.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createProTraderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(getAllUsersPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersPosts.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getAllUsersPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(createRating.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRating.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getCourses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourses.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(getUsersSubCreated.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersSubCreated.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getUsersSubCreated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(createStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStatus.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(createPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(getPostPerSubscription.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostPerSubscription.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getPostPerSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(getUserStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserStatus.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(createComStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComStatus.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createComStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getUsersubJoined.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersubJoined.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getUsersubJoined.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(createWithdrawals.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWithdrawals.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createWithdrawals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getWithdrawals.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWithdrawals.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getWithdrawals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(deleteSub.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSub.fulfilled, state => {
        state.loading = false;
      })
      .addCase(deleteSub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getGroupMessages.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroupMessages.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getGroupMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(editSub.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSub.fulfilled, state => {
        state.loading = false;
      })
      .addCase(editSub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(getUsersub.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersub.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getUsersub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(createSub.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSub.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createSub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(joinSub.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinSub.fulfilled, state => {
        state.loading = false;
      })
      .addCase(joinSub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(getProTraderHistory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProTraderHistory.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getProTraderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(getAcademyHistory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAcademyHistory.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getAcademyHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(createAcademyStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAcademyStatus.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createAcademyStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
  },
});

export default sub.reducer;
