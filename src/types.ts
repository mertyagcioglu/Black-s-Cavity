export interface CriterionResult {
  id: number;
  name: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface EvaluationResult {
  criteria: CriterionResult[];
  totalScore: number;
  criticalError?: string;
  isInvalid: boolean;
}

export const EVALUATION_CRITERIA = [
  { id: 1, name: "Outline Form", maxScore: 12 },
  { id: 2, name: "Retansiyon Formu", maxScore: 12 },
  { id: 3, name: "Yüzey Pürüzsüzlüğü", maxScore: 12 },
  { id: 4, name: "Derinlik Kontrolü", maxScore: 12 },
  { id: 5, name: "Proksimal Kutu Genişliği", maxScore: 12 },
  { id: 6, name: "Gingival Taban Derinliği", maxScore: 10 },
  { id: 7, name: "Aksiyal Duvar Hizası", maxScore: 10 },
  { id: 8, name: "Marginal Ridge Kalınlığı", maxScore: 10 },
  { id: 9, name: "Kırlangıç Kuyruğu Kavitesi", maxScore: 10 },
  { id: 10, name: "Kritik Hatalar", maxScore: 0 }
];
