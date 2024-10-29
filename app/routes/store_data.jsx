import prisma from '../db.server.js';

export async function action({request}) {

  if (request.method === 'POST') {

    try {

      const requestData = await request.json();
      const {orderNumber, orderRevenue, accountId, data} = requestData;

      const savedRecord = await prisma.VarifyExperimentData.create({
        data: {
          varify_account_id: accountId,
          order_id: orderNumber,
          experiment_data: data,
          order_revenue: orderRevenue,
          created_at: new Date(),
        },
      });

      return new Response(JSON.stringify({message: 'Data saved successfully', savedRecord}), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({message: 'Data failed to save'}), {
        status: 200,
      });
    }
  } else {
    // Handle unsupported requester methods
    return new Response(JSON.stringify({message: 'method should be POST'}), {
      status: 200,
    });
  }
}

export const loader = async () => {
  return new Response("This endpoint only accepts POST requesters.", {status: 405});
};
