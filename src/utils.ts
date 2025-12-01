import { ExperienceLevel, VolumeRange, MuscleGroupVolume, MuscleGroup, VolumeGuidance, VolumeStatus } from './types';

export const MUSCLE_GROUPS: MuscleGroup[] = [
  'chest',
  'back',
  'shoulders',
  'biceps',
  'triceps',
  'quads',
  'hamstrings',
  'glutes',
  'calves',
];

export const EXPERIENCE_LEVELS: ExperienceLevel[] = ['beginner', 'intermediate', 'advanced'];

// Evidence-based volume ranges per muscle group (based on MAV - Maximum Adaptive Volume)
// Structure: { beginner: {min, max}, intermediate: {min, max}, advanced: {min, max} }
const MUSCLE_GROUP_VOLUMES: Record<MuscleGroup, Record<ExperienceLevel, VolumeRange>> = {
  chest: {
    beginner: { min: 8, max: 12 },
    intermediate: { min: 12, max: 16 },
    advanced: { min: 16, max: 20 },
  },
  back: {
    beginner: { min: 10, max: 14 },
    intermediate: { min: 14, max: 18 },
    advanced: { min: 18, max: 22 },
  },
  shoulders: {
    beginner: { min: 8, max: 12 },
    intermediate: { min: 14, max: 18 },
    advanced: { min: 18, max: 20 },
  },
  biceps: {
    beginner: { min: 6, max: 10 },
    intermediate: { min: 10, max: 14 },
    advanced: { min: 14, max: 16 },
  },
  triceps: {
    beginner: { min: 6, max: 10 },
    intermediate: { min: 10, max: 14 },
    advanced: { min: 14, max: 16 },
  },
  quads: {
    beginner: { min: 8, max: 12 },
    intermediate: { min: 12, max: 16 },
    advanced: { min: 16, max: 18 },
  },
  hamstrings: {
    beginner: { min: 6, max: 10 },
    intermediate: { min: 10, max: 14 },
    advanced: { min: 14, max: 16 },
  },
  glutes: {
    beginner: { min: 4, max: 8 },
    intermediate: { min: 6, max: 10 },
    advanced: { min: 10, max: 12 },
  },
  calves: {
    beginner: { min: 8, max: 12 },
    intermediate: { min: 12, max: 16 },
    advanced: { min: 16, max: 20 },
  },
};

export function getVolumeRange(muscleGroup: MuscleGroup, level: ExperienceLevel): VolumeRange {
  return MUSCLE_GROUP_VOLUMES[muscleGroup][level];
}

// Legacy function for backward compatibility (returns average range)
export function getGeneralVolumeRange(level: ExperienceLevel): VolumeRange {
  switch (level) {
    case 'beginner':
      return { min: 8, max: 12 };
    case 'intermediate':
      return { min: 10, max: 16 };
    case 'advanced':
      return { min: 14, max: 20 };
    default:
      return { min: 8, max: 12 };
  }
}

export function calculateVolumes(
  selectedMuscleGroups: MuscleGroup[],
  experienceLevel: ExperienceLevel,
  trainingDays: number
): MuscleGroupVolume[] {
  return selectedMuscleGroups.map((muscleGroup) => {
    const volumeRange = getVolumeRange(muscleGroup, experienceLevel);
    return {
      muscleGroup,
      weeklyMin: volumeRange.min,
      weeklyMax: volumeRange.max,
      perSessionMin: Math.round((volumeRange.min / trainingDays) * 10) / 10,
      perSessionMax: Math.round((volumeRange.max / trainingDays) * 10) / 10,
    };
  });
}

export function formatMuscleGroupName(muscleGroup: MuscleGroup): string {
  return muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1);
}

export function getVolumeStatus(
  userVolume: number,
  recommendedMin: number,
  recommendedMax: number
): VolumeStatus {
  if (userVolume >= recommendedMin && userVolume <= recommendedMax) {
    return 'optimal';
  } else if (userVolume < recommendedMin) {
    const deficit = recommendedMin - userVolume;
    const range = recommendedMax - recommendedMin;
    // If deficit is more than 50% of the range, it's very low
    if (deficit > range * 0.5) {
      return 'very-low';
    }
    return 'low';
  } else {
    const excess = userVolume - recommendedMax;
    const range = recommendedMax - recommendedMin;
    // If excess is more than 50% of the range, it's very high
    if (excess > range * 0.5) {
      return 'very-high';
    }
    return 'high';
  }
}

export function getStatusColor(status: VolumeStatus): string {
  switch (status) {
    case 'optimal':
      return 'bg-green-100 border-green-500 text-green-800';
    case 'low':
      return 'bg-yellow-100 border-yellow-500 text-yellow-800';
    case 'very-low':
      return 'bg-red-100 border-red-500 text-red-800';
    case 'high':
      return 'bg-yellow-100 border-yellow-500 text-yellow-800';
    case 'very-high':
      return 'bg-red-100 border-red-500 text-red-800';
    default:
      return 'bg-gray-100 border-gray-500 text-gray-800';
  }
}

export function getStatusMessage(
  status: VolumeStatus,
  userVolume: number,
  recommendedMin: number,
  recommendedMax: number
): string {
  switch (status) {
    case 'optimal':
      return `Perfect! Your volume is within the optimal range.`;
    case 'low':
      return `Slightly below optimal. Consider adding ${recommendedMin - userVolume} more set(s) per week.`;
    case 'very-low':
      return `Volume is too low for optimal growth. Aim for ${recommendedMin}-${recommendedMax} sets/week.`;
    case 'high':
      return `Slightly above optimal. Consider reducing by ${userVolume - recommendedMax} set(s) per week.`;
    case 'very-high':
      return `Volume is excessive and may hinder recovery. Reduce to ${recommendedMin}-${recommendedMax} sets/week.`;
    default:
      return '';
  }
}

export function calculateVolumeGuidance(
  muscleGroup: MuscleGroup,
  userVolume: number,
  experienceLevel: ExperienceLevel
): VolumeGuidance {
  const range = getVolumeRange(muscleGroup, experienceLevel);
  const status = getVolumeStatus(userVolume, range.min, range.max);
  const message = getStatusMessage(status, userVolume, range.min, range.max);

  return {
    muscleGroup,
    recommendedMin: range.min,
    recommendedMax: range.max,
    userVolume,
    status,
    message,
  };
}

