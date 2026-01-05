import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, About, Jobs, Education, Contact } from '@components';
import Services from '@components/sections/services';
import Clients from '@components/sections/clients';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Services />
      <Jobs />
      <Clients />
      <Education />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
