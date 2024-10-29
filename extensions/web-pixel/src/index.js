import {register} from "@shopify/web-pixels-extension";

register(({analytics, browser, init, settings}) => {

  analytics.subscribe('varifyLocalStorage', async (event) => {
    let variationData = {};
    const {len: totalKeys, account_id: accountId} = event.customData;

    for (let index = 0; index < totalKeys; index++) {
      const key = await browser.localStorage.key(index);

      if (key.startsWith('varify-experiment-')) {
        const value = await browser.localStorage.getItem(key);
        const {variationId} = JSON.parse(value);
        const experimentKey = key.replace('varify-experiment-', '');
        variationData[experimentKey] = variationId;
      }
    }

    await browser.localStorage.setItem('varify', accountId);

    if (Object.keys(variationData).length !== 0) {
      await browser.localStorage.setItem('varify-data', JSON.stringify(variationData));
    }
  });

  analytics.subscribe('varifySessionStorage', async (event) => {
    let variationData = {};
    const {len: totalKeys, account_id: accountId} = event.customData;

    for (let index = 0; index < totalKeys; index++) {
      const key = await browser.sessionStorage.key(index);

      if (key.startsWith('varify-experiment-')) {
        const value = await browser.sessionStorage.getItem(key);
        const {variationId} = JSON.parse(value);
        const experimentKey = key.replace('varify-experiment-', '');
        variationData[experimentKey] = variationId;
      }
    }

    await browser.localStorage.setItem('varify', accountId);

    if (Object.keys(variationData).length !== 0) {
      await browser.localStorage.setItem('varify-data', JSON.stringify(variationData));
    }
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
