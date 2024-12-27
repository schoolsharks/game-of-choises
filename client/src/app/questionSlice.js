// src/features/questionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUser } from './userSlice';

// export const fetchNextQuestion = createAsyncThunk(
//   'questions/fetchNextQuestion',
//   async ({ userId, sq, response, quesId ,navigate}, thunkAPI) => {
//     const Apiresponse = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/ques`, { id: userId, sq, response, quesId });
//     console.log("Apiresponse", Apiresponse)
//     thunkAPI.dispatch(setUser({investment:Apiresponse.data.investment,wealth:Apiresponse.data.wealth,answered:Apiresponse.data.answered,totalPlayers:Apiresponse.data.totalPlayers}))
//     if (Apiresponse?.data?.message?.includes("You have answered")) {
//       navigate('/completed');
//     }
//     else if (Apiresponse?.data?.error?.name?.includes("TokenExpiredError")){
//       navigate("/login")
//     }
//     return Apiresponse.data;
//   }
// );


export const fetchNextQuestion = createAsyncThunk(
  'questions/fetchNextQuestion',
  async ({ userId, sq, response, quesId, navigate }, thunkAPI) => {
    try {
      const Apiresponse = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/ques`,
        { id: userId, sq, response, quesId }
      );
      console.log('Apiresponse', Apiresponse);

      if (Apiresponse?.data) {
        thunkAPI.dispatch(setUser({
          investment: Apiresponse.data.investment,
          wealth: Apiresponse.data.wealth,
          answered: Apiresponse.data.answered,
          totalPlayers: Apiresponse.data.totalPlayers
        }));

        if (Apiresponse?.data?.message?.includes("You have answered")) {
          navigate('/completed');
        }
        return Apiresponse.data;
      }
      else {
        // Handle the case where API response data is missing
        return thunkAPI.rejectWithValue({ error: "No data received from API." });
      }
    } catch (error) {
      console.error("Error during API call:", error);
      if (error.response.data.error.name === "TokenExpiredError") {
        localStorage.clear();
        navigate("/home")
        return thunkAPI.rejectWithValue({ error: error.response.data });
      }
      else{
        console.log("Server Error");
      }
    }
  }
);


const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    currentQuestion: null,
    options: null,
    quesId: null,
    year: null,
    responses: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setResponse(state, action) {
      state.responses.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNextQuestion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNextQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.options = action.payload.nextOptions
        state.currentQuestion = action.payload.nextQ;
        state.quesId = action.payload.nextQuesId
        state.year = action.payload.year

      })
      .addCase(fetchNextQuestion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setResponse } = questionSlice.actions;

export default questionSlice.reducer;
