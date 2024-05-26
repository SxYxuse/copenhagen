---
title: 'Password reset'
---

# Password reset

## Overview

A common approach to password reset is to use the user's email address. The user enters their email and, if the email is valid, a password reset link is sent to the mailbox. This requires each user to have a unique email address - see the [Email verification](/content/email-verification) guide.

The email does not need to be verified before sending a reset link. You should even mark a user's email address as verified if they reset their password.

This page will only cover password reset links as it is the most common approach.

## Password reset links

Password reset requires 2 pages. First is the page where users enter their email address.

```untype
https://example.com/reset-password
```

Next is the actual password reset form, where the user enters their new password. This is the link that gets sent to the user's mailbox. A password reset [token](/content/server-side-tokens) is included as part of the URL path.

```untype
https://example.com/reset-password/<TOKEN>
```

Tokens should be valid for around an hour, and 24 hours at most. Invalidate existing tokens when sending another token, or reuse an existing valid token if one already exists. It's recommended to hash tokens with SHA-256 before storing them.

The token must be single-use. Delete the token when the user sends a valid password through the form.

Make sure to set the [Referrer Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) tag to `no-referrer` for any path that includes tokens to protect the tokens from referer leakage.

If the user has implemented [multi-factor authentication](/content/mfa), such as via authenticator apps or passkeys, they should be prompted to authenticate using their second factor before entering their new password.

## Error handling

If the email is invalid, you can either tell the user that the email is invalid or keep the message vague (e.g. "We'll send a reset email if the account exists"). This will depend on whether you'd want to keep the validity of emails public or private. See [Error handling](/content/password-authentication#error-handling) in the Password authentication guide for more information.

## Rate limiting

Any endpoint that can send emails should have strict rate limiting implemented. Use Captchas if necessary.
