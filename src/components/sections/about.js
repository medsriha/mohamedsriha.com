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

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I'm a freelance AI engineer who helps organizations design and deploy production-grade AI systems. With experience working with leading brands like <a href="https://www.ypulse.com/">YPulse</a>, <a href="https://www.pepsi.com/">Pepsi</a>, <a href="https://www.foodchainid.com/">FoodChain ID</a>, <a href="https://www.opensesame.com/">OpenSesame</a>, <a href="https://www.economist.com/">The Economist</a>, and <a href="https://www.ncqa.org/">NCQA</a>, I specialize in transforming AI research into scalable, reliable solutions.
            </p>

            <p>
              My expertise spans RAG & LLM systems, NLP solutions, ML engineering & MLOps, agentic workflows, cloud infrastructure, and frontend integration. Whether it's architecting multi-agent systems that reason and collaborate, designing retrieval solutions that capture nuance, or building end-to-end ML pipelines, I focus on delivering AI systems that organizations can trust and deploy with confidence.
            </p>

            <p>
              What drives me is solving complex real-world problems through practical AI applications—from extracting insights from regulatory documents to powering advanced semantic search, from automating workflows to building intelligent interfaces. I bring both deep technical expertise and a collaborative approach to every project.
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
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
