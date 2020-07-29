import axios from 'axios';
const instance=axios.create({
    baseURL:'https://react-burger-7cfc2.firebaseio.com/'
})
export default instance 