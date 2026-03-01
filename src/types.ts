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

export interface CriterionInfo {
  id: number;
  name: string;
  description: string;
  maxScore: number;
  scoringRules: string;
}

export const EVALUATION_CRITERIA: CriterionInfo[] = [
  { 
    id: 1, 
    name: "Outline Form", 
    description: "Kavitenin sınıf II anatomisine uyumu (oklüzal ve proksimal sınırlar)",
    maxScore: 12,
    scoringRules: "12: İdeal, 6: Hafif sapma (1 mm içinde), 0: Ciddi hata (>1.5 mm fazla kesim)"
  },
  { 
    id: 2, 
    name: "Retansiyon Formu", 
    description: "Kavite duvarlarında uygun undercut/direkt konverjans (6-12°)",
    maxScore: 12,
    scoringRules: "12: Mükemmel açı, 6: Kısmen uygun, 0: Retansiyon yok (düz duvar)"
  },
  { 
    id: 3, 
    name: "Yüzey Pürüzsüzlüğü", 
    description: "Duvar/dip yüzeylerinde çizik, pürüz veya düzensizlik olmaması.",
    maxScore: 12,
    scoringRules: "12: Tamamen pürüzsüz, 6: Hafif çizikler, 0: Belirgin düzensizlik"
  },
  { 
    id: 4, 
    name: "Derinlik Kontrolü", 
    description: "Oklüzal kısım derinliği (1.5-2 mm) ve pulpa koruması.",
    maxScore: 12,
    scoringRules: "12: 1.8 mm ±0.2, 6: 1.3 mm veya 2.3 mm, 0: Pulpa maruziyeti/aşırı sığ"
  },
  { 
    id: 5, 
    name: "Proksimal Kutu Genişliği", 
    description: "Bukkalingual genişlik (2-2.5 mm).",
    maxScore: 12,
    scoringRules: "12: İdeal genişlik, 6: 2 mm - 2.5 mm, 0: >2.5 mm"
  },
  { 
    id: 6, 
    name: "Gingival Taban Derinliği", 
    description: "Servikal sınırdan itibaren gingival taban derinliği (0.5-1 mm).",
    maxScore: 10,
    scoringRules: "10: 0.75 mm ±0.25, 5: 0.3 mm – 0.5 mm, 0: 0.3’ten az veya 1mm’den fazla"
  },
  { 
    id: 7, 
    name: "Aksiyal Duvar Hizası", 
    description: "Proksimal kutuda aksiyal duvarın dikey/düzgün olması.",
    maxScore: 10,
    scoringRules: "10: Mükemmel hiza, 5: Hafif eğim, 0: Eğim >20° veya kırık"
  },
  { 
    id: 8, 
    name: "Marginal Ridge Kalınlığı", 
    description: "Marginal ridge’in minimum 1.5 mm kalınlıkta korunması.",
    maxScore: 10,
    scoringRules: "10: ≥1.5 mm, 5: 1.0-1.4 mm, 0: <1.0 mm veya kırık"
  },
  { 
    id: 9, 
    name: "Kırlangıç Kuyruğu Kavitesi", 
    description: "Kuyruğun boynu ve genişliği arasındaki oranın 1/3 olması.",
    maxScore: 10,
    scoringRules: "10: 1/3 oranın sağlanması, 5: 1/2 oranın sağlanması, 0: 1/1 ya da >1 oranın sağlanması"
  },
  { 
    id: 10, 
    name: "Kritik Hatalar", 
    description: "Pulpa perforasyonu, Yanlış kavite preparasyonu, Basamak hazırlığı yapılmaması",
    maxScore: 0,
    scoringRules: "0: Yok, -30: Basamak hazırlığı yapılmaması, Geçersiz ödev: Pulpa perforasyonu/ Yanlış kavite preparasyonu (Not 0 olarak değerlendirilir.)"
  }
];
