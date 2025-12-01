import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { VolumeGuidance } from '../types';
import { formatMuscleGroupName } from '../utils';

interface VolumeChartProps {
  guidance: VolumeGuidance[];
}

export default function VolumeChart({ guidance }: VolumeChartProps) {
  if (guidance.length === 0) {
    return null;
  }

  // Prepare data for the chart - show user volume vs recommended range
  const chartData = guidance.map((item) => {
    const avgRecommended = (item.recommendedMin + item.recommendedMax) / 2;
    return {
      name: formatMuscleGroupName(item.muscleGroup),
      userVolume: item.userVolume,
      recommendedMin: item.recommendedMin,
      recommendedMax: item.recommendedMax,
      recommendedAvg: avgRecommended,
      status: item.status,
      fullName: item.muscleGroup,
    };
  });

  // Sort by user volume (descending) for better visualization
  chartData.sort((a, b) => b.userVolume - a.userVolume);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{data.name}</p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Your Volume:</span> {data.userVolume} sets/week
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Recommended:</span> {data.recommendedMin} - {data.recommendedMax} sets/week
          </p>
          <p className={`text-sm font-medium mt-2 ${
            data.status === 'optimal' ? 'text-green-600' :
            data.status === 'low' || data.status === 'high' ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            Status: {data.status === 'optimal' ? 'Optimal' :
                    data.status === 'low' ? 'Slightly Low' :
                    data.status === 'very-low' ? 'Too Low' :
                    data.status === 'high' ? 'Slightly High' :
                    'Too High'}
          </p>
        </div>
      );
    }
    return null;
  };

  // Color based on status
  const getBarColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return '#10b981'; // Green
      case 'low':
      case 'high':
        return '#eab308'; // Yellow
      case 'very-low':
      case 'very-high':
        return '#ef4444'; // Red
      default:
        return '#93c5fd';
    }
  };

  const maxVolume = Math.max(...chartData.map(d => Math.max(d.userVolume, d.recommendedMax)));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Your Weekly Volume Overview</h3>
      <p className="text-sm text-gray-600 mb-4">
        Visual comparison of your current weekly volumes. Bar colors indicate how your volume compares to evidence-based recommendations (hover for details).
      </p>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <YAxis
            label={{ value: 'Sets per Week', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
            domain={[0, maxVolume + 2]}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* User volume bars with color coding */}
          <Bar
            dataKey="userVolume"
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-700">Optimal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-gray-700">Slightly Off</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-700">Needs Adjustment</span>
        </div>
      </div>
    </div>
  );
}

