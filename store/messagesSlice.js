import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messagesData: {},
  },
  reducers: {
    setChatMessages: (state, action) => {
      const { chatId, messagesData } = action.payload;
      state.messagesData[chatId] = messagesData;
    },
  },
});

export const { setChatMessages } = messagesSlice.actions;
export default messagesSlice.reducer;

