
const STORE_USER_INFO = 'STORE_USER_INFO';
export const userDetail = (data) => {
    return {
        type: STORE_USER_INFO,
      payload: data,
    };
  };