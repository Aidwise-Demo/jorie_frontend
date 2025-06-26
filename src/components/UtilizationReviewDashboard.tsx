import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  Hospital, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Filter,
  Download,
  Search,
  Phone,
  Mail,
  MapPin,
  User,
  Heart,
  Stethoscope,
  Pill,
  Building,
  Timer
} from 'lucide-react';
import { useState } from 'react';

const utilizationData = [
  {
    id: 1,
    patientName: "E649176",
    patientId: "P-2024-0156",
    age: 67,
    condition: "Chronic Heart Failure",
    admissionDate: "2024-06-20",
    lengthOfStay: 8,
    expectedLOS: 5,
    status: "Under Review",
    riskLevel: "High",
    totalCost: 45600,
    approvedAmount: 38200,
    reviewerNotes: "Extended stay due to complications. Cardiologist consultation recommended.",
    department: "Cardiology",
    physician: "Dr. Michael Chen",
    reviewDate: "2024-06-22",
    nextReview: "2024-06-25",
    priority: "urgent"
  },
  {
    id: 2,
    patientName: "E774169",
    patientId: "P-2024-0187",
    age: 54,
    condition: "Hip Replacement Surgery",
    admissionDate: "2024-06-18",
    lengthOfStay: 4,
    expectedLOS: 3,
    status: "Approved",
    riskLevel: "Medium",
    totalCost: 32400,
    approvedAmount: 32400,
    reviewerNotes: "Standard recovery progression. Cleared for discharge planning.",
    department: "Orthopedics",
    physician: "Dr. Lisa Thompson",
    reviewDate: "2024-06-21",
    nextReview: "2024-06-24",
    priority: "standard"
  },
  {
    id: 3,
    patientName: "E1002865",
    patientId: "P-2024-0203",
    age: 29,
    condition: "Pneumonia Treatment",
    admissionDate: "2024-06-22",
    lengthOfStay: 2,
    expectedLOS: 3,
    status: "Monitoring",
    riskLevel: "Low",
    totalCost: 8900,
    approvedAmount: 8900,
    reviewerNotes: "Responding well to treatment. Early discharge possible.",
    department: "Internal Medicine",
    physician: "Dr. James Wilson",
    reviewDate: "2024-06-23",
    nextReview: "2024-06-26",
    priority: "routine"
  },
  {
    id: 4,
    patientName: "E1025044",
    patientId: "P-2024-0178",
    age: 72,
    condition: "Stroke Recovery",
    admissionDate: "2024-06-15",
    lengthOfStay: 12,
    expectedLOS: 7,
    status: "Denied",
    riskLevel: "High",
    totalCost: 67800,
    approvedAmount: 42000,
    reviewerNotes: "Extended rehabilitation not medically necessary. Transfer to skilled nursing facility recommended.",
    department: "Neurology",
    physician: "Dr. Amanda Rodriguez",
    reviewDate: "2024-06-20",
    nextReview: "2024-06-27",
    priority: "urgent"
  }
];

const metricsData = [
  {
    title: "Cases Under Review",
    value: "24",
    change: "+3",
    trend: "up",
    icon: FileText,
    color: "blue"
  },
  {
    title: "Avg Length of Stay",
    value: "4.2 days",
    change: "-0.8",
    trend: "down",
    icon: Clock,
    color: "green"
  },
  {
    title: "Cost Variance",
    value: "$127K",
    change: "+$23K",
    trend: "up",
    icon: DollarSign,
    color: "red"
  },
  {
    title: "Approval Rate",
    value: "87%",
    change: "+5%",
    trend: "up",
    icon: CheckCircle,
    color: "emerald"
  }
];

const departmentStats = [
  { dept: "Cardiology", cases: 8, avgLOS: 6.2, costVariance: 15.3, efficiency: 82 },
  { dept: "Orthopedics", cases: 12, avgLOS: 3.8, costVariance: -8.2, efficiency: 94 },
  { dept: "Neurology", cases: 6, avgLOS: 9.1, costVariance: 22.7, efficiency: 76 },
  { dept: "Internal Medicine", cases: 15, avgLOS: 3.2, costVariance: -5.1, efficiency: 91 },
  { dept: "Emergency", cases: 18, avgLOS: 2.4, costVariance: 3.8, efficiency: 88 }
];

const UtilizationReviewDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedView, setSelectedView] = useState('cases');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Under Review':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Denied':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Monitoring':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High':
        return 'text-red-400';
      case 'Medium':
        return 'text-amber-400';
      case 'Low':
        return 'text-emerald-400';
      default:
        return 'text-slate-400';
    }
  };

  const getPriorityDot = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'standard':
        return 'bg-amber-500';
      case 'routine':
        return 'bg-emerald-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Utilization Review & Management</h1>
              <p className="text-slate-400 text-lg">Monitor patient care efficiency and resource utilization</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="backdrop-blur-xl bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button className="backdrop-blur-xl bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                This Week
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData.map((metric, index) => (
            <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${metric.color}-500/20`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
                </div>
                {metric.trend === 'up' ? (
                  <TrendingUp className={`w-4 h-4 ${metric.color === 'red' ? 'text-red-400' : 'text-emerald-400'}`} />
                ) : (
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-1">{metric.value}</h3>
                <p className="text-slate-400 text-sm mb-2">{metric.title}</p>
                <p className={`text-xs ${metric.color === 'red' && metric.trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {metric.change} this week
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setSelectedView('cases')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedView === 'cases'
                ? 'bg-blue-600 text-white'
                : 'backdrop-blur-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Active Cases
          </button>
          <button
            onClick={() => setSelectedView('departments')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedView === 'departments'
                ? 'bg-blue-600 text-white'
                : 'backdrop-blur-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Department Analytics
          </button>
        </div>

        {selectedView === 'cases' && (
          <>
            {/* Filters */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search patient IDs, conditions, or physicians..."
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none">
                    <option value="all">All Status</option>
                    <option value="review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="denied">Denied</option>
                  </select>
                  <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none">
                    <option value="all">All Risk Levels</option>
                    <option value="high">High Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="low">Low Risk</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cases List */}
            <div className="space-y-6">
              {utilizationData.map((case_) => (
                <div key={case_.id} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Patient Info */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`w-3 h-3 rounded-full ${getPriorityDot(case_.priority)} mt-2`}></div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-1">Patient ID: {case_.patientName}</h3>
                          <p className="text-slate-400 text-sm mb-2">Case ID: {case_.patientId} • Age: {case_.age}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Heart className="w-4 h-4 text-red-400" />
                            <span className="text-slate-300 text-sm">{case_.condition}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              <span>{case_.department}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Stethoscope className="w-4 h-4" />
                              <span>{case_.physician}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stay & Status Info */}
                    <div className="lg:col-span-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-slate-400 text-xs mb-1">Length of Stay</p>
                          <p className="text-white font-semibold">{case_.lengthOfStay} days</p>
                          <p className="text-slate-500 text-xs">Expected: {case_.expectedLOS} days</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs mb-1">Risk Level</p>
                          <p className={`font-semibold ${getRiskColor(case_.riskLevel)}`}>{case_.riskLevel}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(case_.status)}`}>
                            {case_.status}
                          </span>
                        </div>
                        
                        <div className="text-sm text-slate-400">
                          <p>Admitted: {case_.admissionDate}</p>
                          <p>Next Review: {case_.nextReview}</p>
                        </div>
                      </div>
                    </div>

                    {/* Financial Info */}
                    <div className="lg:col-span-4">
                      <div className="space-y-4">
                        <div>
                          <p className="text-slate-400 text-xs mb-2">Cost Information</p>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-slate-300 text-sm">Total Cost:</span>
                              <span className="text-white font-semibold">${case_.totalCost.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300 text-sm">Approved:</span>
                              <span className={`font-semibold ${case_.approvedAmount === case_.totalCost ? 'text-emerald-400' : 'text-amber-400'}`}>
                                ${case_.approvedAmount.toLocaleString()}
                              </span>
                            </div>
                            {case_.approvedAmount !== case_.totalCost && (
                              <div className="flex justify-between">
                                <span className="text-slate-300 text-sm">Variance:</span>
                                <span className="text-red-400 font-semibold">
                                  ${(case_.totalCost - case_.approvedAmount).toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <p className="text-slate-400 text-xs mb-1">Reviewer Notes</p>
                          <p className="text-slate-300 text-sm">{case_.reviewerNotes}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedView === 'departments' && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Department Performance Analytics</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Department</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Active Cases</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Avg Length of Stay</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Cost Variance</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Efficiency Score</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentStats.map((dept, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Hospital className="w-5 h-5 text-blue-400" />
                          <span className="text-white font-medium">{dept.dept}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white">{dept.cases}</td>
                      <td className="py-4 px-4 text-white">{dept.avgLOS} days</td>
                      <td className="py-4 px-4">
                        <span className={dept.costVariance > 0 ? 'text-red-400' : 'text-emerald-400'}>
                          {dept.costVariance > 0 ? '+' : ''}{dept.costVariance}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-700/50 rounded-full h-2 w-20">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                              style={{ width: `${dept.efficiency}%` }}
                            />
                          </div>
                          <span className="text-white font-medium">{dept.efficiency}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtilizationReviewDashboard;