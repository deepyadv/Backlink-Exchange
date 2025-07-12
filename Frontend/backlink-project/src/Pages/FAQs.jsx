import React,{useState} from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react';

function FAQs() {

    const faqs = [
        {
          question: "How do I list my website for guest posting?",
          answer: "Go to your Seller Dashboard and click 'Add Website'. Fill in the details like domain authority, traffic, and pricing.",
        },
        {
          question: "How can I switch between buyer and seller roles?",
          answer: "Click the 'Switch Role' button on your dashboard to switch between buyer and seller accounts instantly.",
        },
        {
          question: "How does the chat system work?",
          answer: "Once an order is placed, both buyer and seller can use the chat feature to communicate in real-time inside their dashboards.",
        },
        {
          question: "What payment methods are supported?",
          answer: "We currently support Razorpay for secure and fast transactions.",
        },
      ];

    const [openIndex, setOpenIndex] = useState([]);

    const toggleFAQ  = (index) =>{

          setOpenIndex(openIndex === "index" ? null : index)

    }


    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-lime-400">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b border-gray-700">
              <button
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-lime-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <p className="text-gray-300 pb-4 transition-all duration-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      );

  
}

export default FAQs