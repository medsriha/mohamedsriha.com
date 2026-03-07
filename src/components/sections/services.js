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
        'Build retrieval-augmented generation systems that balance accuracy and latency—from vector store selection and chunking strategies to prompt engineering, evaluation frameworks, and fine-tuning for domain-specific needs.',
    },
    {
      title: 'NLP Applications',
      description:
        'Develop custom NLP solutions for specialized domains: information extraction from unstructured documents, semantic search, text classification, entity recognition, and document understanding systems.',
    },
    {
      title: 'ML Engineering & MLOps',
      description:
        'Build end-to-end ML pipelines with automated training, evaluation, deployment, and monitoring. Implement CI/CD for models, experiment tracking, model versioning, and performance monitoring in production.',
    },
    {
      title: 'AI Consulting & Strategy',
      description:
        'Technical advisory for AI initiatives: architecture reviews, technology stack selection, feasibility assessments, and implementation roadmaps. Help you navigate from proof-of-concept to production deployment.',
    },
    {
      title: 'Agentic Workflows',
      description:
        'Design multi-agent systems with specialized roles, tool use, and collaborative reasoning. From research agents to workflow automation—systems that break down complex tasks and execute them autonomously.',
    },
    {
      title: 'Cloud & Integration',
      description:
        'Deploy AI systems on cloud infrastructure (AWS, GCP, Azure) with proper scaling, security, and cost optimization. Integrate AI capabilities into existing applications through APIs and frontend interfaces.',
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
