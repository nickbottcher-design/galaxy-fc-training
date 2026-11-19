import { mountTraining } from './training.js';
import { mountWinter } from './winter.js';
import { mountSchedule } from './schedule.js';
import { mountNavigation } from './navigation.js';

export function mountGalaxy() {
  mountTraining();
  mountWinter();
  const stopSchedule = mountSchedule();
  const stopNavigation = mountNavigation();

  return () => {
    stopSchedule();
    stopNavigation();
  };
}
