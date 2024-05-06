import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  interface FAQProps {
    question: string;
    answer: string;
    value: string;
  }
  
  const FAQList: FAQProps[] = [
    {
      question: "What is quantaIQ",
      answer: "quantaIQ is an innovative educational platform that leveredges AI to revolutionize the studying and teaching experience. It offers personalized testing by artificial teachers, AI-powered study techniques, and serves as an all in one classroom solution.",
      value: "item-1",
    },
    {
      question: "How does quantaIQ personalize testing for students?",
      answer:
        "quantaIQ enables teachers to create personalized tests tailored to individual student needs. These tests are designed to assess specific areas of knowledge and provide targeted feedback to both the instructor and the students to enhance learning outcomes.",
      value: "item-2",
    },
    {
      question:
        "How has quantaIQ helped students achieve academic success?",
      answer:
        "Whether it is passing challenging courses, reducing the need for external tutoring, or summarizing complex textbooks, quantaIQ has proven to be a valuable tool for achieving educational goals.",
      value: "item-3",
    },
    {
      question: "How can I sign up for quantaIQ?",
      answer: "Simply click on the Sign Up button on our website and follow the registration process. Unlock the potential for academic success with quantaIQ today!",
      value: "item-4",
    },
    // {
    //   question: "Legal",
    //   answer: 'The information provided on quantaIQ (the "Website") is for general informational purposes only. All information on the Website is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Website. Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the Website or reliance on any information provided on the Website. Your use of the Website and your reliance on any information on the Website is solely at your own risk. The Website may contain (or you may be sent through the Website) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the Website or any website or feature linked in any banner or other advertising. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services. By using the Website, you hereby consent to our disclaimer and agree to its terms.',
    //   value: "item-5",
    // },
    
  ];
  
  export const FAQ = () => {
    return (
      <section
        id="faq"
        className="container py-24 sm:py-32"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Questions
          </span>
        </h2>
  
        <Accordion
          type="single"
          collapsible
          className="w-full AccordionRoot"
        >
          {FAQList.map(({ question, answer, value }: FAQProps) => (
            <AccordionItem
              key={value}
              value={value}
            >
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>
  
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
  
        <h3 className="font-medium mt-4">
          Still have questions?{" "}
          <a
            rel="noreferrer noopener"
            href="#"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Contact us
          </a>
        </h3>
      </section>
    );
  };