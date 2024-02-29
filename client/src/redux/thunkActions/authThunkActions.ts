import { createAsyncThunk } from "@reduxjs/toolkit";

export const logOutThunk = createAsyncThunk('auth/logout', async () => void authService.logOut())