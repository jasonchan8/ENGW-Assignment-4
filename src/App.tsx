import { useState, useEffect } from 'react';
import Header from './components/Header';
import FormPanel from './components/FormPanel';
import ResultsPanel from './components/ResultsPanel';
import HypertrophyPrinciples from './components/HypertrophyPrinciples';
import { MuscleGroup, ExperienceLevel, VolumeGuidance } from './types';
import { calculateVolumeGuidance, getVolumeRange } from './utils';

function App() {
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<MuscleGroup[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('beginner');
  const [userVolumes, setUserVolumes] = useState<Record<MuscleGroup, number>>({} as Record<MuscleGroup, number>);

  const handleMuscleGroupChange = (muscleGroup: MuscleGroup) => {
    setSelectedMuscleGroups((prev) => {
      const newSelection = prev.includes(muscleGroup)
        ? prev.filter((mg) => mg !== muscleGroup)
        : [...prev, muscleGroup];
      
      // Initialize volume for newly selected muscle groups
      if (!prev.includes(muscleGroup)) {
        const range = getVolumeRange(muscleGroup, experienceLevel);
        const initialVolume = Math.round((range.min + range.max) / 2);
        setUserVolumes((prevVolumes) => ({
          ...prevVolumes,
          [muscleGroup]: initialVolume,
        }));
      } else {
        // Remove volume when deselecting
        setUserVolumes((prevVolumes) => {
          const newVolumes = { ...prevVolumes };
          delete newVolumes[muscleGroup];
          return newVolumes;
        });
      }
      
      return newSelection;
    });
  };

  const handleVolumeChange = (muscleGroup: MuscleGroup, volume: number) => {
    setUserVolumes((prev) => ({
      ...prev,
      [muscleGroup]: volume,
    }));
  };

  // Update volumes when experience level changes
  useEffect(() => {
    selectedMuscleGroups.forEach((muscleGroup) => {
      if (!userVolumes[muscleGroup]) {
        const range = getVolumeRange(muscleGroup, experienceLevel);
        const initialVolume = Math.round((range.min + range.max) / 2);
        setUserVolumes((prev) => ({
          ...prev,
          [muscleGroup]: initialVolume,
        }));
      }
    });
  }, [experienceLevel, selectedMuscleGroups]);

  const guidance: VolumeGuidance[] = selectedMuscleGroups
    .filter((mg) => userVolumes[mg] !== undefined)
    .map((muscleGroup) =>
      calculateVolumeGuidance(muscleGroup, userVolumes[muscleGroup] || 0, experienceLevel)
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <FormPanel
              selectedMuscleGroups={selectedMuscleGroups}
              experienceLevel={experienceLevel}
              userVolumes={userVolumes}
              onMuscleGroupChange={handleMuscleGroupChange}
              onExperienceLevelChange={setExperienceLevel}
              onVolumeChange={handleVolumeChange}
            />
            <ResultsPanel
              guidance={guidance}
              experienceLevel={experienceLevel}
            />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <HypertrophyPrinciples />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

