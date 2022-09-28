import { StyleSheet, Text, TextInput, View, NativeModules, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { getSinglePosts, searchPosts } from '../api/post';
import PostListItem from './PostListItem';

const { StatusBarManager } = NativeModules;

const height = StatusBarManager.HEIGHT;
const Search = ({navigation}) => {
  const [query, setQuery] = useState();
  const [result, setResult] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const handleOnSubmit = async () => {
    if (!query.trim()) return false;
    const { error, posts } = await searchPosts(query);

    if (error) return console.log(error);

    if(!posts.length) return setNotFound(true);
    setNotFound(false)
    setResult([...posts])
    // console.log(posts);
  }
  const handlePost = async (slug) => {
        const {error , post} = await getSinglePosts(slug);
        if(error) return console.log(error);
        navigation.navigate('PostDetails', {post} );

  }
  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={(text) => setQuery(text)}
        onSubmitEditing={handleOnSubmit}
        placeholder="search..."
        style={styles.searchInput} />

      <ScrollView>
        {notFound ? <Text
        style={{fontSize:22, fontWeight: 'bold', marginTop: 30, textAlign: 'center'}}
        >Not Found</Text> :result.map((post) => {
          return (
            <View key={post.id} style={{paddingTop: 10}}>
            <PostListItem  onPresst={() => handlePost(post.slug)} posts={post} />
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    paddingTop: height,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5
  }
})