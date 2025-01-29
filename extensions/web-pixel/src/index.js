import {register} from "@shopify/web-pixels-extension";

register(({analytics, browser, init, settings}) => {

  analytics.subscribe('varify', async (event) => {
    const {varify_experimentId, varify_variationId, teamId, storageType, timestamp} = event.customData;
    const validVariationId = varify_variationId !== undefined ? varify_variationId : null;

    const existingDataRaw = await browser.localStorage.getItem('varify-data');
    const existingData = existingDataRaw ? JSON.parse(existingDataRaw) : {};

    if (!existingData.data) {
      existingData.data = [];
    }

    const experimentEntry = {
      [varify_experimentId]: validVariationId,
      timestamp: timestamp || new Date().toISOString()
    };

    existingData.data = existingData.data.filter(
      entry => !entry.hasOwnProperty(varify_experimentId)
    );

    existingData.data.push(experimentEntry);
    existingData.teamId = teamId;
    existingData.storageType = storageType;

    existingData.data = existingData.data.filter(
      entry => Object.keys(entry).length > 0
    );

    await browser.localStorage.setItem('varify-data', JSON.stringify(existingData));
  });

  analytics.subscribe('checkout_started', async (event) => {
    const existingDataRaw = await browser.localStorage.getItem('varify-data');
    const existingData = existingDataRaw ? JSON.parse(existingDataRaw) : {};

    if (!existingData.data || existingData.data.length === 0) {
      return;
    }

    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - 28);

    existingData.data = existingData.data.filter(entry => {
      if (!entry.timestamp) {
        return true;
      }

      const entryDate = new Date(entry.timestamp);
      return entryDate >= thresholdDate;
    });

    await browser.localStorage.setItem('varify-data', JSON.stringify(existingData));
  });

  analytics.subscribe('checkout_completed', async (event) => {

    const {data: {checkout: {order: {id: orderNumber} = {}, subtotalPrice: {amount: orderRevenue} = {}} = {}}} = event;
    const localVariationData = await browser.localStorage.getItem('varify-data');
    const parsedData = JSON.parse(localVariationData);
    const storedAccountId = parsedData.teamId;
    const storedData = parsedData.data;
    const storageType = parsedData.storageType;

    try {
      await fetch('https://ceb0-2401-4900-1f3f-b531-b548-cfb5-b38e-ce70.ngrok-free.app/store_data', {
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

    } catch (error) {
      console.error('Error sending data', error);
    }
  });
});
