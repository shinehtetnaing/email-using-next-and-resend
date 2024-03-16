"use client";

import { sendEmail } from "@/actions/sendEmail";
import React from "react";
import SubmitBtn from "./submit-btn";

const contact = () => {
  return (
    <form
      action={async (formData) => {
        await sendEmail(formData);
      }}
      className="mt-10 flex flex-col"
    >
      <input
        type="email"
        name="senderEmail"
        required
        maxLength={500}
        placeholder="Your email"
        className="h-14 px-4 rounded-lg border border-black/10"
      />
      <textarea
        name="message"
        required
        maxLength={5000}
        placeholder="Your message"
        className="h-52 my-3 rounded-lg border border-black/10 p-4"
      ></textarea>
      <SubmitBtn />
    </form>
  );
};

export default contact;
