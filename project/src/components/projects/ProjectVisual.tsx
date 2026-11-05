import HospitalVisual from '@/components/projects/HospitalVisual';
import BankVisual from '@/components/projects/BankVisual';
import type { Project } from '@/data/portfolio';

interface ProjectVisualProps {
  variant: Project['visual'];
}

export default function ProjectVisual({ variant }: ProjectVisualProps) {
  if (variant === 'hospital') return <HospitalVisual />;
  return <BankVisual />;
}
