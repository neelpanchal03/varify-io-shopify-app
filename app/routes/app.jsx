import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  const  {  admin}= await authenticate.admin(request);
  const random = Math.floor(Math.random() * 999999);
  const mutation = `
    mutation {
      webPixelCreate(webPixel: { settings: "{\\"accountID\\": \\"${random}\\"}" }) {
        userErrors {
          code
          field
          message
        }
        webPixel {
          settings
          id
        }
      }
    }
  `;

  const response = await admin.graphql(mutation);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });


};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">
          Varify io
        </Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
