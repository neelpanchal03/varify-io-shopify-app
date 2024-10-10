import { register } from "@shopify/web-pixels-extension";


register(({ analytics, browser, init, settings }) => {

    analytics.subscribe('varify_local_storage', async (event) => {

        const varifyData = {};
        const lent = await event.customData.len;
        const account_id = await event.customData.account_id

        for (let i = 0; i < lent; i++) {

            const key = await browser.localStorage.key(i);

            if (key.startsWith('varify-experiment-')) {

                const value = await browser.localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const strippedKey = key.replace('varify-experiment-', '');

                varifyData[strippedKey] = parsedValue.variationId;
            }

        }

        await browser.localStorage.setItem('varify',account_id)

        if (Object.keys(varifyData).length !== 0){

          await browser.localStorage.setItem('varify-data', JSON.stringify(varifyData));

        }
    });


    analytics.subscribe('varify_session_storage', async (event) => {

        let varifyData = {};
        const lent = await event.customData.len;
        const account_id = await event.customData.account_id

        for (let i = 0; i < lent; i++) {

            const key = await browser.sessionStorage.key(i);

            if (key.startsWith('varify-experiment-')) {

                const value = await browser.sessionStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const strippedKey = key.replace('varify-experiment-', '');
                varifyData[strippedKey] = parsedValue.variationId;
            }

        }

        await browser.localStorage.setItem('varify',account_id)

        if (Object.keys(varifyData).length !== 0){

          await browser.localStorage.setItem('varify-data', JSON.stringify(varifyData));

        }
    });

    analytics.subscribe('checkout_completed', async (event) => {

        const order = event;

        try {

            const orderId = order.data.checkout.order.id || null;
            const orderPrice = order.data.checkout.subtotalPrice.amount || null;
            const localData = await browser.localStorage.getItem('varify-data');
            const varifyId = await browser.localStorage.getItem('varify')


            await fetch('https://8493-2401-4900-1f3f-4c9f-6867-9ee8-88c7-f663.ngrok-free.app/store_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderNumber: orderId,
                    orderRevenue: orderPrice,
                    accountId: varifyId,
                    data: localData,
                }),
            });

            browser.localStorage.removeItem('varify-data');

        } catch (error) {
            console.error('Error sending data', error);
        }
    });
});
