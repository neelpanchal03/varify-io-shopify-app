import {authenticate} from "../shopify.server";


import {BlockStack, Button, Card, InlineGrid, Layout, Link, List, Page, Text, TextContainer} from '@shopify/polaris';
import React from "react";

export const loader = async ({request}) => {
  await authenticate.admin(request);

  return null;
};


export default function Index() {

  return (
    <Page title="Varify - Shopify Tracking App">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <Text>
                <Text as="span" fontWeight="bold">Congratulations</Text> – your Varify Shopify Tracking App is
                installed!
              </Text>
            </TextContainer>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card sectioned>
            <BlockStack gap="400">
              <TextContainer>
                <InlineGrid columns="1fr auto" gap="100">
                  <Text as="span">
                    If you don't have an account yet, you can sign up for free.
                  </Text>
                  <Button target="_blank" url="https://varify.io/en/registration/">
                    Varify.io Registration
                  </Button>
                </InlineGrid>
                <Text>
                  To use the Varify Shopify Tracking App, you need to have a Varify A/B Testing account set up, the
                  Varify script installed on your website, your tracking setup configured with Google Analytics 4, and
                  the test evaluation set to GA4 and Varify.
                </Text>
              </TextContainer>

              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img
                  alt="Step 2: Instructions to locate and copy the Varify JavaScript code snippet from Varify.io, which will open in a popup for further steps."
                  style={{
                    width: '100%',
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src="/tracking_setup.png"
                />
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>


        <Layout.Section>
          <Card sectioned>
            <BlockStack gap="400">
              <TextContainer>
                <Text variant="headingMd" as="h2">Activation of the Shopify Tracking in Varify</Text>

                <List type="number">
                  <List.Item>Login in to your varify.io account</List.Item>
                  <List.Item>
                    Go to <Text as="span" fontWeight="bold">Tracking Setup</Text>
                  </List.Item>
                  <List.Item>
                    Click on <Text as="span" fontWeight="bold">Advanced</Text>
                  </List.Item>
                  <List.Item>
                    Activate <Text as="span" fontWeight="bold">Use Shopify Data</Text>
                  </List.Item>
                </List>
              </TextContainer>

              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img
                  alt="Step 2: Instructions to locate and copy the Varify JavaScript code snippet from Varify.io, which will open in a popup for further steps."
                  style={{
                    width: '100%',
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src="/advanced_setup.png"
                />
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card sectioned>
            <BlockStack gap="400">
              <TextContainer>
                <Text variant="headingMd" as="h2">Evaluation of your Experiment results with the Shopify Tracking
                  data</Text>
                <List type="number">
                  <List.Item>Start a new Experiment</List.Item>
                  <List.Item>Go to <Text as="span" fontWeight="bold">Results</Text></List.Item>
                  <List.Item>Add Shopify Goal (Conversion or Revenue)</List.Item>
                  <List.Item>Data is updated once a day after the Goal is added</List.Item>
                </List>
              </TextContainer>

              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img
                  alt="Step 3: Instructions to copy the JavaScript code snippet from Varify.io and paste it into the Shopify theme's header file between <head> tags to connect Varify.io with the store."
                  style={{maxWidth: '100%', height: 'auto'}}
                  src="/experiment_result.png"
                />
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section secondary>
          <Card title="Need Help?" sectioned>
            <TextContainer>
              <Text as="p">Documentation about how to integrate Varify.io with shopify:&nbsp;
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
