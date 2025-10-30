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
  temperature: number; // em °C
  humidity: number;   // em %
}

interface TimeRange {
  label: string;
  value: number;       // em horas
}

const HomePage = () => {
  const { api } = useApi();
  const [timeRange, setTimeRange] = useState<TimeRange>({ label: 'Últimas 24 horas', value: 24 });
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);

  // Time range options
  const timeRanges: TimeRange[] = [
    { label: 'Última hora', value: 1 },
    { label: 'Últimas 6 horas', value: 6 },
    { label: 'Últimas 24 horas', value: 24 },
    { label: 'Últimos 7 dias', value: 168 }
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
        console.error('Erro ao buscar medições:', error);
        setMeasurements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurements();
  }, [timeRange]);

  // Get latest measurement
  const latest = measurements.length ? measurements[0] : null;

  // Function to refresh data
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const refreshData = () => {
    // Set refreshing state to provide visual feedback
    setIsRefreshing(true);
    
    // Force re-render by creating a new object with same values
    // This ensures useEffect is triggered even when the values are identical 
    setTimeRange({ ...timeRange });
    
    // Reset refreshing state after a short delay (to show the refresh effect)
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Prepare chart data
  const chartData = {
    labels: measurements.map(m =>
      m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    ),

    datasets: [
      {
        label: 'Temperatura (°C)',
        data: measurements.map(m => m.temperature),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Umidade (%)',
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
      <main className="container mx-auto px-4 py-8">
        {/* Current Measurement Card */}
        <section className="mb-8">
          <h2 className="text-[24px] font-semibold mb-4 text-slate-300">Status Atual</h2>

          {loading ? (
            <div className="bg-slate-800/50 rounded-xl p-6 flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : latest ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Temperature Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg flex flex-col justify-center h-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-slate-400 text-sm font-medium">Temperatura</h3>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    latest.temperature > 32
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-[#0ea5e9]/20 text-[#0ea5e9]'
                  }`}>
                    {latest.temperature > 32 ? 'Alta' : 'Normal'}
                  </div>
                </div>
                <p className="text-3xl font-bold mt-2">
                  {latest.temperature}°<span className="text-lg">C</span>
                </p>
                <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-[#0ea5e9] `}
                    style={{ width: `${(latest.temperature - 20) * (100/15)}%` }}
                  ></div>
                </div>
              </div>

              {/* Humidity Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg flex flex-col justify-center h-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-slate-400 text-sm font-medium">Umidade</h3>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    latest.humidity > 65
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-[#8b5cf6]/20 text-[#8b5cf6]'
                  }`}>
                    {latest.humidity > 65 ? 'Alta' : 'Normal'}
                  </div>
                </div>
                <p className="text-3xl font-bold mt-2">
                  {latest.humidity}<span className="text-lg">%</span>
                </p>
                <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${latest.humidity > 65 ? 'bg-yellow-500' : 'bg-[#8b5cf6]'} `}
                    style={{ width: `${(latest.humidity - 40) * (100/30)}%` }}
                  ></div>
                </div>
              </div>

              {/* Last Update Card - Updated with proper alignment */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg flex flex-col justify-center h-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-slate-400 text-sm font-medium">Última atualização</h3>
                  {/* Dummy badge with similar width to other badges */}
                  <div className="px-2 py-1 rounded-full text-xs bg-transparent w-[5ch]"></div>
                </div>
                <p className="text-2xl font-bold mt-2 text-slate-300">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p 
                  className="mt-2 text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
                  onClick={refreshData}
                >
                  {isRefreshing ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Atualizar dados
                    </>
                  )}
                </p>                
              </div>
            </div>
          ) : null}
        </section>

        {/* Charts Section with time selector */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[24px] font-semibold text-slate-300">Dados Históricos</h2>
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

      </main>
    </div>
  );
}

export default HomePage;
