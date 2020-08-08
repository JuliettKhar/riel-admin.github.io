import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://rieltadmin.firebaseio.com/',
      headers: {
      Authorization: `key=AIzaSyBGtxNbCz4slecL5yg8n8XRbH-8KfzDy_0`,
      common: {
        Accept: 'application/json, text/plain, */*',
      },
    },
});

export default axios
