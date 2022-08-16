import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostListItem from './PostListItem';
import { getSimilarPosts, getSinglePosts } from '../api/post';

const RelatedPosts = ({ postId, onPostPress }) => {

    const [posts, setPosts] = useState([]);
    // const onPostPress = async (slug) => {
    //         const {error , post} = await getSinglePosts(slug);
    //         if(error) console.log(error) ;
    //         console.log(post);
    //         navigation.push('PostDetails', {post} );
    //       }
    const fetchSimilarPost = async () => {
        const { error, posts } = await getSimilarPosts(postId);
        if (error) return console.log(error);
        // console.log([...posts]);
        setPosts([...posts]);
    }

    useEffect(() => {
        fetchSimilarPost();
    }, [postId])
    return  posts.map((post) => {

                return (
                    <View style={styles.container} key={post.id}>
                        <PostListItem key={post.id} onPresst={() => onPostPress(post.slug)} posts={post} />
                    </View>
                )

            })
        

    

}

export default RelatedPosts

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    }
})