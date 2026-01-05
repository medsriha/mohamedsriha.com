import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledServicesSection = styled.section`
  max-width: 1000px;

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 20px;
    margin-top: 50px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledService = styled.div`
  position: relative;
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 30px;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    background-color: var(--lightest-navy);
  }

  h3 {
    margin: 0 0 15px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    font-weight: 600;
  }

  p {
    margin: 0;
    color: var(--slate);
    font-size: var(--fz-md);
    line-height: 1.5;
  }

  .service-icon {
    color: var(--green);
    font-size: 32px;
    margin-bottom: 20px;
  }
`;

const Services = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const services = [
    {
      title: 'RAG & LLM Systems',
      description:
        'Design and deploy production-grade retrieval-augmented generation pipelines and large language model integrations tailored to your business needs.',
    },
    {
      title: 'NLP Solutions',
      description:
        'Build custom natural language processing models, text analysis systems, and language understanding applications for specialized domains.',
    },
    {
      title: 'ML Engineering & MLOps',
      description:
        'Develop end-to-end machine learning pipelines with robust deployment, monitoring, and continuous improvement practices.',
    },
    {
      title: 'AI Consulting & Strategy',
      description:
        'Provide technical advisory services, architecture design, and strategic guidance for AI initiatives and transformation projects.',
    },
    {
      title: 'Agentic Workflows',
      description:
        'Architect intelligent multi-agent systems that can reason, collaborate, and automate complex decision-making processes.',
    },
    {
      title: 'Cloud & Integration',
      description:
        'Implement scalable cloud infrastructure and seamless frontend integrations to deliver complete AI-powered solutions.',
    },
  ];

  return (
    <StyledServicesSection id="services" ref={revealContainer}>
      <h2 className="numbered-heading">Services</h2>

      <div className="services-grid">
        {services.map((service, i) => (
          <StyledService key={i}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </StyledService>
        ))}
      </div>
    </StyledServicesSection>
  );
};

export default Services;
