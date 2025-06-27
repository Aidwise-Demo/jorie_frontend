import { useState } from "react";
import { 
  BarChart3, 
  ChevronDown, 
  ClipboardList, 
  Users, 
  FileText, 
  BarChart, 
  LogOut,
  User,
  Building2,
  UserCircle,
  ArrowRight,
  Dot,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const SidebarItem = ({ 
  icon, 
  title, 
  isActive = false, 
  hasChildren = false, 
  isOpen = false, 
  onClick, 
  children 
}) => {
  return (
    <div className="mb-1">
      <button
        className={cn(
          "sidebar-link w-full flex justify-between",
          isActive && "active"
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        {hasChildren && (
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "transform rotate-180"
            )}
          />
        )}
      </button>
      {hasChildren && isOpen && (
        <div className="ml-9 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

// Updated SidebarSubItem with icon instead of line
const SidebarSubItem = ({ title, isActive = false, onClick }) => {
  return (
    <a
      href="#"
      className={cn(
        "block py-1.5 text-sm text-blue-100 hover:text-white relative pl-3",
        isActive && "text-emerald-400 font-medium"
      )}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
    >
      <div className="flex items-center gap-2">
        <ArrowRight className="h-3 w-3 text-gray-400" />
        <span>{title}</span>
      </div>
    </a>
  );
};

// Updated NestedSidebarItem with icon instead of line
const NestedSidebarItem = ({ 
  icon,
  title, 
  isActive = false,
  hasChildren = false,
  isOpen = false,
  onClick,
  children
}) => {
  return (
    <div className="mb-1">
      <button
        className={cn(
          "w-full flex justify-between items-center py-1.5 text-sm text-blue-100 hover:text-white",
          isActive && "text-emerald-400 font-medium"
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-2 relative pl-3">
          <ChevronRight className="h-3 w-3 text-gray-400" />
          {icon && <span className="text-blue-200">{icon}</span>}
          <span>{title}</span>
        </div>
        {hasChildren && (
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform",
              isOpen && "transform rotate-180"
            )}
          />
        )}
      </button>
      {hasChildren && isOpen && (
        <div className="ml-6 space-y-1 mt-1">
          {children}
        </div>
      )}
    </div>
  );
};

export function Sidebar({ onViewChange, currentView }) {
  const [openSections, setOpenSections] = useState({
    clinicalInteraction: true,
    insightSuite: true,
    practiceLevel: false,
    patientLevel: true,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
    <div
      className="h-screen w-64 border-r flex flex-col"
      style={{ backgroundColor: '#050B13' }}
    >
      <div className="p-4 text-sm text-white">Menu</div>
      
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <SidebarItem 
          icon={<Users size={18} />} 
          title="Clinical Interaction" 
          hasChildren 
          isOpen={openSections.clinicalInteraction}
          isActive={true}
          onClick={() => toggleSection("clinicalInteraction")}
        >
          <SidebarSubItem 
            title="Care Voyage: Patient Recommendation" 
            onClick={() => onViewChange("patientTimeline")}
            isActive={currentView === "patientTimeline"} 
          />
          <SidebarSubItem 
            title="Referral Management" 
            onClick={() => onViewChange("referralmanagement")}
            isActive={currentView === "referralmanagement"} 
          />
          <SidebarSubItem 
            title="Outbound Campaigns" 
            onClick={() => onViewChange("outboundCampaigns")}
            isActive={currentView === "outboundCampaigns"} 
          />
          <SidebarSubItem 
            title="Patient Experience Survey" 
            onClick={() => onViewChange("patientExperienceSurvey")}
            isActive={currentView === "patientExperienceSurvey"} 
          />
          <SidebarSubItem 
            title="Utilization Review and Management" 
            onClick={() => onViewChange("utilizationReview")}
            isActive={currentView === "utilizationReview"} 
          />
        </SidebarItem>
        
        <SidebarItem 
          icon={<BarChart3 size={18} />} 
          title="Insight Suite"
          hasChildren
          isOpen={openSections.insightSuite}
          isActive={true}
          onClick={() => toggleSection("insightSuite")}
        >
          <NestedSidebarItem 
            icon={<Building2 size={16} />}
            title="Practice Level"
            hasChildren
            isOpen={openSections.practiceLevel}
            onClick={() => toggleSection("practiceLevel")}
          >
            <SidebarSubItem 
              title="Persona Comparison" 
              onClick={() => onViewChange("personaComparison")}
              isActive={currentView === "personaComparison"}
            />  
            <SidebarSubItem 
              title="Persona Study to Generate Protocols"
              onClick={() => onViewChange("personaStudy")}
              isActive={currentView === "personaStudy"}
            />
            <SidebarSubItem 
              title="Guideline Adherence Evaluator" 
              onClick={() => onViewChange("guidelineAdherence")}
              isActive={currentView === "guidelineAdherence"}
            />
            <SidebarSubItem 
              title="Care Variations" 
              onClick={() => onViewChange("careVariations")}
              isActive={currentView === "careVariations"} 
            />
            <SidebarSubItem 
              title="Overview Reporting" 
              onClick={() => onViewChange("overviewReporting")}
              isActive={currentView === "overviewReporting"} 
            />
            <SidebarSubItem 
              title="Predicted Utilization Odds" 
              onClick={() => onViewChange("predictedUtilization")}
              isActive={currentView === "predictedUtilization"} 
            />
          </NestedSidebarItem>
          
          <NestedSidebarItem 
            icon={<UserCircle size={16} />}
            title="Patient Level"
            hasChildren
            isOpen={openSections.patientLevel}
            onClick={() => toggleSection("patientLevel")}
          >
            <SidebarSubItem 
              title="Patient Risk Profiler" 
              onClick={() => onViewChange("patientRiskProfiler")}
              isActive={currentView === "patientRiskProfiler"}
            />
            <SidebarSubItem 
              title="Adherence & Engagement Scorecard" 
              onClick={() => onViewChange("adherenceScorecard")}
              isActive={currentView === "adherenceScorecard"} 
            />
          </NestedSidebarItem>
        </SidebarItem>
      </div>
    </div>
    </>
  );
}