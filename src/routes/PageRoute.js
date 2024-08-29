import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//  -------------------------   Register    -----------------
import Register from '../registration/Register';
import RegistrationCat from '../registration/RegistrationCat';
import OtpVerification from '../registration/OtpVerification';
import RegisterSubscription from "../registration/RegisterSubscription"
import TermsAndConditionRegister from '../registration/TermsAndConditionRegister';
// ----------------- Login  -------------------
import Login from '../login/Login';
//  --------------  Profile & EditProfile  ----------------
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';

import Home from '../pages/Home';
import Widget from '../components/Widget';
import Bookmark from '../pages/Bookmark';
import Achievement from '../pages/Achievement';
import StudentGraph from '../pages/StudentGraph';
import Semester from '../pages/Semester';
//  ----------------  Subjects  ------------------------
import Subject from '../pages/Subjects/Subject';
import ChapterTestDescription from '../pages/Subjects/ChapterTestDescription';
//  ----------- Counselling ------------------
import Counselling from '../pages/Counselling';
import CounsellingSchedule from '../pages/CounsellingSchedule';
import CounsellingFeedback from '../pages/CounsellingFeedback';
// -----------------    Schedule Test -------------------------
import LeaderBoard from '../pages/ScheduleTest/LeaderBoard';
import ScheduleTest from '../pages/ScheduleTest/ScheduleTest';
import ScheduleBanner from '../pages/ScheduleBanner';
import SchedulePayment from '../pages/ScheduleTest/SchedulePayment';
import SchedulePage from '../pages/ScheduleTest/SchedulePage';
import TestRegister from '../pages/ScheduleTest/TestRegister';
import TestDescription from '../pages/ScheduleTest/TestDescription';
import TestScheduleScreen from '../pages/ScheduleTest/TestScheduleScreen';
// ----------------- Wallet --------------------------

import Wallet from '../pages/Wallet';
import Points from '../pages/Points';
import TransactionHistory from '../pages/TransactionHistory';

// ------------------    testpage   ------------------------
import CombineWords from '../pages/testpage/CombineWords';
import FillinBlank from '../pages/testpage/FillinBlank';
import TrueFalse from '../pages/testpage/TrueFalse';
import MatchFollowing from '../pages/testpage/MatchFollowing';
import TestScreen from '../pages/testpage/TestScreen';
import TestFinish from '../pages/testpage/TestFinish';
import MCQ from '../pages/testpage/MCQ';
import TestScreenForFullSemester from '../pages/testpage/TestScreenForFullSemester';
// ------------------  Play with friend  ------------------------

import ChapterList from '../pages/PlayWithFriends/ChapterList';
import PWFFriendList from '../pages/PlayWithFriends/PWFFriendList';
import FriendCompleted from '../pages/PlayWithFriends/FriendCompleted';
import FriendContact from '../pages/PlayWithFriends/FriendContact';
import FriendList from '../pages/PlayWithFriends/FriendList';
import FriendTestScreen from '../pages/PlayWithFriends/FriendTestScreen';
import FriendUpcoming from '../pages/PlayWithFriends/FriendUpcoming';
import PlayFriendScreen from '../pages/PlayWithFriends/PlayFriendScreen';
import PlayWithFriend from '../pages/PlayWithFriends/PlayWithFriend';
import TestResult from '../pages/PlayWithFriends/TestResult';
import TestDetail from '../pages/PlayWithFriends/TestDetail';
import UpcomingTestDetails from '../pages/PlayWithFriends/UpcomingTestDetails';
//  ---------------- Contact us ---------------------------
import ContactUs from '../pages/ContactUs';
import TermsAndCondition from '../pages/TermsAndCondition';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsConditionMain from '../pages/TermsConditionMain';
import Subscription from '../pages/Subscription';
import History from '../pages/History';
import Test from '../Test';
import ComingSoon from '../pages/ComingSoon';
import Protected from './Protected';
// --------------------ErrorBoundary-----------------------
import ErrorBoundary from '../pages/ErrorBoundary';

// --------------------TestAnswer SCreen-------------------
import TestScreenForAnswer from '../pages/testAnswerPage/TestScreenForAnswer';
import TestScreenForFullSemesterAnswer from '../pages/testAnswerPage/TestScreenForFullSemesterAnswer';
import TestAnswerCheck from '../pages/ScheduleTest/TestAnswerCheck';
import ScheduleTests from '../pages/ScheduleTest/ScheduleTests';
import Announcement from '../pages/Announcement';
import AnnouncementDetail from '../pages/AnnouncementDetail';

