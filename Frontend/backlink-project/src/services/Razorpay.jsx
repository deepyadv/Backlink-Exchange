import axios from 'axios';
import React from 'react';

export const startPayment = async ({ websiteId,  buyerLink, onSuccess }) => {
  try {

    console.log('Sending websiteId to backend:', websiteId);
    console.log('Sending Buyer website Link:', buyerLink);

    
    const { data  } = await axios.post(
      'https://linkoback.onrender.com/users/order-Create',
      {  websiteId,
        buyerLink,
        isPaid: false,  },
      { withCredentials: true }
    );

    const razorpayOrder = data.razorpayOrder;

    console.log("✅ Received Razorpay Order:", razorpayOrder);

    const style = document.createElement("style");
    style.innerHTML = `
      svg[width='auto'] { width: 24px !important; }
      svg[height='auto'] { height: 24px !important; }
    `;
    document.head.appendChild(style);

    // 2. Open Razorpay checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // store in .env file
      amount: razorpayOrder.amount,
      currency: 'INR',
      name: 'Guest Posting Platform',
      description: 'Buy Guest Post',
      order_id: razorpayOrder.id,
      handler: async (response) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

        console.log("✅ Payment response:", response);

        // 3. Verify signature & create order in DB
        const { data } = await axios.post(
          'https://linkoback.onrender.com/users/verify-payment',
          {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            websiteId,
            buyerLink,
            isPaid: true
          },
          { withCredentials: true }
        );

        if (data.success) {
          onSuccess();
        } else {
          alert('❌ Payment verification failed');
        }
      },
      prefill: {
        name: 'Buyer',
        email: 'buyer@example.com',
      },
      theme: {
        color: '#4CAF50',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('❌ Payment Error:', error);
    alert('Payment failed');
  }
};
