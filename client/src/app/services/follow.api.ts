import { api } from "./api"

export const followApi = api.injectEndpoints({
  endpoints: builder => ({
    followUser: builder.mutation<void, { followingId: string }>({
      query: body => ({
        url: `/follow`,
        method: "POST",
        body,
      }),
    }),
    unFollowUser: builder.mutation<void, { followingId: string }>({
      query: ({ followingId }) => ({
        url: "/unfollow",
        method: "DELETE",
        body: {
          followingId,
        },
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnFollowUserMutation } = followApi

export const {
  endpoints: { unFollowUser, followUser },
} = followApi
