import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);



export const createCustomer = async (email, name) => {
    try {
        // const { email, name } = req.body;
        const customer = await stripe.customers.create({
            email, name
        });

        return { status: 'success', customer };
    } catch (error) {
        return { message: error.message };
    }
};

export const addCard = async (customer_id, card_name, card_ExpYear, card_ExpMonth, card_Number, card_CVC) => {
    try {
        // const { customer_id, card_name, card_ExpYear, card_ExpMonth, card_Number, card_CVC } = req.body;
        // const token = await stripe.tokens.create({

        //     card: {
        //         // name: card_name,
        //         // exp_year: card_ExpYear,
        //         // exp_month: card_ExpMonth,
        //         // number: card_Number,
        //         // cvc: card_CVC
        //         name: 'huydeptrais',
        //         exp_year: 2024,
        //         exp_month: 8,
        //         number: '4242424242424242 ',
        //         cvc: '314'
        //     }
        // });

        const token = await stripe.tokens.create({
            card: {
                number: '4242424242424242',
                exp_month: '08',
                exp_year: '2024',
                cvc: '314',
            },
        });

        console.log(token, "---------------------------");


        const card = await stripe.customers.createSource(customer_id, { source: `${token.id}` });

        return { status: 'success', card };
    } catch (error) {
        return { message: error.message };
    }
};

export const createCharges = async (card_id, customer_id) => {
    try {
        // const { card_id, customer_id } = req.body;

        const createCharges = await stripe.paymentIntents.create({
            receipt_email: 'test@gmail.com',
            amount: 112300,
            currency: 'INR',
            // card: card_id,
            customer: customer_id
        });

        return { status: 'success', createCharges };
    } catch (error) {
        return { message: error.message };
    }
};
