import {register} from "@shopify/web-pixels-extension";

register(({analytics, browser, init, settings}) => {

  analytics.subscribe('varify', async (event) => {
    const {varify_experimentId, varify_variationId, teamId, storageType} = event.customData;
    const validVariationId = varify_variationId !== undefined ? varify_variationId : null;

    const existingDataRaw = await browser.sessionStorage.getItem('varify-data');
    const existingData = existingDataRaw ? JSON.parse(existingDataRaw) : {};

    if (!existingData.data) {
      existingData.data = [];

    }

    const experimentEntry = {[varify_experimentId]: validVariationId};

    existingData.data = existingData.data.filter(
      entry => !entry.hasOwnProperty(varify_experimentId)
    );

    existingData.data.push(experimentEntry);
    existingData.teamId = teamId;
    existingData.storageType = storageType;
    existingData.data = existingData.data.filter(
      entry => Object.keys(entry).length > 0
    );

    await browser.sessionStorage.setItem('varify-data', JSON.stringify(existingData));
  });

  analytics.subscribe('checkout_completed', async (event) => {

    const {data: {checkout: {order: {id: orderNumber} = {}, subtotalPrice: {amount: orderRevenue} = {}} = {}}} = event;
    const localVariationData = await browser.sessionStorage.getItem('varify-data');
    const parsedData = JSON.parse(localVariationData);
    const storedAccountId = parsedData.teamId;
    const storedData = parsedData.data;
    const storageType = parsedData.storageType;

    try {
      await fetch('https://3b8c-103-85-10-72.ngrok-free.app/store_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          orderNumber,
          orderRevenue,
          accountId: storedAccountId,
          data: storedData,
          storageType: storageType,
        }),
      });

      browser.sessionStorage.removeItem('varify-data');

    } catch (error) {
      console.error('Error sending data', error);
    }
  });
});
