import { handleContactRequest } from "../server/contact.js";

export default async function contact(req, res) {
  await handleContactRequest(req, res);
}
