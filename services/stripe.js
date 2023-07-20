import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);



export const createCustomer = async (req) => {
    try {
        const { email, name } = req.body;
        const customer = await stripe.customers.create({
            email, name
        });

        res.status(200).json({ status: 'success', customer });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const addCard = async (req) => {
    try {
        const { customer_id, card_name, card_ExpYear, card_ExpMonth, card_Number, card_CVC } = req.body;
        const card_token = await stripe.tokens.create({
            card: {
                name: card_name,
                exp_year: card_ExpYear,
                exp_month: card_ExpMonth,
                number: card_Number,
                cvc: card_CVC
            }
        });

        const card = await stripe.customers.createSource(customer_id, { source: `${card_token.id}` });


        res.status(200).json({ status: 'success', card });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createCharges = async (req) => {
    try {
        const { card_id, customer_id } = req.body;

        const createCharge = await stripe.charges.create({
            receipt_email: 'test@gmail.com',
            amount: 100,
            currency: 'INR',
            card: card_id,
            customer: customer_id
        });

        res.status(200).json({ status: 'success', createCharges });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
