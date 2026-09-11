import { env } from "@numo/env/server"
import { Resend } from "resend"

export const resend = new Resend(env.RESEND_API_KEY)

type OtpEmailType = "sign-in" | "email-verification" | "forget-password" | "change-email"

const otpSubjects: Record<OtpEmailType, string> = {
  "sign-in": "Your Numo sign-in code",
  "email-verification": "Verify your email for Numo",
  "forget-password": "Reset your Numo password",
  "change-email": "Confirm your new email for Numo",
}

export async function sendOtpEmail({
  to,
  otp,
  type,
}: {
  to: string
  otp: string
  type: OtpEmailType
}) {
  const { data, error } = await resend.emails.send(
    {
      from: env.RESEND_FROM_EMAIL,
      to: [to],
      subject: otpSubjects[type],
      html: `<p>Your verification code is <strong>${otp}</strong>.</p><p>This code expires in 5 minutes.</p>`,
      text: `Your verification code is ${otp}. This code expires in 5 minutes.`,
    },
    {
      idempotencyKey: `otp-${type}/${to}/${otp}`,
    }
  )

  if (error) {
    console.error("Failed to send OTP email:", error.message)
    throw new Error(error.message)
  }

  return data
}
