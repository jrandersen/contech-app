import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0); // Scrolls to the top of the page when triggered
    };

    // Add event listener to scroll event
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
