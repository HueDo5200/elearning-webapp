import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import FooterMedia from './components/FooterMedia';
import DetailedCourse from './components/DetailedCourse';
import MyCourses from './components/MyCourses';
import PaidCourseDetail from './components/PaidCourseDetail';
import FoundCourses from './components/FoundCourses';
import { useSelector } from 'react-redux';
import TeacherNotificationPage from './components/teacher/TeacherNotificationPage';
import TeacherDiscussionPage from './components/teacher/TeacherDiscussionPage';
import StudentPage from './components/teacher/StudentPage';
import ManageTeacherPage from './components/admin/ManageTeacherPage';
import ManageStudentPage from './components/admin/ManageStudentPage';
import AccountPage from './components/teacher/AccountPage';
import StudentProfile from './components/StudentProfile';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ManageLessonPage from './components/teacher/ManageLessonPage';
import ManageCoursePage from './components/teacher/ManageCoursePage';
import ViewUnpublishedCourse from './components/admin/ViewUnpublishedCourse';
import CourseEvaluation from './components/admin/CourseEvaluation';
import ManageCourseRequest from './components/admin/ManageCourseRequest';
import TeacherViewNotificationComment from './components/teacher/TeacherViewNotificationComment';
import Sidebar from './components/teacher/Sidebar';
import TeacherCourseReviewPage from './components/teacher/TeacherCourseReviewPage';

const promise = loadStripe("pk_test_51JvjOoGX1iAn0S08ZjytnvvhV85QxqPDBSRCqJZBSEyIowaxXz7pQZEQAydL4UbUCHYOVhcVujCRpTLe8IgSYkVS00OmJUcdFU");

function App() {
  const auth = useSelector((state) => state.auth);
 const role = auth.role;
 
  return (
<div className = "app">
{role === "teacher" || role === "admin" ? (
 <>
 <Router>
  <Sidebar/>
   <Switch>
   <Route path = '/teacher/home' exact component = {AccountPage} />
   <Route path = "/teacher/courses" exact component = {ManageCoursePage}/>
   <Route path = '/signin' component = {SignIn}/>
    <Route path = '/signup' component = {SignUp}/>
    <Route path = '/notification/course/:id' exact component = {TeacherNotificationPage}/>
    <Route path = '/discussion/course/:id' exact component = {TeacherDiscussionPage}/>
    <Route path = '/lesson/course/:id' exact component = {ManageLessonPage}/>
    <Route path = '/student/course/:id' exact component = {StudentPage}/>
    <Route path = '/admin/manage/teacher' component = {ManageTeacherPage}/>
    <Route path = '/admin/manage/student' component = {ManageStudentPage}/>
    <Route path = '/evaluate/course/:id' axact component = {ViewUnpublishedCourse} />
    <Route path = '/course/evaluation' exact component = {ManageCourseRequest} />
    <Route path = '/teacher/notification/comments/:id' exact component = {TeacherViewNotificationComment}/>
    <Route path = '/teacher/course/reviews/:id' exact component = {TeacherCourseReviewPage}/>
   </Switch>

   </Router>
</>
) : (
  <>
  <Router>
    <Header/>
    <Switch>
      <Route path = '/student/profile' component = {StudentProfile}/>
   <Route path = '/course/search' component = {FoundCourses}/>
    <Route path = '/' exact component = {Home} />
    <Route path = '/course/:id' component = {DetailedCourse}/>
    <Route path = '/paid-course/:id' component = {PaidCourseDetail}/>
    {/* <Route path = '/cart' component = {Checkout}/> */}
    <Route path = '/cart'>
    <Elements stripe = {promise}>
      <Checkout/>
    </Elements>
    </Route>
    <Route path = '/signin' component = {SignIn}/>
    <Route path = '/signup' component = {SignUp}/>
    <Route path = '/mycourses' component = {MyCourses}/>
    </Switch>
    <Footer/>
    <FooterMedia/>
    </Router>
 </>
)}
</div>
  );
}

export default App;
