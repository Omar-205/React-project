import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { TraineeData } from "../../types/TraineeData";
import { getUserData, saveUserData } from "../../services/DatabaseServices";

interface AuthState {
  uid: string | null;
  user: TraineeData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: AuthState = {
  uid: localStorage.getItem("isAuthenticated") || null,
  user: null,
  status: "idle",
  error: null,
};

// --- Async Thunks ---
export const fetchUser = createAsyncThunk<
  TraineeData | null,
  string,
  { rejectValue: string }
>("auth/fetchUser", async (uid, { rejectWithValue }) => {
  try {
    const data = await getUserData(uid);
    return data;
  } catch (err: any) {
    console.error("fetchUser error", err);
    return rejectWithValue(err?.message ?? "Failed to fetch user");
  }
});

export const updateUser = createAsyncThunk<
  Partial<TraineeData>,
  { uid: string; data: Partial<TraineeData> },
  { rejectValue: string }
>("auth/updateUser", async ({ uid, data }, { rejectWithValue }) => {
  try {
    await saveUserData(uid, data);
    return data;
  } catch (err: any) {
    console.error("updateUser error", err);
    return rejectWithValue(err?.message ?? "Failed to update user data");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUid: (state, action: PayloadAction<string | null>) => {
      state.uid = action.payload;
      if (action.payload) localStorage.setItem("isAuthenticated", action.payload);
      else localStorage.removeItem("isAuthenticated");
    },
    clearAuth: (state) => {
      state.uid = null;
      state.user = null;
      state.status = "idle";
      localStorage.removeItem("isAuthenticated");
    },
    setUser: (state, action: PayloadAction<TraineeData | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed";
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        } else {
          state.user = action.payload as TraineeData;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to update user data";
      });
  },
});

export const { setUid, clearAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
