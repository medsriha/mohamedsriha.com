import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .loader-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid var(--light-slate);
    border-top-color: var(--green);
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.2);
    animation: spin 1.2s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
    opacity: ${props => (props.isMounted ? 1 : 0)};
    transition: var(--transition);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      border-width: 3px;
    }
    50% {
      transform: rotate(180deg);
      border-width: 4px;
    }
    100% {
      transform: rotate(360deg);
      border-width: 3px;
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '.loader-circle',
        duration: 800,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    
    // Wait for document to be fully loaded before starting exit animation
    if (document.readyState === 'complete') {
      animate();
    } else {
      window.addEventListener('load', animate);
    }
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('load', animate);
    };
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="loader-circle"></div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
