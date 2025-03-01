import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

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

const StyledTechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 10px;

  span {
    display: inline-block;
    background-color: rgba(100, 255, 218, 0.1);
    color: var(--green);
    border-radius: 14px;
    padding: 8px 5px;
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    transition: var(--transition);
    
    &:hover {
      background-color: var(--lightest-navy);
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

  const skills = [
    'Agentic systems', 'NLP', 'Python', 'Machine Learning', 'Leadership'
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              As an experienced AI Engineer, I specialize in helping customers at <a href="https://www.deepset.ai/">deepset</a> develop multi-agent systems that effectively negotiate, reason, and analyze large and complex datasets. My passion lies in designing and constructing AI systems, whether it's orchestrating financial negotiation agents for multi-million dollar loan restructurings or creating research agents that extract actionable insights from vast pools of structured and unstructured data.
            </p>

            <p>
              I take great pride in consistently delivering innovative solutions that transform business operations and provide substantial competitive advantages. During my time at <a href="https://www.bmo.com/en-us/main/personal/">BMO</a>, I led a team that implemented an enterprise-scale NLP solution for anti-money laundering compliance. This initiative resulted in a 65% reduction in the time taken for money laundering investigations and generated over $1 million in annual cost savings. By merging advanced machine learning techniques with deep industry expertise, I enhanced the accuracy of risk assessments and optimized compliance workflows across various business units.
            </p>

            <p>My core technical competencies include:</p>
          </div>

          <StyledTechList>
            {skills && skills.map((skill, i) => <span key={i}>{skill}</span>)}
          </StyledTechList>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
