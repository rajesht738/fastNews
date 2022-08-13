import client from "./client";

export const getFeaturedPosts = async () => {
    try {
        const { data } = await client("/post/featured-posts");
        return data;

    } catch (error) {
        const { response } = error;
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}
export const getLatestPosts = async ( pageNo , limit) => {
    try {
        const { data } = await client(`/post/posts?limit=${limit}&pageNo=${pageNo}`);
        return data;

    } catch (error) {
        const { response } = error;
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}