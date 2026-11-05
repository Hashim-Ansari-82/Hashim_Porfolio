
import { supabase } from '@/lib/supabase';
import { profile } from '@/data/portfolio';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<
  Record<keyof ContactPayload, string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length > 100) {
    errors.name = 'Name must be 100 characters or fewer.';
  }

  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!subject) errors.subject = 'Please add a subject.';
  else if (subject.length > 150) {
    errors.subject = 'Subject must be 150 characters or fewer.';
  }

  if (!message) errors.message = 'Please write a message.';
  else if (message.length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  } else if (message.length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.';
  }

  return errors;
}

export async function submitContactMessage(
  values: ContactPayload
): Promise<void> {
  const cleanedValues = {
    name: values.name.trim(),
    email: values.email.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
  };

  const controller = new AbortController();

  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${profile.email}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: new URLSearchParams({
          ...cleanedValues,
          _subject: `New Portfolio Message: ${cleanedValues.subject}`,
          _replyto: cleanedValues.email,
          _template: 'table',
        }),
        signal: controller.signal,
      }
    );

    const responseText = await response.text();

    let result: {
      success?: boolean | string;
      message?: string;
    };

    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error('Invalid response received from email service.');
    }

    if (
      !response.ok ||
      String(result.success).toLowerCase() !== 'true'
    ) {
      throw new Error(
        result.message || `Email service error: ${response.status}`
      );
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(
        'Request timed out. Please check your internet connection and try again.'
      );
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }

  // Save the message in Supabase as well.
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert(cleanedValues);

    if (error) {
      console.error('Supabase save failed:', error);
    }
  } catch (error) {
    console.error('Supabase database error:', error);
  }
}
