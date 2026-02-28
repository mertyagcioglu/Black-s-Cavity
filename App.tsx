import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  FileText,
  Award,
  Activity,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { evaluateCavity } from './services/geminiService';
import { EvaluationResult } from './types';

export default function App() {
  const [occlusalImage, setOcclusalImage] = useState<string | null>(null);
  const [proximalImage, setProximalImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const occlusalInputRef = useRef<HTMLInputElement>(null);
  const proximalInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'occlusal' | 'proximal') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'occlusal') setOcclusalImage(reader.result as string);
        else setProximalImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!occlusalImage || !proximalImage) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const evaluation = await evaluateCavity(occlusalImage, proximalImage);
      setResult(evaluation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setOcclusalImage(null);
    setProximalImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1C1E] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Activity className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-emerald-900">DentEval AI</h1>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-emerald-600 transition-colors">Kriterler</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Hakkında</a>
            <button className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors">
              Yardım
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Upload & Preview */}
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                Görüntüleri Yükle
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {/* Occlusal Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Oklüzal Görüntü</label>
                  {!occlusalImage ? (
                    <div 
                      onClick={() => occlusalInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
                    >
                      <Upload className="w-6 h-6 text-gray-300 group-hover:text-emerald-600" />
                      <p className="text-xs font-medium text-gray-500">Oklüzal Fotoğraf</p>
                      <input 
                        type="file" 
                        ref={occlusalInputRef} 
                        onChange={(e) => handleImageUpload(e, 'occlusal')} 
                        accept="image/*" 
                        className="hidden" 
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center border border-gray-200">
                      <img 
                        src={occlusalImage} 
                        alt="Occlusal" 
                        className="max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                      <button 
                        onClick={() => setOcclusalImage(null)}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Proximal Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Proksimal Görüntü</label>
                  {!proximalImage ? (
                    <div 
                      onClick={() => proximalInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
                    >
                      <Upload className="w-6 h-6 text-gray-300 group-hover:text-emerald-600" />
                      <p className="text-xs font-medium text-gray-500">Proksimal Fotoğraf</p>
                      <input 
                        type="file" 
                        ref={proximalInputRef} 
                        onChange={(e) => handleImageUpload(e, 'proximal')} 
                        accept="image/*" 
                        className="hidden" 
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center border border-gray-200">
                      <img 
                        src={proximalImage} 
                        alt="Proximal" 
                        className="max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                      <button 
                        onClick={() => setProximalImage(null)}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {!result && (
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !occlusalImage || !proximalImage}
                  className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-4 rounded-xl shadow-lg shadow-emerald-200/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Analiz Ediliyor...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Otomatik Puanla
                    </>
                  )}
                </button>
              )}
            </section>

            <section className="bg-emerald-900 text-white rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-lg mb-2">Proje Hakkında</h3>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Bu uygulama, diş hekimliği eğitiminde preklinik süreçte öğrenci ödevlerinin değerlendirilmesinde 
                insan faktöründen kaynaklanan subjektifliğin azaltılması amacıyla geliştirilmiştir.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-emerald-900 bg-emerald-700 flex items-center justify-center text-[10px] font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-emerald-200">İstanbul Kent Üniversitesi & Arel Üniversitesi</span>
              </div>
            </section>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[500px]"
                >
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                    <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">Yapay Zeka Analiz Ediyor</h3>
                    <p className="text-gray-500 max-w-xs mx-auto">
                      Görüntü işleme modellerimiz kavite sınırlarını, derinliğini ve pürüzsüzlüğünü inceliyor...
                    </p>
                  </div>
                </motion.div>
              ) : result ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Score Summary Card */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-emerald-600 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="space-y-1 text-center sm:text-left">
                        <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider">Toplam Başarı Puanı</p>
                        <h3 className="text-5xl font-black">{result.totalScore}/100</h3>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 border border-white/20">
                        <div className="bg-white rounded-xl p-3">
                          <Award className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs text-emerald-100 font-medium">Değerlendirme</p>
                          <p className="text-lg font-bold">
                            {result.totalScore >= 85 ? 'Mükemmel' : 
                             result.totalScore >= 70 ? 'Başarılı' : 
                             result.totalScore >= 50 ? 'Geliştirilmeli' : 'Yetersiz'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {result.criticalError && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3 m-6 rounded-r-lg">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-red-800">Kritik Hata Tespit Edildi</p>
                          <p className="text-sm text-red-700">{result.criticalError}</p>
                        </div>
                      </div>
                    )}

                    <div className="p-6 space-y-4">
                      <h4 className="font-bold text-gray-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        Kriter Bazlı Detaylar
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {result.criteria.map((c) => (
                          <div key={c.id} className="group bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 rounded-xl p-4 transition-all">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">{c.name}</span>
                              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                                c.score === c.maxScore ? 'bg-emerald-100 text-emerald-700' : 
                                c.score === 0 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                              }`}>
                                {c.score} / {c.maxScore}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                              <div 
                                className={`h-1.5 rounded-full transition-all duration-1000 ${
                                  c.score === c.maxScore ? 'bg-emerald-500' : 
                                  c.score === 0 ? 'bg-red-500' : 'bg-amber-500'
                                }`}
                                style={{ width: `${(c.score / c.maxScore) * 100}%` }}
                              />
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed italic">
                              "{c.feedback}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={reset}
                    className="w-full py-4 border-2 border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Yeni Analiz Başlat
                  </button>
                </motion.div>
              ) : error ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center space-y-4"
                >
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-red-900">Analiz Başarısız</h3>
                  <p className="text-red-700">{error}</p>
                  <button 
                    onClick={handleAnalyze}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Tekrar Dene
                  </button>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[500px] text-gray-400">
                  <div className="bg-gray-50 p-8 rounded-full">
                    <Activity className="w-16 h-16 opacity-20" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 opacity-40">Sonuçlar Burada Görünecek</h3>
                    <p className="max-w-xs mx-auto">
                      Sol taraftan bir kavite fotoğrafı yükleyip "Otomatik Puanla" butonuna bastığınızda detaylı raporunuz hazırlanacaktır.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <Activity className="w-5 h-5" />
            <span className="font-bold">DentEval AI</span>
          </div>
          <div className="text-sm text-gray-400 text-center md:text-right">
            <p>© 2024-2025 Preklinik Öğrencilerinin Sınıf II Kavite Preparasyonlarının Yapay Zekâ ile Değerlendirilmesi</p>
            <p className="mt-1">İstanbul Kent Üniversitesi & İstanbul Arel Üniversitesi İş Birliğiyle</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
