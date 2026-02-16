import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe only if secret key is available (not during static export build)
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: NextRequest) {
    try {
        if (!stripe || !process.env.STRIPE_SECRET_KEY) {
            return NextResponse.json(
                { error: "Stripe secret key is not configured" },
                { status: 500 }
            );
        }

        const body = await request.json();
        const {
            amount,
            currency = "usd",
            payment_method,
            metadata,
        } = body;

        if (!amount || !payment_method) {
            return NextResponse.json(
                { error: "Missing required fields: amount and payment_method" },
                { status: 400 }
            );
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency,
            payment_method,
            confirm: true,
            description: metadata?.description || "Order payment",
            metadata: metadata || {},
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            },
        });

        return NextResponse.json({
            id: paymentIntent.id,
            status: paymentIntent.status,
            client_secret: paymentIntent.client_secret,
            amount: paymentIntent.amount,
        });
    } catch (error: any) {
        console.error("Payment intent creation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create payment intent" },
            { status: 500 }
        );
    }
}

