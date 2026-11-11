"use client";

import { CandidatureMultiStepForm } from "./CandidatureMultiStepForm";
import { Formation } from "@/types/database";

interface CandidatureFormProps {
  formations: Formation[];
  initialFormationSlug?: string;
}

export function CandidatureForm({
  formations,
  initialFormationSlug,
}: CandidatureFormProps) {
  return (
    <CandidatureMultiStepForm
      formations={formations}
      initialFormationSlug={initialFormationSlug}
    />
  );
}

export default CandidatureForm;
