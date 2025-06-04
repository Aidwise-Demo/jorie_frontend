// import { useState, useEffect } from "react";
// import { Sidebar } from "@/components/Sidebar";
// // import { PatientRecommendation } from "@/components/PatientRecommendation";
// import { ReferralManagement } from "@/components/Referrals";
// import { Loader2, ClipboardList } from "lucide-react";
// import { useLocation } from "react-router-dom";
// import site from "../utils/API"; // Import the API service

// const Index = () => {
//   const location = useLocation();
//   const [selectedPatientId, setSelectedPatientId] = useState("45987");
//   const [currentView, setCurrentView] = useState("patientTimeline");  // Default view
//   const [powerBIUrl, setPowerBIUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Initialize the view based on the URL path when component mounts
//   useEffect(() => {
//     const path = location.pathname.substring(1); // Remove the leading slash
//     if (path && path !== "home") {
//       setCurrentView(path);
//     }
//   }, [location.pathname]);
  
//   // Fetch dashboard URL from API when view changes
//   useEffect(() => {
//     const fetchDashboardUrl = async () => {
//       // Skip API call for referralmanagement which doesn't need Power BI
//       if (currentView === "referralmanagement") {
//         return;
//       }
      
//       setLoading(true);
//       setError(null);
      
//       try {
//         // Get the token from localStorage
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           setError("Authentication token not found. Please log in again.");
//           return;
//         }
        
//         // Use the site instance from api.ts with auth header
//         const response = await site.get(
//           `/api/dashboards/${currentView}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           }
//         );
        
//         // Check if response has url field (per the sample response)
//         if (response.data && response.data.url) {
//           setPowerBIUrl(response.data.url);
//         } else {
//           setError("No dashboard URL found in response");
//           console.error("API response missing url field:", response.data);
//         }
//       } catch (err) {
//         console.error("Error fetching dashboard URL:", err);
//         setError("Failed to load dashboard. Please try again later.");
//       } finally { 
//         setLoading(false);
//       }
//     };

//     fetchDashboardUrl();
//   }, [currentView]);

//   // Handle view change
//   const handleViewChange = (view) => {
//     setCurrentView(view);
//     // Update URL to show the option name
//     window.history.pushState({}, "", `/${view}`);
//   };
  
//   // Function to render the appropriate content based on the current view
//   const renderContent = () => {
//     // Render Referral Management view
//     if (currentView === "referralmanagement") {
//       return <ReferralManagement />;
//     }
    
//     // For Power BI reports
//     if (loading) {
//       return (
//         <div className="flex items-center justify-center h-[calc(100vh-200px)]">
//           <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
//           <span className="ml-2 text-gray-600">Loading dashboard...</span>
//         </div>
//       );
//     }
    
//     if (error) {
//       return (
//         <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
//           <div className="text-center max-w-md mx-auto">
//             <div className="mb-4 text-emerald-600">
//               <ClipboardList className="h-12 w-12 mx-auto" />
//             </div>
//             <h3 className="text-xl font-medium text-gray-800 mb-2">In Development</h3>
//             <p className="text-gray-600 mb-6">
//               This feature is currently being developed and will be available soon. Our team is working to integrate this into the platform.
//             </p>
//             <button 
//               onClick={() => handleViewChange(currentView)}
//               className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
//             >
//               Check Again
//             </button>
//           </div>
//         </div>
//       );
//     }
    
//     if (powerBIUrl) {
//       return (
//         <div className="w-full h-full min-h-[calc(100vh-150px)]">
//           <iframe 
//             title={currentView}
//             width="100%" 
//             height="100%" 
//             style={{ border: "none", minHeight: "calc(100vh - 150px)" }}
//             src={powerBIUrl}
//             allowFullScreen={true}
//           ></iframe>  
//         </div>
//       );
//     }
    
//     return null;
//   };
  
//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-50">
//       <Sidebar onViewChange={handleViewChange} currentView={currentView} />
      
//       <main className="flex-1 overflow-auto">
//         <div className="p-8">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-semibold">
//               {currentView === "patientRiskProfiler" && "Patient Risk Profiler"}
//               {currentView === "patientTimeline" && "Care Voyage: Patient Recommendation"}
//               {currentView === "personaComparison" && "Persona Comparison"}
//               {currentView === "adherenceScorecard" && "Adherence & Engagement Scorecard"}
//               {currentView === "referralmanagement" && "Referral Management"}
//               {currentView === "outboundCampaigns" && "Outbound Campaigns"}
//               {currentView === "patientExperienceSurvey" && "Patient Experience Survey"}
//               {currentView === "utilizationReview" && "Utilization Review and Management"}
//               {currentView === "personaStudy" && "Persona Study to Generate Protocols"}
//               {currentView === "guidelineAdherence" && "Guideline Adherence Evaluator"}
//               {currentView === "careVariations" && "Care Variations"}
//               {currentView === "outcomeReporting" && "Outcome Reporting"}
//               {currentView === "predictedUtilization" && "Predicted Utilization Odds"}
//             </h1>
//           </div>
          
//           {renderContent()}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Index;

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
// import { PatientRecommendation } from "@/components/PatientRecommendation";
import { ReferralManagement } from "@/components/Referrals";
import { Loader2, ClipboardList } from "lucide-react";
import { useLocation } from "react-router-dom";
import site from "../utils/API"; // Import the API service

