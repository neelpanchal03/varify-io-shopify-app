import prisma from "../db.server.js";
import {cors} from "remix-utils/cors";
import {json} from "@remix-run/node"; // or cloudflare/deno

export async function action({request}) {
  if (request.method !== "POST") {
    return cors(request, json({message: "Method Not Allowed. Use POST."}, {status: 405}));
  }

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

    return cors(request, json({message: "Data saved successfully", savedRecord}));
  } catch (error) {
    return cors(request, json({message: "Data failed to save"}, {status: 500}));
  }
}

export async function loader({request}) {
  if (request.method === "OPTIONS") {
    return cors(request, new Response(null, {status: 204}));
  }

  return cors(request, json({message: "This endpoint only accepts POST requests."}, {status: 405}));
}
