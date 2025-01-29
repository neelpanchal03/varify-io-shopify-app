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
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <img
                alt="Step 2: Instructions to locate and copy the Varify JavaScript code snippet from Varify.io, which will open in a popup for further steps."
                style={{maxWidth: '-webkit-fill-available', maxHeight: '-webkit-fill-available'}}
                src="/step_2.png"
              />
            </div>
          </MediaCard>
        </Layout.Section>

        <Layout.Section>
          <MediaCard portrait size="small" title="Step 3: Put javascript code snippet in theme"
                     description="After copying from varify.io paste that code snippet in main theme's header file between <head> tags to establise connection between varify.io and store.">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <img
                alt="Step 3: Instructions to copy the JavaScript code snippet from Varify.io and paste it into the Shopify theme's header file between <head> tags to connect Varify.io with the store."
                style={{maxWidth: '-webkit-fill-available', maxHeight: '-webkit-fill-available'}}
                src="/step_3.png"
              />
            </div>
          </MediaCard>
        </Layout.Section>


        <Layout.Section>
          <MediaCard portrait size="small" title="Step 4: Enable shopify tracker from varify.io tracking options."
                     description="Make sure you have selected Shopify App as analitics connection in tracking setup">

          </MediaCard>
        </Layout.Section>

        <Layout.Section secondary>
          <Card title="Need Help?" sectioned>
            <TextContainer>
              <h1>How to Activate Integration on Varify.io:</h1>
              <Text as="p">
                <Link url="https://varify.io/en/user-documentation/shopify-integration" target="_blank">Read our
                  step-by-step guide</Link><br/>
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