const Index = () => {
  const location = useLocation();
  const [selectedPatientId, setSelectedPatientId] = useState("45987");
  const [currentView, setCurrentView] = useState("patientTimeline");  // Default view
  const [powerBIEmbedInfo, setPowerBIEmbedInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Initialize the view based on the URL path when component mounts
  useEffect(() => {
    const path = location.pathname.substring(1); // Remove the leading slash
    if (path && path !== "home") {
      setCurrentView(path);
    }
  }, [location.pathname]);
  
  // Fetch dashboard embed info from API when view changes
  useEffect(() => {
    const fetchDashboardEmbedInfo = async () => {
      // Skip API call for referralmanagement which doesn't need Power BI
      if (currentView === "referralmanagement") {
        return;
      }
      
      setLoading(true);
      setError(null);
      setPowerBIEmbedInfo(null);
      
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          return;
        }
        
        // Use the site instance from api.ts with auth header
        const response = await site.get(
          `/api/dashboards/${currentView}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        // Check if response has the required fields for Power BI embedding
        if (response.data && response.data.embedToken && response.data.embedUrl && response.data.reportId) {
          setPowerBIEmbedInfo(response.data);
        } else {
          setError("Invalid dashboard embed info received");
          console.error("API response missing required fields:", response.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard embed info:", err);
        setError("Failed to load dashboard. Please try again later.");
      } finally { 
        setLoading(false);
      }
    };

    fetchDashboardEmbedInfo();
  }, [currentView]);

  // Embed Power BI report when embed info is available
  useEffect(() => {
    if (powerBIEmbedInfo && !loading && !error) {
      embedPowerBIReport();
    }
  }, [powerBIEmbedInfo]);

  // Function to embed Power BI report
  const embedPowerBIReport = () => {
    try {
      // Load Power BI client if not already loaded
      if (typeof window.powerbi === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/powerbi-client/2.23.7/powerbi.min.js';
        script.onload = () => {
          performEmbed();
        };
        document.head.appendChild(script);
      } else {
        performEmbed();
      }
    } catch (error) {
      console.error("Error embedding Power BI report:", error);
      setError("Failed to embed dashboard");
    }
  };

  // Perform the actual Power BI embedding
  const performEmbed = () => {
    try {
      const models = window['powerbi-client'].models;
      
      const embedConfig = {
        type: 'report',
        id: powerBIEmbedInfo.reportId,
        embedUrl: powerBIEmbedInfo.embedUrl,
        accessToken: powerBIEmbedInfo.embedToken,
        tokenType: models.TokenType.Embed,
        settings: {
          panes: {
            filters: { visible: false },
            pageNavigation: { visible: true }
          }
        }
      };

      const reportContainer = document.getElementById("powerbi-report-container");
      if (reportContainer) {
        // Clear any existing embedded report
        reportContainer.innerHTML = '';
        window.powerbi.embed(reportContainer, embedConfig);
      }
    } catch (error) {
      console.error("Power BI embed failed:", error);
      setError("Failed to initialize dashboard");
    }
  };

  // Handle view change
  const handleViewChange = (view) => {
    setCurrentView(view);
    // Update URL to show the option name
    window.history.pushState({}, "", `/${view}`);
  };
  
  // Function to render the appropriate content based on the current view
  const renderContent = () => {
    // Render Referral Management view
    if (currentView === "referralmanagement") {
      return <ReferralManagement />;
    }
    
    // For Power BI reports
    if (loading) {
      return (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <span className="ml-2 text-gray-600">Loading dashboard...</span>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-4 text-emerald-600">
              <ClipboardList className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">In Development</h3>
            <p className="text-gray-600 mb-6">
              This feature is currently being developed and will be available soon. Our team is working to integrate this into the platform.
            </p>
            <button 
              onClick={() => handleViewChange(currentView)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Check Again
            </button>
          </div>
        </div>
      );
    }
    
  if (powerBIEmbedInfo) {
      return (
        <div className="w-full h-full min-h-[calc(100vh-120px)]">
          <div 
            id="powerbi-report-container" 
            style={{ 
              width: "100%", 
              height: "calc(100vh - 120px)", 
              minHeight: "calc(100vh - 120px)",
              border: "none" 
            }}
          />
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar onViewChange={handleViewChange} currentView={currentView} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">
              {currentView === "patientRiskProfiler" && "Patient Risk Profiler"}
              {currentView === "patientTimeline" && "Care Voyage: Patient Recommendation"}
              {currentView === "personaComparison" && "Persona Comparison"}
              {currentView === "adherenceScorecard" && "Adherence & Engagement Scorecard"}
              {currentView === "referralmanagement" && "Referral Management"}
              {currentView === "outboundCampaigns" && "Outbound Campaigns"}
              {currentView === "patientExperienceSurvey" && "Patient Experience Survey"}
              {currentView === "utilizationReview" && "Utilization Review and Management"}
              {currentView === "personaStudy" && "Persona Study to Generate Protocols"}
              {currentView === "guidelineAdherence" && "Guideline Adherence Evaluator"}
              {currentView === "careVariations" && "Care Variations"}
              {currentView === "outcomeReporting" && "Outcome Reporting"}
              {currentView === "predictedUtilization" && "Predicted Utilization Odds"}
            </h1>
          </div>
          
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;