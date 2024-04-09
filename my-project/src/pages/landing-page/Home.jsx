import React from 'react';

import Header from '../../partials/Header';
import HeroHome from '../../partials/HeroHome';
// import ServicesOffered from '../partials/ServicesOffered';
// import Footer from '../partials/Footer';
// import Testimonials from '../partials/Testimonials';



function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow ">
        {/*  Page sections */}
       <HeroHome/>
        {/* <ServicesOffered/>
        <Testimonials/> */}
      </main>


      {/* <Footer/> */}



    

  

    </div>
  );
}

export default Home;