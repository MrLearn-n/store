import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/constants';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => {
                const { title, price_min, price_max, categoryId } = params;
                return {
                    url: `products/?title=${title}&price_min=${price_min}&price_max=${price_max}&categoryId=${categoryId}`
                }
            }
        })
    })
})

export const { useGetProductsQuery } = api;