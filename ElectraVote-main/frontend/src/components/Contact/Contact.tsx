import React, { useState, useEffect } from 'react';
import './Contact.scss';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    file: null as File | null  // Define the file state as File | null
  });
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name) errors.name = t('Name is required.');
    if (!formData.email) errors.email = t('Email is required.');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('Please enter a valid email address.');
    }
    if (!formData.subject) errors.subject = t('Subject is required.');
    if (!formData.message) errors.message = t('Message is required.');
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure file is null if no file is selected
    setFormData({
      ...formData,
      file: e.target.files ? e.target.files[0] : null
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setFormStatus(t('Message sent successfully!'));
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        file: null  // Reset file to null after submission
      });
      setFormErrors({});
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => setFormStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-form-container">
          <h1>{t('Contact Us')}</h1>
          {formStatus && <p className="form-status">{formStatus}</p>}
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">{t('Name')}:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("John Doe")}
              required
              autoFocus
            />
            {formErrors.name && <span className="error">{formErrors.name}</span>}
            
            <label htmlFor="email">{t('Email')}:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("john.doe@example.com")}
              required
            />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
            
            <label htmlFor="subject">{t('Subject')}:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder={t("Subject of your message")}
              required
            />
            {formErrors.subject && <span className="error">{formErrors.subject}</span>}
            
            <label htmlFor="message">{t('Message')}:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("Your message here...")}
              required
            />
            {formErrors.message && <span className="error">{formErrors.message}</span>}
            
            <label htmlFor="file">{t('Attach File')}:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
            />
            
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <div className="spinner"></div> : t('Send Message')}
            </button>
          </form>
        </div>
        <div className="map-container">
          <h2>{t('Our Location')}</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59601.02085073576!2d75.53422341269037!3d20.99007939604263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90fa4a1eab90f%3A0x37f67bd21bff0a3c!2sJalgaon%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1725889963603!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: '0' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("Map")}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
