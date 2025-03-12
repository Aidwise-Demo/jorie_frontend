// import { Button } from "@/components/ui/button";

// const LandingPage = ({ setCurrentView}) => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
//       <div className="text-center space-y-8 fade-in">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900">
//           Welcome to{" "}
//           <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
//             Joire AI Health Suite
//           </span>
//         </h1>
        
//         <div className="mt-16 fade-in" style={{ animationDelay: "0.2s" }}>
//           <Button
//            onClick={() => setCurrentView("referralmanagement")}
//             className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
//           >
//             Get Started
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Activity, ChartBar, Database, LineChart } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-100 to-white">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-hero-pattern bg-cover bg-center mix-blend-overlay opacity-20"
        style={{ 
          backgroundPosition: "center",
          backgroundSize: "cover", 
        }}
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200/80 to-white/80 mix-blend-multiply"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 animate-fade-in">
            <span className="text-xs font-medium text-blue-600">AI-Powered Healthcare Analytics</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">Joire AI Health Suite</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-slide-up delay-100">
            Transform healthcare with powerful analytics and actionable insights. Monitor, analyze, and optimize patient care with our cutting-edge AI platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-200">
            <Button 
              onClick={() => navigate("/home")}
              className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
