import { ServerClient, TemplatedMessage } from "postmark"

const from = process.env.MAIL_FROM ?? "no-reply@quirrel.dev"

export const postmark = new ServerClient(process.env.POSTMARK_TOKEN ?? "")

export async function sendEmailWithTemplate(
  to: string,
  templateId: string,
  templateModel: Record<string, string>
) {
  const message = new TemplatedMessage(from, templateId, templateModel, to)

  await postmark.sendEmailWithTemplate(message)
}
