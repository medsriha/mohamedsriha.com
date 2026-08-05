import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { IconExternal, IconWheelta } from '@components/icons';

const StyledWheeltaSection = styled.section`
  max-width: 900px;
  margin: 0 auto;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 60px;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
`;

const StyledWheeltaText = styled.div`
  .section-intro {
    margin: 0 0 18px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.35;
  }

  p {
    margin-bottom: 15px;
  }

  .wheelta-link {
    display: inline-flex;
    align-items: center;
    margin-top: 8px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);

    svg {
      width: 15px;
      height: 15px;
      margin-left: 7px;
      transition: var(--transition);
    }

    &:hover svg,
    &:focus svg {
      transform: translate(2px, -2px);
    }
  }
`;

const StyledLogoPanel = styled.aside`
  ${({ theme }) => theme.mixins.flexCenter};
  min-height: 280px;
  padding: 36px;
  flex-direction: column;
  border: 1px solid var(--lightest-navy);
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  text-align: center;
  box-shadow: 0 10px 30px -20px var(--navy-shadow);

  .wheelta-logo {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
    color: var(--green);
  }

  h3 {
    margin: 0 0 6px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
  }

  p {
    margin: 0;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }

  @media (max-width: 768px) {
    min-height: 230px;
  }
`;

const Wheelta = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledWheeltaSection id="wheelta" ref={revealContainer}>
      <h2 className="numbered-heading">Wheelta</h2>

      <div className="inner">
        <StyledWheeltaText>
          <p className="section-intro">A project that grew out of my own investing.</p>
          <p>
            I have traded the wheel strategy for years. Along the way, I ended up using a mix of
            spreadsheets and tools to compare options, understand the risk, and keep track of my
            portfolio. I built Wheelta to bring that work into one place.
          </p>
          <p>
            Wheelta helps people find options, compare risk and potential return, and see how a
            trade may affect the rest of their portfolio. It is designed to be useful for people who
            know the strategy well and for those who are still learning the details.
          </p>
          <p>
            The idea also connects to my time at BMO, where I worked on financial models, risk
            systems, and tools for large, complex workflows. Wheelta gives me a place to bring that
            experience into a product I use myself and can share with others.
          </p>
          <a href="https://www.wheelta.com/" className="wheelta-link">
            Visit Wheelta <IconExternal />
          </a>
        </StyledWheeltaText>

        <StyledLogoPanel aria-label="Wheelta logo">
          <div className="wheelta-logo">
            <IconWheelta />
          </div>
          <h3>Wheelta</h3>
          <p>Options analytics for the wheel strategy</p>
        </StyledLogoPanel>
      </div>
    </StyledWheeltaSection>
  );
};

export default Wheelta;
