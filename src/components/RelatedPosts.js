import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostListItem from './PostListItem';
import { getSimilarPosts, getSinglePosts } from '../api/post';

const RelatedPosts = ({ postId , onPostPress}) => {

    const [posts, setPosts] = useState([]);
// const onPostPress = async (slug) => {
//         const {error , post} = await getSinglePosts(slug);
//         if(error) console.log(error) ;
//         console.log(post);
//         navigation.push('PostDetails', {post} );
//       }
const fetchSimilarPost = async () => {
    const {error, posts}  =  await getSimilarPosts(postId);
    if(error) return console.log(error);
   // console.log([...posts]);
    setPosts([...posts]);
}

useEffect(()=> {
    fetchSimilarPost();
}, [postId])
    return  (
    <View >
         { posts.map((post) => {
        
         return(  
             <PostListItem key={post.id} onPresst={() => onPostPress(post.slug)} posts={post}/>
             )
       
       })}
    </View>
    )
    
  
}

export default RelatedPosts

const styles = StyleSheet.create({})