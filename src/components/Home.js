import React from 'react';
import HeroSection from './HeroSection';
import Services from './Services';
import Trusted from './Trusted';

const Home = () => {
  const data = {
    name: "Singha store",
  };

  return (
    <>
      <HeroSection name={data.name} />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
