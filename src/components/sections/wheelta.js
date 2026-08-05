import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { IconExternal, IconWheelta } from '@components/icons';

const StyledWheeltaSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;

  .inner {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.95fr);
    gap: 64px;
    align-items: center;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }
`;

const StyledProductCopy = styled.div`
  .product-label {
    display: block;
    margin-bottom: 14px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h3 {
    margin: 0 0 20px;
    color: var(--lightest-slate);
    font-size: clamp(30px, 5vw, 46px);
    line-height: 1.1;
  }

  .product-intro {
    margin-bottom: 24px;
    color: var(--light-slate);
    font-size: var(--fz-xl);
    line-height: 1.55;
  }

  .founder-context {
    margin: 0 0 28px;
    padding-left: 20px;
    border-left: 2px solid var(--green);

    .context-label {
      display: block;
      margin-bottom: 7px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    p {
      margin: 0;
      color: var(--slate);
      font-size: var(--fz-md);
    }
  }

  .product-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    padding: 0;
    margin: 0 0 32px;
    list-style: none;

    li {
      padding: 7px 11px;
      border: 1px solid var(--lightest-navy);
      border-radius: 999px;
      background-color: var(--green-tint);
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
    }
  }

  .visit-button {
    ${({ theme }) => theme.mixins.bigButton};
    display: inline-flex;
    align-items: center;
    gap: 9px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const StyledProductPanel = styled.aside`
  position: relative;
  overflow: hidden;
  padding: 26px;
  border: 1px solid var(--lightest-navy);
  border-radius: 8px;
  background: linear-gradient(145deg, var(--light-navy), rgba(17, 34, 64, 0.72));
  box-shadow: 0 24px 50px -28px var(--navy-shadow);
  transition: var(--transition);

  &:before {
    content: '';
    position: absolute;
    top: -120px;
    right: -100px;
    width: 260px;
    height: 260px;
    border: 1px solid rgba(100, 255, 218, 0.12);
    border-radius: 50%;
    box-shadow: 0 0 0 35px rgba(100, 255, 218, 0.025), 0 0 0 70px rgba(100, 255, 218, 0.018);
  }

  &:hover {
    border-color: rgba(100, 255, 218, 0.35);
    box-shadow: 0 30px 55px -28px var(--navy-shadow);
    transform: translateY(-4px);
  }

  .panel-header {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 14px;
    padding-bottom: 22px;
    border-bottom: 1px solid var(--lightest-navy);
  }

  .product-mark {
    ${({ theme }) => theme.mixins.flexCenter};
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: var(--green-tint);
    color: var(--green);

    svg {
      width: 30px;
      height: 30px;
    }
  }

  .brand-name {
    display: block;
    margin-bottom: 2px;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    font-weight: 600;
  }

  .brand-purpose {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }

  .workflow-label {
    margin: 24px 0 14px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .workflow {
    position: relative;
    z-index: 1;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      display: grid;
      grid-template-columns: 34px 1fr;
      gap: 13px;
      padding: 15px 0;
      border-top: 1px solid rgba(35, 53, 84, 0.75);

      &:first-child {
        border-top: 0;
      }
    }

    .step-number {
      ${({ theme }) => theme.mixins.flexCenter};
      width: 32px;
      height: 32px;
      border: 1px solid rgba(100, 255, 218, 0.35);
      border-radius: 50%;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
    }

    h4 {
      margin: 0 0 3px;
      color: var(--lightest-slate);
      font-size: var(--fz-md);
      font-weight: 600;
    }

    p {
      margin: 0;
      color: var(--slate);
      font-size: var(--fz-sm);
      line-height: 1.4;
    }
  }

  .panel-footer {
    display: flex;
    align-items: center;
    margin-top: 16px;
    padding-top: 18px;
    border-top: 1px solid var(--lightest-navy);
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);

    &:before {
      content: '';
      width: 7px;
      height: 7px;
      margin-right: 9px;
      border-radius: 50%;
      background-color: var(--green);
      box-shadow: 0 0 0 4px var(--green-tint);
    }
  }

  @media (max-width: 480px) {
    padding: 22px 20px;
  }
`;

const workflow = [
  {
    title: 'Discover',
    description: 'Surface wheel-strategy opportunities from market data.',
  },
  {
    title: 'Evaluate',
    description: 'Compare potential return, risk, and capital requirements.',
  },
  {
    title: 'Manage',
    description: 'Keep positions and portfolio exposure in one clear view.',
  },
];

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
        <StyledProductCopy>
          <span className="product-label">Founder-built · Options analytics</span>
          <h3>A clearer way to run the wheel.</h3>
          <p className="product-intro">
            Wheelta is an options analytics platform for investors who use the wheel strategy. It
            brings opportunity discovery, risk analysis, and portfolio management into one focused
            workspace—replacing scattered research and spreadsheets with a disciplined workflow.
          </p>

          <div className="founder-context">
            <span className="context-label">Why I built it</span>
            <p>
              I created Wheelta from the system I developed for my own portfolio after years of
              refining the strategy and consistently outperforming the S&amp;P 500. It brings
              together my background in financial modeling, risk systems, and product engineering to
              make a data-informed investing process accessible to more people.
            </p>
          </div>

          <ul className="product-tags" aria-label="Wheelta capabilities">
            <li>Options analytics</li>
            <li>Market data</li>
            <li>Risk analysis</li>
            <li>Portfolio optimization</li>
          </ul>

          <a href="https://www.wheelta.com/" className="visit-button">
            Explore Wheelta <IconExternal />
          </a>
        </StyledProductCopy>

        <StyledProductPanel aria-label="Wheelta strategy workflow">
          <div className="panel-header">
            <div className="product-mark">
              <IconWheelta />
            </div>
            <div>
              <span className="brand-name">Wheelta</span>
              <span className="brand-purpose">From opportunity to portfolio</span>
            </div>
          </div>

          <p className="workflow-label">One connected workflow</p>
          <ol className="workflow">
            {workflow.map(({ title, description }, index) => (
              <li key={title}>
                <span className="step-number">0{index + 1}</span>
                <div>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="panel-footer">Purpose-built for the wheel strategy</div>
        </StyledProductPanel>
      </div>
    </StyledWheeltaSection>
  );
};

export default Wheelta;
