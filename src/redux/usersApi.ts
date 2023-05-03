import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { IUser } from "../components/User/IUser";
// import { IPost } from "../components/Post/IPost";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users", "Posts"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (build) => ({
    getUsers: build.query<any[], string>({
      query: (limit = "") => `users?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ author_id }) => ({ type: "Users" as const, author_id })), { type: "Users", author_id: "LIST" }]
          : [{ type: "Users", author_id: "LIST" }],
    }),
    addUsers: build.mutation({
      query: (body) => ({ url: "users", method: "POST", body }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getPosts: build.query<any[], string>({
      query: (limit = "") => `posts?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: "Posts" as const, id })), { type: "Posts", id: "LIST" }] : [{ type: "Posts", id: "LIST" }],
    }),
    addPost: build.mutation({
      query: (body) => ({ url: "posts", method: "POST", body }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
});

export const { useGetUsersQuery, useAddUsersMutation, useGetPostsQuery, useAddPostMutation } = usersApi;
