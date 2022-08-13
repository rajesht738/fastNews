import axios from "axios";

// it will change the ip address everytime when window shutdown
const client = axios.create({baseURL:'http://192.168.149.41:4848/api'});
//  const client = axios.create({baseURL:'http://localhost:4848/api'});

export default client;