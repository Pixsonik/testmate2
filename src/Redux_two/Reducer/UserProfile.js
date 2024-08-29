import * as ActionTypes from '../Actions/ActionTypes'

export const UserProfile = (
  state = {
    id: null,
    first_name: null,
    last_name: null,
    user_name:null,
    gender:null,
    dob:null,
    email: null,
    mobile: null,
    mobile_otp_status: null,
    coins: null,
    refer_code: null,
    friends_code: null,
    school_id: null,
    boards_id: null,
    class_id: null,
    state: null,
    city: null,
    pincode: null,
    profile_photo_path: null,
    class_name:null,
    board_name:null,
    school_name:null,

    lang_id : null,
    lang_name : null,
    wallet:null,

    errMess:null
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.USERDATA_ERR:
      return {
        ...state,
        id: null,
        first_name: null,
        last_name: null,
        user_name:null,
        gender:null,
        dob:null,
        email: null,
        mobile: null,
        mobile_otp_status: null,
        coins: null,
        refer_code: null,
        friends_code: null,
        school_id: null,
        boards_id: null,
        class_id: null,
        state: null,
        city: null,
        pincode: null,
        profile_photo_path: null,
        class_name:null,
        board_name:null,
        school_name:null,
        lang_id : null,
        lang_name : null,
        wallet:null,
        errMess: action.payload,
      };

    case ActionTypes.USERDATA_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        user_name:action.payload.user_name,
        gender:action.payload.gender,
        dob:action.payload.dob,
        email: action.payload.email,
        mobile: action.payload.mobile,
        mobile_otp_status: action.payload.mobile_otp_status,
        coins: action.payload.coins,
        refer_code: action.payload.refer_code,
        friends_code: action.payload.friends_code,
        school_id: action.payload.school_id,
        boards_id: action.payload.boards_id,
        class_id: action.payload.class_id,
        state: action.payload.state,
        city: action.payload.city,
        pincode: action.payload.pincode,
        profile_photo_path: action.payload.profile_photo_path,
        class_name:action.payload.class_name,
        board_name:action.payload.board_name,
        school_name:action.payload.school_name,
        lang_id : action.payload.lang_id,
        lang_name : action.payload.lang_name,
        wallet:action.payload.wallet,
        errMess: null,
      };

    // case ActionTypes.USER_ORDERS_LOADING:
    //   return {
    //     ...state,
    //     name: state.name,
    //     lastName: state.lastName,
    //     phoneNumber: state.phoneNumber,
    //     email: state.email,
    //     bmr : state.bmr,
    //     description: null,
    //     isLoading: true,
    //     errMess: null,
    //   };

    case ActionTypes.LOG_OUT:
      return {
        ...state,
        id: null,
        first_name: null,
        last_name: null,
        user_name:null,
        gender:null,
        dob:null,
        email: null,
        mobile: null,
        mobile_otp_status: null,
        coins: null,
        refer_code: null,
        friends_code: null,
        school_id: null,
        boards_id: null,
        class_id: null,
        state: null,
        city: null,
        pincode: null,
        profile_photo_path: null,
        class_name:null,
        board_name:null,
        school_name:null,
        lang_id : null,
        lang_name : null,
        wallet:null,

        errMess: null,
      };

    default:
      return state;
  }
};
