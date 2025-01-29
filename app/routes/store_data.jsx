import prisma from '../db.server.js';

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function action({request}) {
  if (request.method === "POST") {
    try {
      const requestData = await request.json();
      const {orderNumber, orderRevenue, accountId, data, storageType} = requestData;

      const savedRecord = await prisma.VarifyExperimentData.create({
        data: {
          varify_account_id: String(accountId),
          order_id: orderNumber,
          storage_type: storageType,
          experiment_data: data,
          order_revenue: parseFloat(orderRevenue),
          created_at: new Date(),
        },
      });

      return new Response(
        JSON.stringify({message: "Data saved successfully", savedRecord}),
        {status: 200, headers: CORS_HEADERS}
      );
    } catch (error) {
      console.error("Error saving data:", error);
      return new Response(
        JSON.stringify({message: "Data failed to save"}),
        {status: 500, headers: CORS_HEADERS}
      );
    }
  }

  return new Response(
    JSON.stringify({message: "Method Not Allowed. Use POST."}),
    {status: 405, headers: CORS_HEADERS}
  );
}

export const loader = async ({request}) => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  return new Response(
    "This endpoint only accepts POST requests.",
    {status: 405, headers: CORS_HEADERS}
  );
};
