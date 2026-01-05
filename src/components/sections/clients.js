import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledClientsSection = styled.section`
  max-width: 900px;

  .clients-intro {
    margin-bottom: 50px;
    color: var(--slate);
    text-align: center;
  }

  .clients-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 30px;
    align-items: center;
    justify-items: center;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledClient = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  padding: 20px;
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    background-color: var(--lightest-navy);
    transform: translateY(-3px);
  }

  a {
    color: var(--lightest-slate);
    font-size: var(--fz-lg);
    font-weight: 600;
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      color: var(--green);
    }
  }
`;

const Clients = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const clients = [
    { name: 'YPulse', url: 'https://www.ypulse.com/' },
    { name: 'Pepsi', url: 'https://www.pepsi.com/' },
    { name: 'FoodChain ID', url: 'https://www.foodchainid.com/' },
    { name: 'OpenSesame', url: 'https://www.opensesame.com/' },
    { name: 'The Economist', url: 'https://www.economist.com/' },
    { name: 'NCQA', url: 'https://www.ncqa.org/' },
  ];

  return (
    <StyledClientsSection id="past-projects" ref={revealContainer}>
      <h2 className="numbered-heading">Past Projects</h2>

      <p className="clients-intro">
        Trusted by leading organizations across industries
      </p>

      <div className="clients-grid">
        {clients.map((client, i) => (
          <StyledClient key={i}>
            <a href={client.url} target="_blank" rel="noopener noreferrer">
              {client.name}
            </a>
          </StyledClient>
        ))}
      </div>
    </StyledClientsSection>
  );
};

export default Clients;
