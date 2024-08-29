const url = 'https://testmate.in/api/';
// const url = 'http://localhost/api/';
// https://testmate.in/api/user_login.php
export const mainUrl = url;
export const urlToken = '6808';

export const emailVerifyApi = () => {
    return url + 'get_email_verify.php';
};

export const mobileVerifyApi = () => {
    return url + 'get_mobile_verify.php';
};

export const userBoardApi = () => {
    return url + 'get_board_list.php';
};

export const userLanguageApi = () => {
    return url + 'get_language_list.php';
};

export const userClassApi = () => {
    return url + 'get_class_list.php';
};

export const getUserSchoolApi = () => {
    return `${url}get_school_list.php`;
};

export const userRegisterApi = () => {
    return url + 'user_register.php';
};

export const otpVerifyApi = () => {
    return url + 'get_otp_verify.php';
};

export const userLoginApi = () => {
    return url + 'user_login.php';
};

export const loginOtpVerifyApi = () => {
    return url + 'login_otp_verify.php';
};

export const userDetailApi = () => {
    return `${url}get_user_details.php`;
};

export const userEditDetailApi = () => {
    return `${url}get_user_update.php`;
};

export const userImageApi = () => {
    return `${url}get_update_profile.php`;
};

export const dashboardBannerApi = () => {
    return `${url}get_banner.php`;
};

export const userSubjectApi = () => {
    return `${url}get_subject_user.php`;
};

export const addSubjectListApi = () => {
    return `${url}add_subject_user.php`;
};

export const selectSubjectListApi = () => {
    return `${url}get_subject_list.php`;
};

export const getEditSubjectStatusApi = () => {
    return `${url}get_subject_user_status.php`;
};

export const createSemesterListApi = () => {
    return `${url}create_semester.php`;
};
export const getSemesterListApi = () => {
    return `${url}list_semester.php`;
};

export const getSemChapterListApi = () => {
    return `${url}get_semester_chapter.php`;
};

export const addChapterApi = () => {
    return `${url}add_chapter.php`;
};

export const getChapterLevelApi = () => {
    return `${url}get_chapter_level.php`;
};

export const getChapterTopicApi = () => {
    return `${url}get_chapter_topic.php`;
};

export const getChaptersListApi = () => {
    return `${url}get_chapter_list.php`;
};

export const chapterTestPreviewApi = () => {
    return `${url}details_chapter_test_preview.php`;
};

export const chapterTestQuestionApi = () => {
    return `${url}get_chapter_question.php`;
};

export const testSessionApi = () => {
    return `${url}get_start_test.php`;
};

export const submitTestApi = () => {
    return `${url}submit_chapter_question.php`;
};

export const submitAnswerApi = () => {
    return `${url}add_chapter_question.php`;
};

export const getBookmarkListApi = () => {
    return `${url}get_bookmark_list.php`;
};

export const addBookmarkApi = () => {
    return `${url}insert_bookmark.php`;
};

export const getSheduleTestApi = () => {
    return `${url}get_contest_test_list.php`;
};

export const getContestTestApi = () => {
    return `${url}get_contest_status.php`;
};

export const counsellingApi = () => {
    return `${url}book_counselling.php`;
};

export const counsellingUpcomingListApi = () => {  
    return `${url}get_counselling_list.php`;
};

export const counsellingTimeApi = () => {
    return `${url}check_booking_time.php`;
};

export const userPackageApi = () => {
    return `${url}get_user_package.php`;
};

export const scheduleTestDescApi = () => {
    return `${url}get_contest_details.php`;
};

export const contestStartApi = () => {
  return `${url}get_contest_start_test.php`;
};

export const topThreeUserApi = () => {
    return `${url}get_contest_scoreboard_top_three.php`;
};

export const userScoreListApi = () => {
    return `${url}get_contest_score_list.php`;
};

export const friendListApi = () => {
    return `${url}get_play_user_friends_list.php`;
};

export const friendSearchApi = () => {
    return `${url}get_play_search_friends.php`;
};

export const addFriendListApi = () => {
    return `${url}get_play_upsert_friends.php`;
};

export const playTestCreateApi = () => {
    // return `${url}create_play_user_test.php`;
    return `${url}get_play_user_test.php`;
};

export const playTestQuestionApi = () => {
    return `${url}get_play_question_user_test.php`;
};

export const achievementChapterApi = () => {
    return `${url}get_user_achievement.php`;
};

export const testListApi = () => {
    return `${url}get_play_test_list.php`;
};

export const testLeaderBoardApi = () => {
    return `${url}get_play_view_user_test.php`;
};

export const testTopfriendListApi = () => {
    return `${url}get_play_view_user_test_topper.php`;
};

export const walletHistoryApi = () => {
    return `${url}get_wallet_history.php`;
};

export const transactionHistoryApi = () => {
    return `${url}get_user_transaciton.php`;
};
export const userPackgesListApi = () => {
    return `${url}get_package_list.php`;
};

export const promoCodeApi = () => {
    // return `${url}promocode-validate.php`;
    return `${url}app-promocode-validate.php`;
};

export const logOutApi = () => {
    return `${url}update_logout_status.php`;
};

export const termsAndConditionApi = () => {
    return 'https://testmate.in/terms-and-conditions.php';
};

export const privacyAndPolicyApi = () => {
    return 'https://testmate.in/privacy-policy.php';
};

export const getChapterQuestionApi = () => {
    return url + 'api/get_chapter_question.php'
  }

export const notification=()=>{
    // return `${url}h_notification.php`;
    return `${url}get_notification.php`;
}

export const getContestQuestion = () => {
    // return url + 'api/get_contest_question.php'
    return `${url}get_contest_question.php`;
}
  
export const submitContestQuestion = () => {
//   return url + 'api/insert_contest_question.php'
  return `${url}insert_contest_question.php`;
}

export const submitContestTest = () => {
//   return url + 'api/submit_contest_test.php'
  return `${url}submit_contest_test.php`;
}




export const submitChallengeApi = () => {
    return `${url}save_play_user_test.php`;
}

export const getSemesterLevelApi = () => {
    return `${url}get_semester_level.php`;
}

export const counsellingFeedback=()=>{
    return `${url}counsellor_feedback.php`
}

export const allSemesterApi=()=>{
    return `${url}get_all_semester_questions.php`
}

export const deleteAcount=()=>{
    return `${url}delete-account.php`
}

export const getSemChapeterList=()=>{
    return `${url}get_semester_chapter.php`
}

export const defaultQuestionAnswer=()=>{
    return `${url}insert_chapter_question_default.php`
}

export const usernameLogin =()=>{
    return `${url}user_email_login.php`
}

export const contestStatus=()=>{
    return `${url}check_contest_availability.php`
}


export const getBanners=()=>{
    return `${url}get_banner.php`
}

export const deleteContest=()=>{
    return `${url}delete_contest_question.php`
}

export const graphStudent=()=>{
    return `${url}improvement_graph.php`
}