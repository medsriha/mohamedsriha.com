import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { IconExternal } from '@components/icons';

const StyledAboutSection = styled.section`
  max-width: 900px;
  margin: 0 auto;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const StyledFounderSpotlight = styled.aside`
  position: relative;
  margin: 30px 0;
  padding: 26px;
  overflow: hidden;
  border: 1px solid var(--lightest-navy);
  border-radius: var(--border-radius);
  background: linear-gradient(135deg, var(--light-navy), rgba(17, 34, 64, 0.55));
  box-shadow: 0 10px 30px -20px var(--navy-shadow);
  transition: var(--transition);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: var(--green);
  }

  &:hover {
    border-color: rgba(100, 255, 218, 0.45);
    box-shadow: 0 18px 35px -20px var(--navy-shadow);
    transform: translateY(-3px);
  }

  .founder-label {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    letter-spacing: 0.08em;
    text-transform: uppercase;

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

  h3 {
    margin: 0 0 14px;
    color: var(--lightest-slate);
    font-size: clamp(var(--fz-xl), 3vw, var(--fz-heading));
    line-height: 1.15;
  }

  p {
    margin: 0 0 20px;
    color: var(--light-slate);
    font-size: var(--fz-md);
  }

  .founder-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .founder-role {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }

  .founder-link {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 600;

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

  @media (max-width: 480px) {
    padding: 22px 20px 22px 24px;

    .founder-footer {
      align-items: flex-start;
      flex-direction: column;
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hi! I'm an engineer specializing in LLM systems and ML engineering. I currently work
              at deepset.ai, where I help enterprise teams like Pepsi, The Economist, and Toyota
              design and ship production AI systems.
            </p>

            <p>
              Much of my recent work has centered on autonomous agents; from building an MCP server
              for code refactoring to designing agents that process large volumes of data to surface
              insights in real time. A highlight was leading end-to-end development of a multi-agent
              chatbot for a market research and customer insights platform used by teams at Meta,
              Google, Xbox, and other global brands to better understand customer behavior. The
              chatbot launched in under a month and delivered 5× ROI within a year. I also
              contribute to Haystack, deepset's open-source framework for building AI pipelines and
              agents.
            </p>

            <StyledFounderSpotlight>
              <div className="founder-label">Founder spotlight</div>
              <h3>Building Wheelta from strategy to product.</h3>
              <p>
                That same drive to turn complex systems into practical products led me to found
                Wheelta. After years of trading the wheel strategy and consistently outperforming
                the S&amp;P 500, I transformed my process into a focused options analytics platform—
                bringing opportunity discovery, risk analysis, and portfolio discipline into one
                clear workflow for investors.
              </p>
              <div className="founder-footer">
                <span className="founder-role">Founder · Product builder · Options trader</span>
                <a href="https://www.wheelta.com/" className="founder-link">
                  Explore Wheelta <IconExternal />
                </a>
              </div>
            </StyledFounderSpotlight>

            <p>
              The foundation for Wheelta was shaped by my six years as an ML engineer at BMO US,
              where I learned to turn financial data, risk models, and complex workflows into tools
              people could trust. On the Credit Risk team, I built and validated predictive models
              for credit default, worked with large-scale customer data, and helped modernize legacy
              risk systems. I later led the Anti-Money Laundering team, developing NLP tools that
              cut investigation time by 65% and delivered more than $1M in annual savings. That
              combination of financial expertise, rigorous risk analysis, and practical product
              building continues to shape how I lead Wheelta today.
            </p>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Mohamed Sriha, AI Engineer specializing in RAG and LLM systems"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
