import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import { usePrefersReducedMotion } from '@hooks';

const StyledMainContainer = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  header {
    margin-bottom: 50px;
    text-align: center;

    @media (max-width: 768px) {
      margin-bottom: 40px;
    }
  }

  .subtitle {
    margin-top: 20px;
    color: var(--slate);
    line-height: 1.5;
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      font-size: var(--fz-md);
    }
  }
`;

const ArchivePage = ({ location }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Layout location={location}>
      <Helmet title="Archive" />

      <StyledMainContainer>
        <header>
          <h1 className="big-heading">Archive</h1>
          <p className="subtitle">A collection of my past work and achievements</p>
        </header>

        <p style={{ textAlign: 'center' }}>
          Currently updating this section. Please check back later!
        </p>
      </StyledMainContainer>
    </Layout>
  );
};

ArchivePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ArchivePage;
