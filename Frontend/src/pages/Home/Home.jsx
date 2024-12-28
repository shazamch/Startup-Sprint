import React from 'react'
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import Hero from "../../components/Hero";
import Partners from '../../components/Partners';

function Home() {
  return (
    <main className='bg-white dark:bg-gray-900'>
        <Header />
        <main className='min-h-screen'>

          <Hero />

          <Partners />

        </main>
        <Footer />
    </main>
  )
}

export default Home;