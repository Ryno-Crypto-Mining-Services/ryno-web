# Email Testing Guide

This directory contains comprehensive tests for the contact form email functionality.

## Test Structure

```
tests/
├── e2e/
│   └── contact-form.test.ts    # End-to-end integration tests
server/
├── routers/
│   └── email.test.ts           # Email router unit tests
└── config/
    └── email.test.ts           # Configuration validation tests
```

## Running Tests

### Run All Tests
```bash
pnpm test
```

### Run Specific Test Suites

**Email Router Tests:**
```bash
pnpm test server/routers/email.test.ts
```

**Configuration Tests:**
```bash
pnpm test server/config/email.test.ts
```

**E2E Tests:**
```bash
pnpm test tests/e2e/contact-form.test.ts
```

### Run Tests in Watch Mode
```bash
pnpm test --watch
```

### Run Tests with Coverage
```bash
pnpm test --coverage
```

## Test Categories

### 1. Email Router Tests (`server/routers/email.test.ts`)

Tests the core email sending functionality:
- ✅ Input validation
- ✅ Environment variable requirements
- ✅ Mailgun API integration
- ✅ Error handling
- ✅ HTML escaping
- ✅ Admin and user email sending
- ✅ Authorization headers
- ✅ API endpoint correctness

### 2. Configuration Tests (`server/config/email.test.ts`)

Validates email service configuration:
- ✅ Required environment variables
- ✅ Email format validation
- ✅ API key format
- ✅ HTTPS enforcement
- ✅ SMTP configuration (if used)
- ✅ No placeholder values
- ✅ Production-ready settings

### 3. E2E Tests (`tests/e2e/contact-form.test.ts`)

Tests the complete flow:
- ✅ Configuration validation
- ✅ Form validation
- ✅ Email content generation
- ✅ Error handling
- ✅ Security measures
- ✅ Performance expectations
- ✅ Monitoring and logging

## Required Environment Variables

Before running tests, ensure these environment variables are set:

```bash
MAILGUN_API_KEY=your-api-key-here
MAILGUN_SENDER_EMAIL=notifications@sales.rynocrypto.com
MAILGUN_RECEIVER_EMAIL=your-slack-email@ryno-crypto.slack.com
MAILGUN_API_ENDPOINT=https://api.mailgun.net
```

## Configuration Validation

Run the configuration validator to check your setup:

```typescript
import { validateEmailConfig } from "./server/config/email.test";

const validation = validateEmailConfig();
if (!validation.valid) {
  console.error("Configuration errors:", validation.errors);
}
```

## Common Issues

### 1. Missing Environment Variables

**Error:** `Missing required environment variable: MAILGUN_API_KEY`

**Solution:** Ensure all required environment variables are set in your `.env` file or environment.

### 2. Invalid Email Format

**Error:** `MAILGUN_SENDER_EMAIL is not a valid email address`

**Solution:** Check that your email addresses follow the format `user@domain.com`.

### 3. API Key Format

**Error:** `API key format invalid`

**Solution:** Mailgun API keys should be hexadecimal strings with hyphens. Verify your key from the Mailgun dashboard.

### 4. HTTPS Requirement

**Error:** `MAILGUN_API_ENDPOINT must use HTTPS`

**Solution:** Ensure your API endpoint starts with `https://`.

## Test Coverage Goals

- **Unit Tests:** 90%+ coverage
- **Integration Tests:** All critical paths
- **E2E Tests:** Happy path + major error scenarios

## Continuous Integration

Tests run automatically on:
- Every commit (pre-commit hook)
- Pull requests
- Deployment pipeline

## Debugging Tests

### Enable Verbose Logging
```bash
DEBUG=* pnpm test
```

### Run Single Test
```bash
pnpm test -t "should send admin notification email successfully"
```

### Inspect Test Failures
```bash
pnpm test --reporter=verbose
```

## Best Practices

1. **Always validate configuration first** - Run config tests before other tests
2. **Mock external services** - Use mocks for Mailgun API in unit tests
3. **Test error scenarios** - Don't just test the happy path
4. **Keep tests isolated** - Each test should be independent
5. **Use descriptive test names** - Make failures easy to understand

## Security Notes

- ⚠️ Never commit API keys to version control
- ⚠️ Use environment variables for all secrets
- ⚠️ Test files should not contain real credentials
- ⚠️ Mock sensitive data in tests

## Monitoring

After deployment, monitor:
- Email delivery success rate
- API response times
- Error rates
- Mailgun dashboard for deliverability

## Support

For issues with:
- **Tests:** Check this README and test comments
- **Mailgun:** Visit [Mailgun Documentation](https://documentation.mailgun.com/)
- **Configuration:** Run `validateEmailConfig()` for detailed errors
