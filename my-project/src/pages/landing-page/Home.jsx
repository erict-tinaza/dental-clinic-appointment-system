import React from 'react';

import Header from '../../partials/Header';
import HeroHome from '../../partials/HeroHome';
import InfoCards from '../InfoCards/InfoCards';
// import ServicesOffered from '../partials/ServicesOffered';
// import Footer from '../partials/Footer';
// import Testimonials from '../partials/Testimonials';
import Services from '../Services/Services'
import MakeAppointment from '../../pages/MakeAppointment/MakeAppointment'
import Testimonials from '../../pages/Testimonial/Testimonial'
import Footer from '../../partials/Footer/Footer'
import AppointOption from '../appointment/available-appointment/AvailableAppointment';

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow ">
        {/*  Page sections */}
       <HeroHome/>
       <div className="max-w-6xl mx-auto px-4 sm:px-6">
       {/* <InfoCards/> */}
       <Services/>
       <MakeAppointment/> 
       {/* <AppointOption/> */}
       <Testimonials/>
       <Footer/>
       </div>

        {/* <ServicesOffered/>
        <Testimonials/> */}
      </main>


      {/* <Footer/> */}



    

  

    </div>
  );
}

export default Home;