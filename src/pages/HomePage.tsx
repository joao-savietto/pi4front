import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useApi from '../hooks/useApi';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Types
interface Measurement {
  timestamp: Date;
  temperature: number; // in °C
  humidity: number;   // in %
}

interface TimeRange {
  label: string;
  value: number;       // in hours
}

const HomePage = () => {
  const { api } = useApi();
  const [timeRange, setTimeRange] = useState<TimeRange>({ label: 'Last 24 Hours', value: 24 });
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Time range options
  const timeRanges: TimeRange[] = [
    { label: 'Last 1 Hour', value: 1 },
    { label: 'Last 6 Hours', value: 6 },
    { label: 'Last 24 Hours', value: 24 },
    { label: 'Last 7 Days', value: 168 }
  ];

  // Helper function to calculate start and end times
  const getTimeRangeParams = (rangeHours: number) => {
    const now = new Date();
    const endTime = now.toISOString(); 
    const startTime = new Date(now.getTime() - rangeHours * 60 * 60 * 1000).toISOString();
    
    return { startTime, endTime };
  };

  // Function to transform API response to Measurement format
  const transformApiResponse = (data: any[]): Measurement[] => {
    return data.map(item => ({
      timestamp: new Date(item.timestamp),
      temperature: item.temperature,
      humidity: item.humidity
    })).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  useEffect(() => {
    const fetchMeasurements = async () => {
      setLoading(true);
      
      try {
        // Get time range parameters for API call
        const { startTime, endTime } = getTimeRangeParams(timeRange.value);
        
        // Make API request with query parameters
        const response = await api.get('/measurements/', {
          params: {
            start_time: startTime,
            end_time: endTime
          }
        });
        
        // Transform the data to match our expected format
        const transformedData = transformApiResponse(response.data);
        setMeasurements(transformedData);
      } catch (error) {
        console.error('Error fetching measurements:', error);
        // In case of error, we could show an empty state or use fallback data
        setMeasurements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurements();
  }, [timeRange]);
  
  // Get latest measurement
  const latest = measurements.length ? measurements[0] : null;
  
  // Prepare chart data
  const chartData = {
    labels: measurements.map(m => 
      m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    ),
    
    datasets: [
      {
        label: 'Temperature (°C)',
        data: measurements.map(m => m.temperature),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Humidity (%)',
        data: measurements.map(m => m.humidity),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#cbd5e1',
        bodyColor: '#e2e8f0',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => {
            const dataset = context.datasetIndex;
            return `${chartData.datasets[dataset].label}: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(100, 116, 139, 0.2)'
        },
        ticks: {
          color: '#94a3b8'
        }
      },
      y: {
        grid: {
          color: 'rgba(100, 116, 139, 0.2)'
        },
        ticks: {
          color: '#94a3b8'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Time Range Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Time Range:</span>
            <div className="bg-slate-800 rounded-lg p-1 flex">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-md text-sm transition-all ${
                    timeRange.label === range.label
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Current Measurement Card */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-slate-300">Current Status</h2>
          
          {loading ? (
            <div className="bg-slate-800/50 rounded-xl p-6 flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : latest ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Temperature Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-slate-400 text-sm font-medium">Temperature</h3>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    latest.temperature > 32 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {latest.temperature > 32 ? 'High' : 'Normal'}
                  </div>
                </div>
                <p className="text-3xl font-bold mt-2">
                  {latest.temperature}°<span className="text-lg">C</span>
                </p>
                <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      latest.temperature > 32 ? 'bg-red-500' : 'bg-green-500'
                    }`} 
                    style={{ width: `${(latest.temperature - 20) * (100/15)}%` }}
                  ></div>
                </div>
              </div>

              {/* Humidity Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-slate-400 text-sm font-medium">Humidity</h3>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    latest.humidity > 65 
                      ? 'bg-yellow-500/20 text-yellow-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {latest.humidity > 65 ? 'High' : 'Normal'}
                  </div>
                </div>
                <p className="text-3xl font-bold mt-2">
                  {latest.humidity}<span className="text-lg">%</span>
                </p>
                <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      latest.humidity > 65 ? 'bg-yellow-500' : 'bg-green-500'
                    }`} 
                    style={{ width: `${(latest.humidity - 40) * (100/30)}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg">
                <h3 className="text-slate-400 text-sm font-medium">Last Update</h3>
                <p className="mt-2 text-slate-300">
                  {latest.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ) : null}
        </section>

        {/* Charts Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-slate-300">Historical Data</h2>
          
          {loading ? (
            <div className="bg-slate-800/50 rounded-xl p-6 flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
              <Line 
                data={chartData} 
                options={chartOptions} 
                className="h-[500px]"
              />
            </div>
          )}
        </section>

        {/* Status Indicators */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Fan Status', status: 'Online', color: 'green' },
            { title: 'Power Supply', status: 'Normal', color: 'green' },
            { title: 'Cooling System', status: 'Maintenance', color: 'yellow' }
          ].map((item, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border border-slate-700 shadow-lg"
            >
              <h3 className="text-slate-400 text-sm font-medium mb-2">{item.title}</h3>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 bg-${item.color}-500`}></div>
                <span className={`font-medium ${
                  item.color === 'green' ? 'text-green-400' : 
                  item.color === 'yellow' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </section>

      </main>
    </div>
  );
}

export default HomePage;
