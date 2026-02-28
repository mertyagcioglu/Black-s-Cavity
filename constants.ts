export interface Criterion {
  id: number;
  name: string;
  description: string;
  maxPoints: number;
  scoringOptions: { [key: number]: string };
}

export const RUBRIC: Criterion[] = [
  {
    id: 1,
    name: "Outline Form",
    description: "Kavitenin sınıf II anatomisine uyumu (oklüzal ve proksimal sınırlar)",
    maxPoints: 12,
    scoringOptions: {
      12: "İdeal",
      6: "Hafif sapma (1 mm içinde)",
      0: "Ciddi hata (>1.5 mm fazla kesim)"
    }
  },
  {
    id: 2,
    name: "Retansiyon Formu",
    description: "Kavite duvarlarında uygun undercut/direkt konverjans (6-12°)",
    maxPoints: 12,
    scoringOptions: {
      12: "Mükemmel açı",
      6: "Kısmen uygun",
      0: "Retansiyon yok (düz duvar)"
    }
  },
  {
    id: 3,
    name: "Yüzey Pürüzsüzlüğü",
    description: "Duvar/dip yüzeylerinde çizik, pürüz veya düzensizlik olmaması.",
    maxPoints: 12,
    scoringOptions: {
      12: "Tamamen pürüzsüz",
      6: "Hafif çizikler",
      0: "Belirgin düzensizlik"
    }
  },
  {
    id: 4,
    name: "Derinlik Kontrolü",
    description: "Oklüzal kısım derinliği (1.5-2 mm) ve pulpa koruması.",
    maxPoints: 12,
    scoringOptions: {
      12: "1.8 mm ±0.2",
      6: "1.3 mm veya 2.3 mm",
      0: "Pulpa maruziyeti/aşırı sığ"
    }
  },
  {
    id: 5,
    name: "Proksimal Kutu Genişliği",
    description: "Bukkalingual genişlik (2-2.5 mm).",
    maxPoints: 12,
    scoringOptions: {
      12: "İdeal genişlik",
      6: "2 mm - 2.5 mm",
      0: ">2.5 mm"
    }
  },
  {
    id: 6,
    name: "Gingival Taban Derinliği",
    description: "Servikal sınırdan itibaren gingival taban derinliği (0.5-1 mm).",
    maxPoints: 10,
    scoringOptions: {
      10: "0.75 mm ±0.25",
      5: "0.3 mm – 0.5 mm",
      0: "0.3’ten az veya 1mm’den fazla"
    }
  },
  {
    id: 7,
    name: "Aksiyal Duvar Hizası",
    description: "Proksimal kutuda aksiyal duvarın dikey/düzgün olması.",
    maxPoints: 10,
    scoringOptions: {
      10: "Mükemmel hiza",
      5: "Hafif eğim",
      0: "Eğim >20° veya kırık"
    }
  },
  {
    id: 8,
    name: "Marginal Ridge Kalınlığı",
    description: "Marginal ridge’in minimum 1.5 mm kalınlıkta korunması.",
    maxPoints: 10,
    scoringOptions: {
      10: "≥1.5 mm",
      5: "1.0-1.4 mm",
      0: "<1.0 mm veya kırık"
    }
  },
  {
    id: 9,
    name: "Kırlangıç Kuyruğu Kavitesi",
    description: "Kuyruğun boynu ve genişliği arasındaki oranın 1/3 olması.",
    maxPoints: 10,
    scoringOptions: {
      10: "1/3 oranın sağlanması",
      5: "1/2 oranın sağlanması",
      0: "1/1 ya da >1 oranın sağlanması"
    }
  },
  {
    id: 10,
    name: "Kritik Hatalar",
    description: "Pulpa perforasyonu, yanlış kavite preparasyonu, basamak hazırlığı yapılmaması.",
    maxPoints: 0,
    scoringOptions: {
      0: "Yok",
      "-30": "Basamak hazırlığı yapılmaması",
      "-100": "Geçersiz ödev: Pulpa perforasyonu/ Yanlış kavite preparasyonu"
    }
  }
];
