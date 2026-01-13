import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({ title, description }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            image
          }
        }
      }
    `,
  );

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    image,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname}`,
    image: `${siteUrl}${image}`,
  };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang="en" />

      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://api.emailjs.com" />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" />

      {/* Structured Data - WebSite Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: defaultTitle,
          description: seo.description,
          url: siteUrl,
          author: {
            '@type': 'Person',
            name: 'Mohamed Sriha'
          },
          inLanguage: 'en-US'
        })}
      </script>

      {/* Structured Data - Person Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Mohamed Sriha',
          alternateName: 'Mo Sriha',
          jobTitle: 'AI Engineer',
          description: 'AI Engineer specializing in RAG & LLM systems, NLP solutions, ML engineering, and agentic workflows',
          url: siteUrl,
          image: seo.image,
          knowsAbout: [
            'Retrieval Augmented Generation (RAG)',
            'Large Language Models (LLM)',
            'Natural Language Processing (NLP)',
            'Machine Learning Engineering',
            'MLOps',
            'Agentic Workflows',
            'Cloud Infrastructure',
            'AI System Architecture'
          ],
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Carnegie Mellon University'
          },
          worksFor: {
            '@type': 'Organization',
            name: 'Self-Employed'
          }
        })}
      </script>

      {/* Structured Data - ProfessionalService Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Mo Sriha - AI Engineering Services',
          description: seo.description,
          url: siteUrl,
          image: seo.image,
          priceRange: '$$',
          areaServed: 'Worldwide',
          serviceType: [
            'RAG System Development',
            'LLM Integration',
            'NLP Solutions',
            'ML Engineering',
            'MLOps',
            'AI Consulting'
          ]
        })}
      </script>

      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZR470D22Z3"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZR470D22Z3');
        `}
      </script>
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

Head.defaultProps = {
  title: null,
  description: null,
};
