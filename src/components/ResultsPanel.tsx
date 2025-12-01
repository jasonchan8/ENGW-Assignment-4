import { VolumeGuidance } from '../types';
import { formatMuscleGroupName, getStatusColor } from '../utils';
import InfoTooltip from './InfoTooltip';
import VolumeChart from './VolumeChart';

interface ResultsPanelProps {
  guidance: VolumeGuidance[];
  experienceLevel: string;
}

export default function ResultsPanel({ guidance, experienceLevel }: ResultsPanelProps) {
  if (guidance.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Volume Guidance</h2>
        <p className="text-gray-500 text-center py-8">
          Select muscle groups and enter your weekly sets to receive personalized guidance.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Volume Guidance
        <InfoTooltip content="Weekly volume refers to the total number of working sets performed for a muscle group across all training sessions in a week. Research shows that optimal volume ranges vary by muscle group due to differences in muscle fiber composition, function, and recovery capacity. These evidence-based recommendations are tailored to each muscle group and your experience level.">
          <span></span>
        </InfoTooltip>
      </h2>
      
      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          <strong>Your Level:</strong> {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)}
        </p>
        <p className="text-sm text-gray-600 mt-2 italic">
          Volume ranges vary by muscle group based on evidence-based research (MAV - Maximum Adaptive Volume)
        </p>
      </div>

      <VolumeChart guidance={guidance} />

      <div className="space-y-4">
        {guidance.map((item) => {
          const statusColor = getStatusColor(item.status);
          const statusIcon = 
            item.status === 'optimal' ? '✓' :
            item.status === 'low' || item.status === 'very-low' ? '↓' :
            '↑';

          return (
            <div
              key={item.muscleGroup}
              className={`p-5 rounded-lg border-2 ${statusColor} transition-all`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{statusIcon}</span>
                    <h3 className="text-lg font-bold">
                      {formatMuscleGroupName(item.muscleGroup)}
                    </h3>
                  </div>
                  <div className="ml-8 space-y-1">
                    <p className="text-sm font-medium">
                      Your Volume: <span className="font-bold">{item.userVolume} sets/week</span>
                    </p>
                    <p className="text-sm">
                      Recommended Range: <span className="font-semibold">{item.recommendedMin}-{item.recommendedMax} sets/week</span>
                    </p>
                    <p className="text-sm font-medium mt-2">{item.message}</p>
                  </div>
                </div>
                <div className="md:ml-4">
                  <div className="w-32 h-32 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center"
                    style={{
                      borderColor: 
                        item.status === 'optimal' ? '#10b981' :
                        item.status === 'low' || item.status === 'high' ? '#eab308' :
                        '#ef4444',
                      backgroundColor:
                        item.status === 'optimal' ? '#d1fae5' :
                        item.status === 'low' || item.status === 'high' ? '#fef9c3' :
                        '#fee2e2',
                    }}
                  >
                    <div className="text-center">
                      <div className="text-2xl md:text-xl font-bold">
                        {item.userVolume}
                      </div>
                      <div className="text-xs text-gray-600">sets</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Optimal Range</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-700">Slightly Off Target</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700">Needs Adjustment</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> These are general guidelines. Individual responses to training volume vary. 
          Listen to your body and adjust based on recovery and progress. If you're making progress and recovering well, 
          your current volume may be appropriate for you.
        </p>
      </div>
    </div>
  );
}

