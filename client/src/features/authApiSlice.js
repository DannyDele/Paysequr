import { api } from "../state/api";

export const authApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'https://paysequr.com/api-admin/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const{
    useLoginMutation
} = authApiSlice