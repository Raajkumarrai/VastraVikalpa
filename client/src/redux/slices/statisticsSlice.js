import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../config";

// Create async thunks
// !======================== for users ======================
export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const config = {
    headers: {
      "auth-token": JSON.parse(localStorage.getItem("token")),
    },
  };
  const response = await axios.get(
    `${API_BASE_URL}/api/statistics/total-user/all`,
    config
  );
  return response.data;
});
export const getOneMonthUsers = createAsyncThunk(
  "users/getOneMonthUsers",
  async () => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/statistics/total-user/thismonth`,
      config
    );
    return response.data;
  }
);
// !======================== for orders ======================
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async () => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/statistics/total-orders/all`,
      config
    );
    return response.data;
  }
);
export const getOneMonthOrders = createAsyncThunk(
  "orders/getOneMonthOrders",
  async () => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/statistics/total-orders/thismonth`,
      config
    );
    return response.data;
  }
);
// !======================== for Revenue ======================
export const getAllRevenue = createAsyncThunk(
  "revenue/getAllRevenue",
  async () => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/statistics/total-revenue/all`,
      config
    );
    return response.data;
  }
);
export const getOneMonthRevenue = createAsyncThunk(
  "revenue/getOneMonthRevenue",
  async () => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/statistics/total-revenue/thismonth`,
      config
    );
    return response.data;
  }
);
// !======================== for Delivery ======================
export const getAllDelivery = createAsyncThunk(
  "delivery/getAllDelivery",
  async () => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/statistics/total-delivery/all`,
      config
    );
    return response.data;
  }
);
export const getOneMonthDelivery = createAsyncThunk(
  "delivery/getOneMonthDelivery",
  async () => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/statistics/total-delivery/thismonth`,
      config
    );
    return response.data;
  }
);

// !====================== six month data ============================
export const getSixMonthDataChart = createAsyncThunk(
  "delivery/getSixMonthDelivery",
  async () => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/statistics/monthly-revenue`,
      config
    );
    return response.data;
  }
);
export const getSixMonthDataChartThreeDiff = createAsyncThunk(
  "delivery/getSixMonthDeliveryThreeDiff",
  async () => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/statistics/monthly-data/barchart`,
      config
    );
    return response.data;
  }
);
export const getSixMonthDataChartTwoDiffUser = createAsyncThunk(
  "delivery/getSixMonthDeliveryTwodiffuser",
  async (id) => {
    const config = {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("token")),
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/statistics/monthly-data/barchart/${id}`,
      config
    );
    return response.data;
  }
);

// Define initial state
const initialState = {
  allUsers: 0,
  oneMonthUsers: 0,
  allOrders: 0,
  oneMonthOrders: 0,
  allRevenue: 0,
  oneMonthRevenue: 0,
  oneWeekRevenue: 0,
  todayRevenue: 0,
  allDelivery: 0,
  oneMonthDelivery: 0,
  sixMonthData: [],
  sixMonthDataThreeDiff: [],
  sixMonthDataTwoDiffUser: [],
};

// Create a slice
const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // !============ users ================
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = action.payload.totalUsers;
    });
    builder.addCase(getOneMonthUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.oneMonthUsers = action.payload.totalUsers;
    });
    // !============ orders ================
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.allOrders = action.payload.totalOrders;
    });
    builder.addCase(getOneMonthOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.oneMonthOrders = action.payload.totalOrders;
    });
    // !============ Revenue ================
    builder.addCase(getAllRevenue.fulfilled, (state, action) => {
      state.loading = false;
      state.allRevenue = action.payload.totalRevenue;
    });
    builder.addCase(getOneMonthRevenue.fulfilled, (state, action) => {
      state.loading = false;
      state.oneMonthRevenue = action.payload.totalRevenueThisMonth;
      state.oneWeekRevenue = action.payload.totalRevenueThisWeek;
      state.todayRevenue = action.payload.totalRevenueToday;
    });
    // !============ delivery ================
    builder.addCase(getAllDelivery.fulfilled, (state, action) => {
      state.loading = false;
      state.allDelivery = action.payload.totalDelivery;
    });
    builder.addCase(getOneMonthDelivery.fulfilled, (state, action) => {
      state.loading = false;
      state.oneMonthDelivery = action.payload.totalDelivery;
    });
    // !============ six month data ================
    builder.addCase(getSixMonthDataChart.fulfilled, (state, action) => {
      state.loading = false;
      state.sixMonthData = action.payload;
    });
    builder.addCase(
      getSixMonthDataChartThreeDiff.fulfilled,
      (state, action) => {
        state.loading = false;
        state.sixMonthDataThreeDiff = action.payload;
      }
    );
    builder.addCase(
      getSixMonthDataChartTwoDiffUser.fulfilled,
      (state, action) => {
        state.loading = false;
        state.sixMonthDataTwoDiffUser = action.payload;
      }
    );
  },
});

// Export actions and reducer
export const { increment } = statisticsSlice.actions;
export default statisticsSlice.reducer;
