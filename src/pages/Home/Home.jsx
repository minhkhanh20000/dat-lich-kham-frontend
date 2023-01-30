import React from 'react';
import Banners from './components/Banners/Banners';
import Intro from './components/Intros/Intro';
import News from './components/News/News';
import Support from './components/Support/Support';

function Home(props) {
  return (
    <div>
      <Banners />
      <Intro />
      <News />
      <Support />
    </div>
  );
}

export default Home;
