import React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  country?: string
}

const Email = ({ name, country }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to 7 Wings Immigration — we've received your enquiry</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandBar}>
          <Text style={brandText}>7 WINGS IMMIGRATION</Text>
        </Section>
        <Heading style={h1}>
          Welcome{name ? `, ${name}` : ''}!
        </Heading>
        <Text style={lead}>
          Thank you for reaching out to 7 Wings Immigration — Hyderabad's
          premium consultancy for global careers. Your enquiry
          {country ? ` about ${country}` : ''} has been received and one of our
          senior counsellors will get back to you within{' '}
          <strong>4 working hours</strong>.
        </Text>

        <Section style={infoCard}>
          <Text style={infoTitle}>What happens next?</Text>
          <Text style={infoItem}>1. A counsellor reviews your profile</Text>
          <Text style={infoItem}>2. We call you to plan a free 30-min consultation</Text>
          <Text style={infoItem}>3. You receive a personalised pathway report</Text>
        </Section>

        <Section style={ctaWrap}>
          <Button href="https://www.7wingsimmigration.com/eligibility" style={ctaBtn}>
            Take the Free Eligibility Check
          </Button>
        </Section>

        <Hr style={hr} />

        <Text style={contactTitle}>Need to reach us sooner?</Text>
        <Text style={contactLine}>
          📞 <Link href="tel:+919876543210" style={link}>+91 98765 43210</Link>
        </Text>
        <Text style={contactLine}>
          ✉️{' '}
          <Link href="mailto:info@7wingsimmigration.com" style={link}>
            info@7wingsimmigration.com
          </Link>
        </Text>
        <Text style={contactLine}>
          📍 Hi-Tech City, Madhapur, Hyderabad, Telangana, INDIA
        </Text>

        <Hr style={hr} />
        <Text style={footer}>
          Soar beyond borders. Land with confidence.
          <br />— Team 7 Wings Immigration
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Welcome to 7 Wings Immigration — we received your enquiry',
  displayName: 'Welcome / Enquiry Acknowledgement',
  previewData: { name: 'Aarav', country: 'Germany' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = {
  padding: '28px 28px 32px',
  maxWidth: '560px',
  margin: '0 auto',
}
const brandBar = {
  background: '#0D2E7D',
  padding: '12px 16px',
  borderRadius: '8px',
  marginBottom: '20px',
}
const brandText = {
  color: '#D4AF37',
  fontSize: '13px',
  letterSpacing: '0.18em',
  margin: '0',
  fontWeight: '700' as const,
}
const h1 = {
  color: '#0D2E7D',
  fontSize: '24px',
  fontWeight: '700' as const,
  margin: '0 0 12px',
}
const lead = { color: '#334155', fontSize: '15px', lineHeight: '1.55', margin: '0 0 20px' }
const infoCard = {
  background: '#FFF8E7',
  border: '1px solid #F3E2A6',
  borderRadius: '10px',
  padding: '16px 18px',
  margin: '0 0 20px',
}
const infoTitle = {
  color: '#0D2E7D',
  fontSize: '14px',
  fontWeight: '700' as const,
  margin: '0 0 8px',
}
const infoItem = { color: '#0F172A', fontSize: '14px', margin: '4px 0' }
const ctaWrap = { textAlign: 'center' as const, margin: '8px 0 4px' }
const ctaBtn = {
  background: '#D4AF37',
  color: '#0D2E7D',
  fontWeight: '700' as const,
  padding: '12px 20px',
  borderRadius: '999px',
  textDecoration: 'none',
  fontSize: '14px',
}
const hr = { borderColor: '#E5E7EB', margin: '20px 0' }
const contactTitle = {
  color: '#0D2E7D',
  fontSize: '13px',
  fontWeight: '700' as const,
  margin: '0 0 6px',
}
const contactLine = { color: '#334155', fontSize: '14px', margin: '2px 0' }
const link = { color: '#0D2E7D', textDecoration: 'underline' }
const footer = { color: '#64748B', fontSize: '12px', margin: '0', lineHeight: '1.6' }
