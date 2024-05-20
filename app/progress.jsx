// components/TopLoader.js
'use client'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import TopLoadingBar from 'react-top-loading-bar';

const TopLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleStart = () => setProgress(10);
    const handleComplete = () => setProgress(100);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return <TopLoadingBar progress={progress} />;
};

export default TopLoader;
