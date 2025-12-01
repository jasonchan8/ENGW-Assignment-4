import { MuscleGroup, ExperienceLevel } from '../types';
import { MUSCLE_GROUPS, EXPERIENCE_LEVELS, formatMuscleGroupName, getVolumeRange } from '../utils';
import InfoTooltip from './InfoTooltip';

interface FormPanelProps {
  selectedMuscleGroups: MuscleGroup[];
  experienceLevel: ExperienceLevel;
  userVolumes: Record<MuscleGroup, number>;
  onMuscleGroupChange: (muscleGroup: MuscleGroup) => void;
  onExperienceLevelChange: (level: ExperienceLevel) => void;
  onVolumeChange: (muscleGroup: MuscleGroup, volume: number) => void;
}

export default function FormPanel({
  selectedMuscleGroups,
  experienceLevel,
  userVolumes,
  onMuscleGroupChange,
  onExperienceLevelChange,
  onVolumeChange,
}: FormPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Training Configuration</h2>
      
      {/* Muscle Groups Section */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          Select Muscle Groups
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {MUSCLE_GROUPS.map((muscleGroup) => (
            <label
              key={muscleGroup}
              className="flex items-center space-x-2 p-3 rounded-lg border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedMuscleGroups.includes(muscleGroup)}
                onChange={() => onMuscleGroupChange(muscleGroup)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">{formatMuscleGroupName(muscleGroup)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level Section */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          Experience Level
          <InfoTooltip content="Training experience affects your ability to recover and adapt. Beginners need less volume to progress, while advanced lifters require higher volumes to continue making gains due to their greater training capacity and adaptation.">
            <span></span>
          </InfoTooltip>
        </label>
        <select
          value={experienceLevel}
          onChange={(e) => onExperienceLevelChange(e.target.value as ExperienceLevel)}
          className="w-full md:w-64 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
        >
          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Volume Input Section */}
      {selectedMuscleGroups.length > 0 && (
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Your Weekly Sets Per Muscle Group
            <InfoTooltip content="Enter the total number of working sets you perform for each muscle group per week. This includes all exercises targeting that muscle group across all your training sessions.">
              <span></span>
            </InfoTooltip>
          </label>
          <div className="space-y-4">
            {selectedMuscleGroups.map((muscleGroup) => {
              const range = getVolumeRange(muscleGroup, experienceLevel);
              const currentVolume = userVolumes[muscleGroup] || 0;
              return (
                <div key={muscleGroup} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {formatMuscleGroupName(muscleGroup)}
                      </label>
                      <p className="text-xs text-gray-500">
                        Recommended: {range.min}-{range.max} sets/week
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max={Math.max(range.max + 5, 30)}
                        value={currentVolume}
                        onChange={(e) => onVolumeChange(muscleGroup, parseInt(e.target.value, 10))}
                        className="flex-1 md:w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <input
                        type="number"
                        min="0"
                        max={Math.max(range.max + 5, 30)}
                        value={currentVolume}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          onVolumeChange(muscleGroup, val);
                        }}
                        className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700 text-center"
                      />
                      <span className="text-sm text-gray-500 w-8">sets</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

