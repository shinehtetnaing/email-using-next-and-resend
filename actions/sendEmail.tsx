"use server";

import ContactFormEmail from "@/email/contact-form-email";
import { validateString } from "@/lib/utils";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }

  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  console.log("Running on Server");
  console.log(formData.get("senderEmail"));
  console.log(formData.get("message"));

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "shinehtetnaing1998@gmail.com",
      subject: "This is Subject",
      reply_to: senderEmail as string,
      react: React.createElement(ContactFormEmail, {
        message: message as string,
        senderEmail: senderEmail as string,
      }),
      // react: <ContactFormEmail message={message} senderEmail={senderEmail} />,
      // text: message as string,
      // html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
  } catch (error: unknown) {
    console.log(error);
  }
};
