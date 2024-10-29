import {authenticate} from "../shopify.server";


import {
  BlockStack,
  Button,
  Card,
  InlineGrid,
  Layout,
  Link,
  MediaCard,
  Page,
  Text,
  TextContainer
} from '@shopify/polaris';

export const loader = async ({request}) => {
  await authenticate.admin(request);

  return null;
};


export default function Index() {

  return (
    <Page title="Varify.io Integration">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <h1>Activate Your Integration on Varify.io</h1>
              <Text as="p">
                Your Shopify app is installed and ready to connect with <Link target="_blank"
                                                                              url="http://Varify.io">Varify.io</Link>.
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


        <Layout.Section>
          <MediaCard portrait size="small" title="Step 2: Get varify javascript code snippet from varify.io"
                     description="Find your varify javascript code snippet from above instruction click on that, It will open popup and you can follow next step.">
            <img
              alt="Step 2: Instructions to locate and copy the Varify JavaScript code snippet from Varify.io, which will open in a popup for further steps."
              width="100%"
              height="100%"
              style={{objectFit: 'cover', objectPosition: 'center'}}
              src="/step_2.png"
            />
          </MediaCard>
        </Layout.Section>

        <Layout.Section>
          <MediaCard portrait size="small" title="Step 3: Put javascript code snippet in theme"
                     description="After copying from varify.io paste that code snippet in main theme's header file between <head> tags to establise connection between varify.io and store.">
            <img
              alt="Step 3: Instructions to copy the JavaScript code snippet from Varify.io and paste it into the Shopify theme's header file between <head> tags to connect Varify.io with the store."
              width="100%"
              height="100%"
              style={{objectFit: 'cover', objectPosition: 'center'}}
              src="/step_3.png"
            />
          </MediaCard>
        </Layout.Section>


        <Layout.Section>
          <MediaCard portrait size="small" title="Step 4: Enable embed app from theme's admin panel"
                     description="Make sure you have enabled ambed app from Theme(live) > Customize > App embeds.">

          </MediaCard>
        </Layout.Section>

        <Layout.Section secondary>
          <Card title="Need Help?" sectioned>
            <TextContainer>
              <h1>How to Activate Integration on Varify.io:</h1>
              <Text as="p">
                <Link url="#">Read our step-by-step guide</Link><br/>
                <Link url="#">Watch a quick tutorial video</Link>
              </Text>
              <Text as="p">
                <span style={{textDecoration: 'none'}}>Contact Support:&nbsp;
                  <Link
                    url="mailto:support@varify.io"
                    target="_blank"
                    rel="noopener noreferrer">
                    support@varify.io
                  </Link>
                </span>
              </Text>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
