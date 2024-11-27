import {register} from "@shopify/web-pixels-extension";

register(({analytics, browser, init, settings}) => {

  analytics.subscribe('varifyStorage', async (event) => {
    const {
      experimentId,
      variationId,
      teamId,
      storageType
    } = event.customData;

    const storageData = JSON.parse(browser[storageType].getItem('varify-data')) ?? {};

    storageData[experimentId] = variationId;

    await browser[storageType].setItem('varify', teamId);

    await browser.localStorage.setItem('varify-data', JSON.stringify(storageData));
  });

  analytics.subscribe('checkout_completed', async (event) => {
    const {data: {checkout: {order: {id: orderNumber} = {}, subtotalPrice: {amount: orderRevenue} = {}} = {}}} = event;
    const localVariationData = await browser.localStorage.getItem('varify-data');
    const storedAccountId = await browser.localStorage.getItem('varify');

    try {
      await fetch('https://5c61-2402-a00-404-9f23-55ae-aa9b-c11f-bd08.ngrok-free.app/store_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber,
          orderRevenue,
          accountId: storedAccountId,
          data: localVariationData,
        }),
      });

      browser.localStorage.removeItem('varify-data');
    } catch (error) {
      console.error('Error sending data', error);
    }
  });
});
