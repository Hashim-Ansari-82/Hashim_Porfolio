
import { Send } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  validateContact,
  type ContactErrors,
  type ContactPayload,
} from '@/services/contactService';

const emptyValues: ContactPayload = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const MESSAGE_LIMIT = 2000;
const RECIPIENT_EMAIL = 'mohammadhashim7922@gmail.com';

export default function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const field = name as keyof ContactPayload;

    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateContact(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const subject = encodeURIComponent(
      `Portfolio Contact: ${values.subject.trim()}`
    );

    const body = encodeURIComponent(
      `Name: ${values.name.trim()}\n` +
      `Email: ${values.email.trim()}\n\n` +
      `Message:\n${values.message.trim()}`
    );

    window.location.href =
      `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const fieldClass = (hasError: boolean) =>
    hasError
      ? 'field !border-danger-500/70 focus:!shadow-[0_0_0_4px_rgb(239_68_68/0.18)]'
      : 'field';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass-strong space-y-6 rounded-3xl p-6 sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="block text-sm font-medium text-ink-100">
            Full Name
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Your name"
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={fieldClass(Boolean(errors.name))}
          />

          {errors.name && (
            <p id="contact-name-error" className="text-xs text-danger-300">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-email" className="block text-sm font-medium text-ink-100">
            Email Address
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={fieldClass(Boolean(errors.email))}
          />

          {errors.email && (
            <p id="contact-email-error" className="text-xs text-danger-300">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-subject" className="block text-sm font-medium text-ink-100">
          Subject
        </label>

        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          placeholder="What would you like to discuss?"
          maxLength={150}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          className={fieldClass(Boolean(errors.subject))}
        />

        {errors.subject && (
          <p id="contact-subject-error" className="text-xs text-danger-300">
            {errors.subject}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="contact-message" className="block text-sm font-medium text-ink-100">
            Message
          </label>

          <span className="font-sans text-[11px] text-ink-500" aria-live="off">
            {values.message.length}/{MESSAGE_LIMIT}
          </span>
        </div>

        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={handleChange}
          placeholder="Tell me about the project, role, or idea."
          maxLength={MESSAGE_LIMIT}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${fieldClass(Boolean(errors.message))} resize-y leading-[1.5]`}
        />

        {errors.message && (
          <p id="contact-message-error" className="text-xs text-danger-300">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary w-full sm:w-auto"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send Message
        </button>
      </div>
    </form>
  );
}
