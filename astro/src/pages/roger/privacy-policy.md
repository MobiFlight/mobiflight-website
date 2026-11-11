---
layout: "@/layouts/default-md.astro"
title: "Roger, the MobiFlight Assistant - Privacy Policy"
---
# Privacy Policy – Roger, the MobiFlight Assistant

*Last updated: November 2026*

---

## 1. Introduction

Roger is an automated assistant on the MobiFlight Discord server. It helps members with
MobiFlight questions by suggesting solutions that other members and helpers have already found,
and by guiding you with follow-up questions to find the cause of a problem.

This Privacy Policy explains what personal data Roger handles, why, and what rights you have — in
accordance with the EU General Data Protection Regulation (GDPR / DSGVO) and the German Federal
Data Protection Act (BDSG). It is specific to Roger. For our website and the MobiFlight project
in general, see the [general MobiFlight Privacy Policy](/privacy-policy/).
Discord is a separate controller for everything you do on Discord itself.

---

## 2. Data Controller

The data controller responsible for Roger is:

MobiFlight\
Sebastian Möbius\
Schneider-Bäumles-Weg 3

71336 Waiblingen\
Baden-Württemberg, Deutschland

Email: info@mobiflight.com

---

## 3. What Data We Process and Why

To suggest solutions, we read messages in our support channels and turn them into a searchable
knowledge base. Roger is automated and can be wrong; a human helper can always step in.

### 3.1 Messages in the Support Channels

- Message text and references to attachments
- Date and time, and the channel or thread the message was posted in

Obvious personal data inside messages (email addresses, phone numbers, IP addresses, mentions, and
user names inside file paths) is masked before the message is stored. Images are currently not
analysed. We do not read direct messages between members.

### 3.2 Discord User IDs

We never store your Discord user ID or user name in clear text. Instead, we store a keyed hash
(a pseudonym). This lets us group the messages of a conversation and find your data if you ask
us to remove it, without keeping your name.

### 3.3 Your Questions to Roger

When you mention Roger, use `/ask`, or use the "Ask MobiFlight" message command, your text is used
to find an answer and is not stored separately by Roger. If you write in a support channel, your
message is handled as described in section 3.1.

### 3.4 Moderator Actions

When a moderator marks a question or an answer for the knowledge base, we store the pseudonym of the
moderator and of the author of the marked message.

### 3.5 Troubleshooting Notes

While Roger guides you through a troubleshooting conversation, it keeps short-lived notes (for
example the board type you mentioned). They are discarded when the conversation ends.

### 3.6 What We Do Not Collect

We do not collect presence or status information, member lists, or any data outside our Discord
server. Roger does not moderate and takes no action against members.

---

## 4. Two-Level Storage and Retention

1. **Raw messages** (masked as described above, with a pseudonym instead of your user ID) serve as
   working storage. They are deleted after **12 months**.
2. **Knowledge base:** rewritten, self-contained questions and answers, topics, and links to the
   original message. It contains no user names or user IDs. It is kept as long as it is useful
   and is corrected or removed when it is out of date.

To prefer reliable answers, Roger may weigh content by pseudonymous signals, such as whether the
author is a moderator or helper and how long and how helpfully they have taken part. This only
influences which answer is suggested. It has no effect on you as a person.

---

## 5. Purposes and Legal Basis

We process this data to run and improve support for the MobiFlight community: answering questions
faster and more consistently. The legal basis is our legitimate interest (Art. 6(1)(f) GDPR).

We have weighed this interest against yours: messages were written in a public support setting for
exactly this purpose, personal data is masked, pseudonyms are used instead of user IDs, retention
is limited, and you can object at any time (see section 9).

We do not sell data, show advertising, or take decisions about you that have legal or similarly
significant effects.

---

## 6. Who Receives Data

- **Language-model provider.** To extract answers and to write replies, relevant text is sent to a
  provider that processes it on our behalf. Currently this is Anthropic (Claude API). We send the
  message being answered, short recent chat context, and retrieved knowledge-base entries, with
  personal data masked and without user names. We plan to move to a model hosted by us and will
  update this page when that happens.
- **Discord**, the platform on which Roger's replies are posted.
- Hosting and technical service providers, where needed to operate the system.

---

## 7. Transfers Outside the EU/EEA

If data is sent outside the EU/EEA (for example to the United States), we rely on appropriate
safeguards, such as standard contractual clauses under the provider's terms.

---

## 8. Security

Access is limited to the project owner and authorised helpers. The service requires secret keys,
requests from Discord are signature-verified, and user IDs are pseudonymised with a secret key
that is stored separately from the data.

---

## 9. Your Rights

You have the right to access, correct, and delete your data, to restrict processing, to data
portability, and **to object** to our processing of your messages (Art. 15–21 GDPR).

To use these rights, write to info@mobiflight.com and include your Discord user ID or links to the
messages concerned. We will delete your messages from the raw store, remove knowledge-base entries
derived from them, and, if you wish, exclude you from future processing. We answer within one
month.

You also have the right to lodge a complaint with a data protection authority, for example the
Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg, or the
authority in your country.

---

## 10. Changes to This Policy

We will update this page when something material changes and will announce important changes on the
server.