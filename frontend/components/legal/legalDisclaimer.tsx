// LegalDisclaimerPage.tsx

import LegalDisclaimerHeader from "./legalDisclaimerHeader";
import LegalDisclaimerFooter from "./legalDisclaimerFooter";

const LegalDisclaimerPage = () => {
  return (
    <div className="legal-disclaimer-page">
      <LegalDisclaimerHeader />
      <div className="legal-disclaimer-content">
        {/* Insert your legal disclaimer content here */}
        <p>The information provided on quantaIQ (the "Website") is for general informational purposes only. 
            All information on the Website is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Website. 
            Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the Website or reliance on any information provided on the Website. 
            Your use of the Website and your reliance on any information on the Website is solely at your own risk. The Website may contain (or you may be sent through the Website) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. 
            Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the Website or any website or feature linked in any banner or other advertising. 
            We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services. By using the Website, you hereby consent to our disclaimer and agree to its terms.</p>
      </div>
      <LegalDisclaimerFooter />
    </div>
  );
}

export default LegalDisclaimerPage;
