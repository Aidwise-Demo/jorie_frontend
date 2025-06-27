import { Plus, BarChart3, Users, Send, CheckCircle, Eye, Edit, Trash2, Play, Pause } from 'lucide-react';

const campaigns = [
  {
    id: 1,
    name: "Diabetes Care Reminder",
    status: "Active",
    type: "SMS",
    patients: 245,
    sent: 180,
    responses: 76,
    lastSent: "2024-06-20",
    responseRate: "42%"
  },
  {
    id: 2,
    name: "Annual Checkup Outreach",
    status: "Paused",
    type: "Email",
    patients: 892,
    sent: 456,
    responses: 123,
    lastSent: "2024-06-18",
    responseRate: "27%"
  },
  {
    id: 3,
    name: "Medication Adherence Follow-up",
    status: "Active",
    type: "Phone",
    patients: 156,
    sent: 134,
    responses: 89,
    lastSent: "2024-06-22",
    responseRate: "66%"
  },
  {
    id: 4,
    name: "Preventive Care Education",
    status: "Draft",
    type: "SMS",
    patients: 0,
    sent: 0,
    responses: 0,
    lastSent: "N/A",
    responseRate: "N/A"
  }
];

const stats = [
  {
    title: "Active Campaigns",
    value: "12",
    icon: BarChart3,
    color: "bg-blue-500",
    change: "+2 from last month"
  },
  {
    title: "Total Patients Reached",
    value: "2,847",
    icon: Users,
    color: "bg-green-500",
    change: "+15% from last month"
  },
  {
    title: "Messages Sent",
    value: "4,521",
    icon: Send,
    color: "bg-purple-500",
    change: "+8% from last month"
  },
  {
    title: "Response Rate",
    value: "32%",
    icon: CheckCircle,
    color: "bg-orange-500",
    change: "+5% from last month"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Paused':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Draft':
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

const OutboundCampaigns = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
<div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
  <div>
    <h1 className="text-2xl font-bold text-white mb-1">Outbound Campaigns</h1>
    <p className="text-slate-600">Manage and monitor your patient outreach campaigns</p>
  </div>
  <button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center px-4 py-2 rounded">
    <Plus className="w-4 h-4 mr-2" />
    Create Campaign
  </button>
</div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800 border border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-slate-400 text-sm mb-2">{stat.title}</p>
                <p className="text-green-400 text-xs">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaigns List */}
      <div className="p-6 pt-0 flex-1">
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">Campaign Overview</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Campaign Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Patients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Sent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Responses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Response Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-900/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{campaign.name}</div>
                      <div className="text-sm text-slate-400">Last sent: {campaign.lastSent}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {campaign.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {campaign.patients}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {campaign.sent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {campaign.responses}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {campaign.responseRate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      <div className="flex space-x-2">
                        <button className="text-slate-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-slate-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </button>
                        {campaign.status === 'Active' ? (
                          <button className="text-yellow-400 hover:text-yellow-300">
                            <Pause className="w-4 h-4" />
                          </button>
                        ) : campaign.status === 'Paused' ? (
                          <button className="text-green-400 hover:text-green-300">
                            <Play className="w-4 h-4" />
                          </button>
                        ) : null}
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutboundCampaigns;