import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DashboardSubjects from '../components/DashboardSubjects';
import { createBrowserHistory } from 'history';
import { useLocation } from 'react-router-dom';
import { event } from 'jquery';

const Home = () => {
  useEffect(()=>{
    // window.addEventListener("beforeunload",()=>{
    //   event.preventDefault();
    //   event.returnValue="";
    // })
    window.addEventListener("beforeunload",()=>{
      return "If you leave this page, you'll also leave the exam"
    })
    // window.onunload()
    // window.onbeforeunload = ()=>"If you leave this page, you'll also leave the exam";
  })

  let history = createBrowserHistory();
  const location = useLocation();

useEffect(() => {
  history.push(null, null, location.href);
    window.onpop = function () {
        history.go(1);
    }
}, [])

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='content-wrapper'>
        <section className='content p-0 m-auto'>
          <DashboardSubjects />
        </section>
      </div>
    </>
  );
};

export default Home;