function PageRoute() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path= {"/login"}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/">
            <Route index element={<ErrorBoundary><Protected Components={Home}/></ErrorBoundary>} />
          </Route>
          <Route path="/register">
            <Route index element={<Register/>} />
          </Route>
          <Route path="/regCat">
            {/* <Route index element={<ErrorBoundary><Protected Components={RegistrationCat}/></ErrorBoundary>} /> */}
            <Route index element={<RegistrationCat/>}/>
          </Route>
          <Route path="/otpVerify">
            <Route index element={<OtpVerification/>} />
          </Route>
          <Route path="/reg_subscription">
            <Route index element={<ErrorBoundary><Protected Components={RegisterSubscription}/></ErrorBoundary>} />
          </Route>
          <Route path="/reg_terms">
            <Route index element={<ErrorBoundary><Protected Components={TermsAndConditionRegister}/></ErrorBoundary>} />
          </Route>
          <Route path="/widget">
            <Route index element={<ErrorBoundary><Protected Components={Widget}/></ErrorBoundary>} />
          </Route>
          <Route path="/bookmark">
            <Route index element={<ErrorBoundary><Protected Components={Bookmark}/></ErrorBoundary>} />
          </Route>
          <Route path="/achievement">
            <Route index element={<Protected Components={Achievement }/>} />
          </Route>
          <Route path="/announcement">
            <Route index element={<ErrorBoundary><Protected Components={Announcement }/></ErrorBoundary>} />
          </Route>
          <Route path="/announcement_detail">
            <Route index element={<Protected Components={AnnouncementDetail}/>} />
          </Route>
          <Route path="/semester">
            <Route index element={<ErrorBoundary><Protected Components={Semester}/></ErrorBoundary>} />
          </Route>
          <Route path="/subjects">
            <Route index element={<ErrorBoundary><Protected Components={Subject}/></ErrorBoundary>} />
          </Route>
          <Route path="/chapterdescription">
            <Route index element={<ErrorBoundary><Protected Components={ChapterTestDescription }/></ErrorBoundary>} />
          </Route>
          <Route path="/testscreen">
            <Route index element={<ErrorBoundary><Protected Components={TestScreen}/></ErrorBoundary>} />
          </Route>
          <Route path="/counselling">
            <Route index element={<ErrorBoundary><Protected Components={Counselling}/></ErrorBoundary>} />
          </Route>
          <Route path="/counsellingschedule">
            <Route index element={<ErrorBoundary><Protected Components={CounsellingSchedule}/></ErrorBoundary>} />
          </Route>
          <Route path="/playwfriend">
            <Route index element={<ErrorBoundary><Protected Components={PlayWithFriend}/></ErrorBoundary>} />
          </Route>
          <Route path="/friendupcoming">
            <Route index element={<ErrorBoundary><Protected Components={FriendUpcoming }/></ErrorBoundary>} />
          </Route>
          <Route path="/upcomingtestDetails">
            <Route index element={<ErrorBoundary><Protected Components={UpcomingTestDetails}/></ErrorBoundary>} />
          </Route>
          <Route path="/friendcompleted">
            <Route index element={<ErrorBoundary><Protected Components={FriendCompleted}/></ErrorBoundary>} />
          </Route>
          <Route path="/playfriendscreen">
            <Route index element={<ErrorBoundary><Protected Components={PlayFriendScreen}/></ErrorBoundary>} />
          </Route>
          <Route path="/testresult">
            <Route index element={<ErrorBoundary><Protected Components={TestResult}/></ErrorBoundary>} />
          </Route>
          <Route path="/testdetail">
            <Route index element={<ErrorBoundary><Protected Components={TestDetail}/></ErrorBoundary>} />
          </Route>
          <Route path="/friendlist">
            <Route index element={<ErrorBoundary><Protected Components={FriendList}/></ErrorBoundary>} />
          </Route>
          <Route path="/chapterlist">
            <Route index element={<ErrorBoundary><Protected Components={ChapterList}/></ErrorBoundary>} />
          </Route>
          <Route path="/PWFFriendList">
            <Route index element={<ErrorBoundary><Protected Components={PWFFriendList}/></ErrorBoundary>} />
          </Route>
          <Route path="/friendtestscreen">
            <Route index element={<ErrorBoundary><Protected Components={FriendTestScreen}/></ErrorBoundary>} />
          </Route>
          <Route path="/schedulebanner">
            <Route index element={<ErrorBoundary><Protected Components={ScheduleBanner}/></ErrorBoundary>} />
          </Route>
          <Route path="/schedulepage">
            <Route index element={<ErrorBoundary><Protected Components={SchedulePage}/></ErrorBoundary>} />
          </Route>
          <Route path="/testdescription">
            <Route index element={<ErrorBoundary><Protected Components={TestDescription}/></ErrorBoundary>} />
          </Route>
          <Route path="/testschedulescreen">
            <Route index element={<ErrorBoundary><Protected Components={TestScheduleScreen}/></ErrorBoundary>} />
          </Route>
          <Route path="/testschedulescreen2">
            <Route index element={<Protected Components={ScheduleTests}/>} />
          </Route>
          <Route path="/testAnswercheck">
            <Route index element={<ErrorBoundary><Protected Components={TestAnswerCheck}/></ErrorBoundary>} />
          </Route>
          <Route path="/scheduletest">
            <Route index element={<ErrorBoundary><Protected Components={ScheduleTest}/></ErrorBoundary>} />
          </Route>
          <Route path="/leaderboard">
            <Route index element={<Protected Components={LeaderBoard}/>} />
          </Route>
          <Route path="/testreg">
            <Route index element={<ErrorBoundary><Protected Components={TestRegister}/></ErrorBoundary>} />
          </Route>
          <Route path="/schedulepayment">
            <Route index element={<ErrorBoundary><Protected Components={SchedulePayment}/></ErrorBoundary>} />
          </Route>
          <Route path="/editprofile/">
            <Route index element={<ErrorBoundary><Protected Components={EditProfile}/></ErrorBoundary>} />
          </Route>
          <Route path="/profile">
            <Route index element={<ErrorBoundary><Protected Components={Profile}/></ErrorBoundary>} />
          </Route>
          <Route path="/friendcontact">
            <Route index element={<ErrorBoundary><Protected Components={FriendContact}/></ErrorBoundary>} />
          </Route>
          <Route path="/subscription">
            <Route index element={<ErrorBoundary><Protected Components={Subscription}/></ErrorBoundary>} />
          </Route>
          <Route path="/wallet">
            <Route index element={<ErrorBoundary><Protected Components={Wallet}/></ErrorBoundary>} />
          </Route>
          <Route path="/history">
            <Route index element={<ErrorBoundary><Protected Components={History}/></ErrorBoundary>} />
          </Route>
          <Route path="/points">
            <Route index element={<ErrorBoundary><Protected Components={Points}/></ErrorBoundary>} />
          </Route>
          <Route path="/transactionhistory">
            <Route index element={<ErrorBoundary><Protected Components={TransactionHistory}/></ErrorBoundary>} />
          </Route>
          <Route path="/test_mcq">
            <Route index element={<ErrorBoundary><Protected Components={MCQ}/></ErrorBoundary>} />
          </Route>
          <Route path="/test_fillinblank">
            <Route index element={<ErrorBoundary><Protected Components={FillinBlank}/></ErrorBoundary>} />
          </Route>
          <Route path="/test_truefalse">
            <Route index element={<ErrorBoundary><Protected Components={TrueFalse}/></ErrorBoundary>} />
          </Route>
          <Route path="/test_matchfollowing">
            <Route index element={<ErrorBoundary><Protected Components={MatchFollowing}/></ErrorBoundary>} />
          </Route>
          <Route path="/test_combinewords">
            <Route index element={<ErrorBoundary><Protected Components={CombineWords}/></ErrorBoundary>} />
          </Route>
          <Route path="/testfinish">
            <Route index element={<ErrorBoundary><Protected Components={TestFinish}/></ErrorBoundary>} />
          </Route>
          <Route path="/termsmain">
            <Route index element={<ErrorBoundary><Protected Components={TermsAndCondition}/></ErrorBoundary>} />
          </Route>
          <Route path="/termscondition">
            <Route index element={<ErrorBoundary><Protected Components={TermsConditionMain}/></ErrorBoundary>} />
          </Route>
          <Route path="/privacypolicy">
            <Route index element={<ErrorBoundary><Protected Components={PrivacyPolicy}/></ErrorBoundary>} />
          </Route>
          <Route path="/contactus">
            <Route index element={<ErrorBoundary><Protected Components={ContactUs}/></ErrorBoundary>} />
          </Route>
          <Route path="/test">
            <Route index element={<ErrorBoundary><Protected Components={Test}/></ErrorBoundary>} />
          </Route>
          <Route path="/comingsoon">
            <Route index element={<ErrorBoundary><Protected Components={ComingSoon}/></ErrorBoundary>}/>
          </Route>
          <Route path="/testscreenforanswer">
            <Route index element={<ErrorBoundary><Protected Components={TestScreenForAnswer}/></ErrorBoundary>}/>
          </Route>
          <Route path="/counsellingFeedback">
            <Route index element={<CounsellingFeedback/>}/>
          </Route>
          <Route path="/testScreenForFullSemester">
            <Route index element={<TestScreenForFullSemester/>}/>
          </Route>
          <Route path="/testScreenForFullSemesterAnswer">
            <Route index element={<TestScreenForFullSemesterAnswer/>}/>
          </Route>
          <Route path="/studentGraph">
            <Route index element={<StudentGraph/>}/>
          </Route>
          {/* <Route path="/err">
            <Route index element={<Error/>}/>
          </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default PageRoute;
