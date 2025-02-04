import {ActionFunction, json} from '@remix-run/node';
import {authenticate} from '../shopify.server';

export const action: ActionFunction = async ({request}) => {
  try {
    const {topic} = await authenticate.webhook(request);

    switch (topic) {
      case 'CUSTOMERS_DATA_REQUEST':
        return json({ message: "Data request received" }, { status: 200 });

      case 'CUSTOMERS_REDACT':
        return json({ message: "Customer data erased" }, { status: 200 });

      case 'SHOP_REDACT':
        return json({ message: "Shop data erased" }, { status: 200 });

      default:
        console.warn(`Unhandled webhook topic: ${topic}`);
        return json({ message: "Unhandled webhook" }, { status: 200 });
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
  }

  return json({ message: "Webhook received" }, { status: 200 });
};
