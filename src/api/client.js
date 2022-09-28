import { fetch } from "@react-native-community/netinfo";
import axios from "axios";

// it will change the ip address everytime when window shutdown
 const client = axios.create({
    baseURL:"https://fastnewst.herokuapp.com/api",
    
});
// const client = fetch('https://fastnewst.herokuapp.com/api/');
// const client = axios.create({baseURL:'http://192.168.137.41:4848/api'});

export default client;