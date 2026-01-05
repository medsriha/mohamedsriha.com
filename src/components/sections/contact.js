import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import emailjs from '@emailjs/browser';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }
`;

const StyledForm = styled.form`
  margin-top: 50px;
  width: 100%;

  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }

  label {
    display: block;
    margin-bottom: 10px;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  input, textarea {
    width: 100%;
    padding: 12px;
    background-color: var(--light-navy);
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    
    &:focus {
      outline: none;
      border-color: var(--green-tint);
      background-color: var(--navy);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  .submit-button {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 20px;
    width: auto;
    padding: 1.25rem 1.75rem;
  }

  .status-message {
    margin-top: 20px;
    color: ${props => (props.isError ? 'var(--red)' : 'var(--green)')};
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const form = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [formData, setFormData] = useState({
    from_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ message: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: '', isError: false });

    try {
      await emailjs.sendForm(
        'service_ko6llps', // Replace with your EmailJS service ID
        'template_eajfxsc', // Replace with your EmailJS template ID
        form.current,
        'GVvsJCRM9KhgdKL_J' // Replace with your EmailJS public key
      );

      setStatus({
        message: 'Thank you! I will get back to you as soon as possible.',
        isError: false
      });
      setFormData({ from_name: '', user_email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        message: `Oops! Something went wrong. ${error.text || 'Please try again later.'}`,
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledContactSection id="contact" ref={revealContainer}>

      <h2 className="title">Get In Touch</h2>
      
      <StyledForm ref={form} onSubmit={handleSubmit} isError={status.isError}>
        <div className="form-group">
          <label htmlFor="from_name">Name:</label>
          <input
            type="text"
            id="from_name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user_email">Email:</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        {status.message && (
          <p className="status-message">{status.message}</p>
        )}
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </StyledForm>
    </StyledContactSection>
  );
};

export default Contact;
