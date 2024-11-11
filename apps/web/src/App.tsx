import { Card } from '@/components/ui/card';
import { 
  AlertTriangle, 
  Settings, 
  CarFront,
  Gauge,
  Waves,
  Timer,
  ShieldAlert 
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import car from './assets/car.svg';

const mockChartData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  impactSound: Math.random() * 100 + 400,   
  resonance: Math.random() * 50 + 200,       
  deviation: Math.random() * 30             
}));

const AutoSheetMonitor = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6 font-roboto">
      <div className="flex items-center justify-between mb-8">
        <div className='flex items-center space-x-2 justify-center'>
          <img src={car} alt="Car" className="h-12 w-12" />
          <h1 className="text-xl font-semibold">Auto Panel Quality Monitor</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Press Line Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-[#1C2639] border-gray-700 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 mb-1">Parts Processed Today</p>
              <h3 className="text-3xl font-bold">1,254</h3>
              <span className="text-green-400 text-sm">97% First Time Quality</span>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <CarFront className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1C2639] border-gray-700 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 mb-1">Quality Checks</p>
              <h3 className="text-3xl font-bold">45</h3>
              <span className="text-yellow-400 text-sm">Manual Inspection Required</span>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Waves className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1C2639] border-gray-700 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 mb-1">Defective Parts</p>
              <h3 className="text-3xl font-bold">7</h3>
              <span className="text-red-400 text-sm">Material/Form Issues</span>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <ShieldAlert className="h-6 w-6 text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-[#1C2639] border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-medium">Stamping Acoustic Analysis</h3>
                <p className="text-sm text-gray-400">Press line sound pattern monitoring</p>
              </div>
              <Select defaultValue="24h">
                <SelectTrigger className="w-[180px] bg-[#0B1120] border-gray-700 text-white focus:ring-gray-500">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent className="bg-[#1C2639] border-gray-700">
                  <SelectItem value="24h" className="text-white focus:bg-gray-700 focus:text-white">
                    Current Shift
                  </SelectItem>
                  <SelectItem value="7d" className="text-white focus:bg-gray-700 focus:text-white">
                    Last 24 Hours
                  </SelectItem>
                  <SelectItem value="30d" className="text-white focus:bg-gray-700 focus:text-white">
                    This Week
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="impactSound" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="resonance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="deviation" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    name="Impact Sound"
                    type="monotone" 
                    dataKey="impactSound" 
                    stroke="#3B82F6" 
                    fillOpacity={1}
                    fill="url(#impactSound)" 
                  />
                  <Area 
                    name="Resonance"
                    type="monotone" 
                    dataKey="resonance" 
                    stroke="#F59E0B" 
                    fillOpacity={1}
                    fill="url(#resonance)" 
                  />
                  <Area 
                    name="Pattern Deviation"
                    type="monotone" 
                    dataKey="deviation" 
                    stroke="#EF4444" 
                    fillOpacity={1}
                    fill="url(#deviation)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Quality Alerts */}
        <div>
          <Card className="bg-[#1C2639] border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Quality Alerts</h3>
              <button className="text-gray-400 hover:text-white">
                <Settings className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Front Door Panel</h4>
                    <span className="text-xs text-red-400">Material Issue</span>
                  </div>
                  <p className="text-sm text-gray-400">Abnormal stamping sound detected</p>
                  <span className="text-xs text-gray-500">2 minutes ago</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Waves className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Hood Panel</h4>
                    <span className="text-xs text-yellow-400">Check Required</span>
                  </div>
                  <p className="text-sm text-gray-400">Unusual resonance pattern</p>
                  <span className="text-xs text-gray-500">5 minutes ago</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Timer className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Fender Panel</h4>
                    <span className="text-xs text-green-400">Quality Pass</span>
                  </div>
                  <p className="text-sm text-gray-400">Normal stamping signature</p>
                  <span className="text-xs text-gray-500">10 minutes ago</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AutoSheetMonitor;