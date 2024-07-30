import {
  Html,
  Head,
  Font,
  Preview,
  Row,
  Heading,
  Section,
  Text
} from '@react-email/components'

interface VerificationEmailProps{
  username: string;
  pin:string;
}

export default function VerificationEmail({
  username,
  pin
}: VerificationEmailProps){
  return(
      <Html lang='en' dir='ltr'>

        <Head>
          <title>Verification Code</title>
          <Font fontFamily='Roboto'
          fallbackFontFamily='Verdana'
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KF0mCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'></Font>

        </Head>
        <Preview> Here&apos;s your verification code: {pin}</Preview>
        <Section>
          <Row>
            <Heading as='h2'>Hello {username},</Heading>
          </Row>
          <Row>
            <Text>
              Thank you for signing up with us. Please use the following code to verify your account:
            </Text>
          </Row>
          <Row>
            <Text>
              {pin}
            </Text>
          </Row>
        </Section>

      </Html>


  );
}