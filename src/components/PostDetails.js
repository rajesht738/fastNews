import { View, Text, Image, Dimensions, ScrollView, Alert } from 'react-native'
import React from 'react'
import dateFormat from 'dateformat';
import Markdown from 'react-native-markdown-display';
import { getSinglePosts } from '../api/post';
import { Linking } from 'react-native';
import RelatedPosts from './RelatedPosts';
import Seprator from '../Seprator';
const { width } = Dimensions.get('window');
const BASE_URL = "github.com/iamacup";

const PostDetails = ({ route, navigation }) => {
  const post = route.params?.post;
 
  if (!post) return;

  const { title, content, meta, slug, tags, thumbnail, author, createdAt } = post;
  const getImage = (uri) => {
    if (uri) return { uri };
    return require("../../assets/blank.jpg");
  }
  // const rules = {
  //         paragraph: (node, children, parent, styles) =>
  //           <Text key={node.key} style={[styles.paragraph]} selectable>
  //             {children}
  //           </Text>,

  //     };

  const fetchSinglePosts = async (slug) => {
      const {error , post} = await getSinglePosts(slug);

      if(error) console.log(error) ;
      navigation.push('PostDetails', {post} );
  }

  const onLinkPress = async (url) => {
      
    if (url.includes(BASE_URL)){ 
      const slug = url.split(BASE_URL + "/")[1];
      if(!slug) return false;

     await fetchSinglePosts(slug);
   
      return false;
    }

    const res = await Linking.canOpenURL(url);
    if(res) Linking.openURL(url);
    else Alert.alert("Invalid Url" , "Can not open broken link!");
   
   
  }
  return (
    <ScrollView>
      <Image source={getImage(thumbnail)} style={{ width, height: width / 1.7 }} />
      <Text style={{
        fontWeight: "bold",
        fontSize: 22,
        color: "#383838",
        textAlign: "center",
        paddingVertical: 15,
      }}>{title}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 3,
        }}
      >
        <Text>By {author}</Text>
        <Text>{dateFormat(createdAt, "mediumDate")}</Text>

      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "#827E7E" }} >Tags</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {tags.map((tag, index) => (
            <Text style={{ marginLeft: 5, color: "blue" }} key={tag + index}>#{tag}</Text>
          ))}
        </View>
      </View>
      <View>
        <Markdown
          // rules={rules}
          onLinkPress={onLinkPress}
        >
          {content}
        </Markdown>
      </View>

      <View style={{padding: 10}}>
      <Text  style={{
            fontWeight: "bold",
            color: "#383838",
            paddingVertical: 15,
            fontSize:22
          }}>Related Posts</Text>
          <Seprator width='100%'/>
        <RelatedPosts onPostPress={fetchSinglePosts} postId={post.id}/>
      </View>
    </ScrollView>
  )
}

export default PostDetails