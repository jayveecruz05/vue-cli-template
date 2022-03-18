'use strict';

import Axios from '@/plugins/axios';

// Process ENV Details
// console.log(process.env);

const api = {
  main: Axios({ baseURL: process.env.VUE_APP_BASE_API })
};

// console.log(api);

export default api;