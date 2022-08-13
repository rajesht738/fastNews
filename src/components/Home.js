import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { getFeaturedPosts, getLatestPosts } from '../api/post';
import PostListItem from '../components/PostListItem';
import Slider from '../components/Slider';
import Seprator from '../Seprator';
const data = [
  {
    id: "1",
    thumbnail: "https://res.cloudinary.com/do6p6bfdg/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1659727952/rzpsktf9jj6rfctoebvx.jpg",
    title: "Programming language to learn in 2022",
    author: "Admin",
    createdAt: Date.now()
  },
  {
    id: "2",
    thumbnail: "https://res.cloudinary.com/do6p6bfdg/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1659701527/hu7nd2vl9cykyh2syiv1.jpg",
    title: "Know everything about crypto currency about crypto",
    author: "Admin",
    createdAt: Date.now()
  },
  {
    id: "3",
    thumbnail: "https://res.cloudinary.com/do6p6bfdg/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1659728377/rw05itulvhwnfftrqqeb.jpg",
    title: "How to make your first app with react and django?",
    author: "Admin",
    createdAt: Date.now()

  },
  {
    id: "4",
    thumbnail: "https://res.cloudinary.com/do6p6bfdg/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1659728309/uyjttneujdsy5uncylev.jpg",
    title: "Book to read as a programmer in 2022",
    author: "Admin",
    createdAt: Date.now()
  },
];

 
let pageNo = 0;
const limit = 5;
export default function Home() {

  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);

  const fetchFeaturedPosts = async () => {
    const { error, posts } = await getFeaturedPosts();
    if (error) return console.log(error);
    setFeaturedPosts(posts);
    // console.log("length", data);
  }
  const fetchLatestdPosts = async () => {
    const { error, posts } = await getLatestPosts(pageNo, limit);
    if (error) return console.log(error);
    
    setLatestPosts(posts);
  }

  const fetchMorePosts = async () => {
  
    if(reachedToEnd || busy) return;
    pageNo+=1;
    setBusy(true);
    const { error, posts , postCount} = await getLatestPosts(pageNo, limit);
    setBusy(false);
    if (error) return console.log(error);

    if(postCount === latestPosts.length) return setReachedToEnd(true);
     setLatestPosts([...latestPosts, ...posts]);
  }

  useEffect(() => {
    fetchFeaturedPosts();
    fetchLatestdPosts();
  }, [])

  const ListHeaderComponent = () => {
    return (
      <View>
       {featuredPosts.length ? (<Slider data={featuredPosts} title="Featured Posts" />):  null}
        <View style={{ marginTop: 15 }}>

          <Seprator />
          <Text style={{ fontWeight: "700", color: "#383838", fontSize: 22, marginTop: 10 }}>Latest Posts </Text>
        </View>

      </View>
    )
  }
  const ItemSeparatorComponent = () => <Seprator width='90%' style={{ marginTop: 15 }} />
  const renderItem =  ({ item }) => {
    return (
      <View style={{ marginTop: 15 }}>
        <PostListItem posts={item} />
      </View>
    )
  }

  return (
    <FlatList
      data={latestPosts}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 10 , paddingBottom: 20}}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
      onEndReached={async () => await fetchMorePosts()}
      onEndReachedThreshold={0}
      ListFooterComponent={() => {
        return reachedToEnd ? (
          <Text style={{
            fontWeight: "bold",
            color: "#383838",
            textAlign: "center",
            paddingVertical: 15,
          }}>
            You reached to end!
          </Text>
        ): null;
      }}
    />
  )
};
