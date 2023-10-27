import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://paysequr.com/api-admin",
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    "CustomerInfo",
    "KYCApproval",
    "KYCDisapproval",
  ],
  endpoints: (build) => ({
  
    getProducts: build.query({
      query: () => `client/products`,
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "/all_users",
      providesTags: ["Customers"],
    }),
    getCustomerInfo: build.query({
      query: (id) => `/user/info/${id}`,
      providesTags: ["CustomerInfo"],
    }),
    getKYCApproval: build.mutation({
      query: (id) => ({
        url: `/user/kyc/approve/${id}`,
        method: "PUT",
      }),
      providesTags: ["KYCApproval"],
    }),
    getKYCDisapproval: build.mutation({
      query: (id) => ({
        url: `/user/kyc/disapprove/${id}`,
        method: "PUT",
      }),
      providesTags: ["KYCDisapproval"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetCustomerInfoQuery,
  useGetKYCApprovalMutation,
  useGetKYCDisapprovalMutation,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetPerformanceQuery,
  useGetDashboardQuery,
} = api;
