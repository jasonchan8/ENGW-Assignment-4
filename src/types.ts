export type MuscleGroup = 
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface VolumeRange {
  min: number;
  max: number;
}

export interface MuscleGroupVolume {
  muscleGroup: MuscleGroup;
  weeklyMin: number;
  weeklyMax: number;
  perSessionMin: number;
  perSessionMax: number;
}

export type VolumeStatus = 'optimal' | 'low' | 'very-low' | 'high' | 'very-high';

export interface VolumeGuidance {
  muscleGroup: MuscleGroup;
  recommendedMin: number;
  recommendedMax: number;
  userVolume: number;
  status: VolumeStatus;
  message: string;
}

