import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import {createApi} from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "https://jsonplaceholder.typicode.com"}),
    endpoints: (blend)=>({
        getPosts: blend.query({query: ()=> "posts"})
    })
})


export const {useGetPostsQuery} = api;