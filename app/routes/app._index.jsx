import { authenticate } from "../shopify.server";
import { useEffect } from 'react';


// Import Polaris components
import {
  Page,
  Card,
  Button,
  Layout,
  TextContainer,
  Link,
  Text,
  MediaCard,
  BlockStack,
  InlineGrid
} from '@shopify/polaris';
// Destructure the components you need from the default export

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};




export default function Index() {
  useEffect(() => {
    // Set up the App Bridge here if needed
  }, []);

  return (
    <Page title="Varify.io Integration">
      {/*<TitleBar title="Varify.io Integration" />*/}
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <h1>Activate Your Integration on Varify.io</h1>
              <Text as="p">
                Your Shopify app is installed and ready to connect with <Link target="_blank" url="http://Varify.io">Varify.io</Link>.
                To start syncing your Shopify data and analyze your experiments, please activate the integration
                from your Varify.io account.
              </Text>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card roundedAbove="sm">
            <BlockStack gap="200">
              <InlineGrid columns="1fr auto">
                <Text as="h2" variant="headingSm">
                  Step 1: Login in to your varify.io account.
                </Text>
                <Button target="_blank" url="http://varify.io">Varify.io</Button>
              </InlineGrid>
            </BlockStack>
          </Card>
        </Layout.Section>


        <Layout.Section >
          <MediaCard portrait size="small" title="Step 2: Get varify javascript code snippet from varify.io" description="Find your varify javascript code snippet from above instruction click on that, It will open popup and you can follow next step.">
            <img
              alt=""
              width="100%"
              height="100%"
              style={{objectFit: 'cover', objectPosition: 'center'}}
              src="/step_2.png"
            />
          </MediaCard>
        </Layout.Section>

        <Layout.Section >
          <MediaCard portrait size="small" title="Step 3: Put javascript code snippet in theme" description="After copying from varify.io paste that code snippet in main theme's header file between <head> tags to establise connection between varify.io and store.">
            <img
              alt=""
              width="100%"
              height="100%"
              style={{objectFit: 'cover', objectPosition: 'center'}}
              src="/step_3.png"
            />
          </MediaCard>
        </Layout.Section>


        <Layout.Section >
          <MediaCard portrait size="small" title="Step 4: Enable embed app from theme's admin panel" description="Make sure you have enabled ambed app from Theme(live) > Customize > App embeds.">

          </MediaCard>
        </Layout.Section>

        <Layout.Section secondary>
          <Card title="Need Help?" sectioned>
            <TextContainer>
              <h1>How to Activate Integration on Varify.io:</h1>
              <Text as="p">
                <Link url="#">Read our step-by-step guide</Link><br />
                <Link url="#">Watch a quick tutorial video</Link>
              </Text>
              <Text as="p">
                📧 Contact Support: support@varify.io
              </Text>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
