export const userDetail = (
    state = {
        userId: null,
        userName: null,
        userNumber : null,
        userEmail : null,
      },
 action)=> {
   
            return {
                    ...state,
                    userId: action.payload.id,
                    userName: action.payload.user_name,
                    firstName : action.payload.first_name,
                    userNumber : action.payload.mobile,
                    userEmail : action.payload.email,
                    classID : action.payload.class_id,
                    langId : action.payload.lang_id,
                    boardName:action.payload.board_name,
                    coins : action.payload.coins,
                    standard : action.payload.class_name,
                    schoolName : action.payload.school_id,
                    boardId : action.payload.boards_id
            }
    }


    // localStorage.setItem("UserId", resp.data.data[0].id);
    // localStorage.setItem("Name", resp.data.data[0].first_name);
    // localStorage.setItem("Email", resp.data.data[0].email);
    // localStorage.setItem("BoardId", resp.data.data[0].boards_id);
    // localStorage.setItem("ClassId", resp.data.data[0].class_id);
    // localStorage.setItem("LanguageId", resp.data.data[0].lang_id);
    // localStorage.setItem("SchholName", resp.data.data[0].school_id);
    // localStorage.setItem("Contact", resp.data.data[0].mobile);
    // localStorage.setItem("UserName", resp.data.data[0].user_name);
    // localStorage.setItem("Board Name", resp.data.data[0].board_name);
    // localStorage.setItem("Standard", resp.data.data[0].class_name);
    // localStorage.setItem("Coins", resp.data.data[0].coins);