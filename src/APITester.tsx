import React, { useState, useEffect } from 'react';
import fillPng from "./fill.png";

const eventEng = {
  title: "PrizeWave",
  heroTitle: "Create Unforgettable Prize Giveaways",
  heroSubtitle: "The easiest way to organize random prize distributions for your community. Fair, transparent, and exciting.",
  guideTitle: "How to set up your event",
  guideStep1: "Log In: Access your dashboard to unlock the event configuration form.",
  guideStep2: "Define the Basics: Give your event a catchy name, set the location (physical or virtual link), and the minimum number of participants (remember, the maximum is 1,000 people).",
  guideStep3: "Schedule the Moment: Select the exact start and end dates and times. The countdown timer will automatically sync to these.",
  guideStep4: "Upload the Prizes: You can add up to 15 prizes. Make sure to include the prize number, a great title, and a description of what’s included (e.g., #1 Grand Prize...). Note: There must always be at least one more participant than the number of prizes.",
  guideStep5: "Set the Rules: Write up to 15 clear rules so your participants know how your event works.",
  guideStep6: "Brand Your Event: Add your slogan and a description. For the logo and photo, simply paste the links (URLs) from your social media or cloud storage (Google Drive, Dropbox, etc.).",
  guideStep7: "Create the Access Code: Define your invitation code (a word, a short 3-word phrase, or an alphanumeric key up to 15 characters).",
  guideStep8: "Spread the Word!: Share the code with your guests. On event day, when the timer hits zero, the algorithm will a random distribute in 5 stages to reveal the winners.",
  login: "Log In",
  slogan: "Ready to make someone's day?",
  start: "Start configuring your event in minutes.",
};

const eventEsp = {
  title: "PrizeWave",
  heroTitle: "Crea Un Reparto de Premios Inolvidable",
  heroSubtitle: "La forma más fácil de organizar repartos aleatorios para tu comunidad. Justo, transparente y emocionante.",
  guideTitle: "Cómo configurar tu evento",
  guideStep1: "Inicia Sesión: Accede a tu panel de control para desbloquear el formulario de configuración.",
  guideStep2: "Define lo Básico: Dale un nombre atractivo a tu evento, define el lugar (físico o link virtual) y el número mínimo de participantes (recuerda que el máximo son 1,000 personas).",
  guideStep3: "Agenda el Momento: Selecciona las fechas y horas exactas de inicio y fin. El cronómetro se activará automáticamente basándose en esto.",
  guideStep4: "Carga los Premios: Puedes agregar hasta 15 premios. Asegúrate de incluir el número, un título llamativo y la descripción de lo que incluye (ej. #1 Grand Prize...). Nota: Siempre debe haber al menos un participante más que el número de premios.",
  guideStep5: "Establece las Reglas: Escribe hasta 15 reglas claras para que tus participantes sepan es la mecánica de tu evento.",
  guideStep6: "Personaliza tu Marca: Agrega tu slogan y una reseña. Para el logo y la foto, solo pega los enlaces (URLs) de tus redes sociales o de tu nube (Google Drive, Dropbox, etc.).",
  guideStep7: "Crea el Código de Acceso: Define tu código de invitación (una palabra, una frase corta de 3 palabras o una clave alfanumérica de hasta 15 caracteres).",
  guideStep8: "¡Difunde y Espera!: Comparte el código con tus invitados. El día del evento, cuando el contador llegue a cero, el algoritmo hará un reparto aleatorio en 5 etapas para revelar a los ganadores.",
  login: "Iniciar Sesión",
  slogan: "Estás listo para configurar tu evento?",
  start: "Ingresa y tu evento estará listo en minutos!",
};

// --- TYPES ---

type Language = 'en' | 'es';

interface Prize {
  id: number;
  title: string;
  description: string;
}

// --- MAIN COMPONENT ---

const Tester: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [view, setView] = useState<'landing' | 'form' | 'registration' | 'results'>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Load text based on selected language
  const eventText = lang === 'en' ? eventEng : eventEsp;


  // Handle Login Simulation
  const handleLogin = () => {
    setIsLoggedIn(true);
    setView('form');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-slate-400 font-sans text-slate-900">
      {/* Navbar */}
      <nav className="bg-slate-300 border-b border-red-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>        
          <span className="text-2xl font-bold tracking-tight text-blue-900">{eventText.title}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            title="Switch Language"
          >
            {lang === 'en' ? (
              <span className="flex items-center gap-2 font-medium">🇪🇸 ES</span>
            ) : (
              <span className="flex items-center gap-2 font-medium">🇬🇧 EN</span>
            )}
          </button>
          
          {!isLoggedIn ? (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
            >
               {eventText.login}
            </button>
          ) : (
            <div className="flex gap-3">
               <button onClick={handleLogout } className="text-sm font-medium text-slate-600 hover:text-blue-600">LogOut</button>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        {view === 'landing' && <LandingView text={eventText} onStart={handleLogin} />}
      </main>
      
      <footer className="py-10 text-center text-slate-600 text-sm border-t mt-12">
        © 2026 PrizeWave - Your Trusted Event Partner
      </footer>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const LandingView: React.FC<{ text: any, onStart: () => void }> = ({ text, onStart }) => (
  <div className="py-12">
    <div className="text-center mb-16">
      <h1 className="text-5xl font-extrabold text-slate-100 mb-6">{text.heroTitle}</h1>
      <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
        {text.heroSubtitle}
      </p>
    </div>

    <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">{text.guideTitle}</h2>
    <div className="grid md:grid-cols-4 gap-8 mb-12">
      {[text.guideStep1, text.guideStep2, text.guideStep3, text.guideStep4].map((step, i) => (
        <div key={i} className="bg-violet-100 p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center font-bold mb-4">
            {i + 1}
          </div>
          <p className="text-slate-800 leading-snug">{step}</p>
        </div>
      ))}
    </div>

    <div className="mb-12 bg-purple-200 text-white rounded-3xl p-10 flex flex-col md:flex-row items-center gap-6">
      <div className="w-[480px] h-[500px] bg-purple-200 rounded overflow-hidden">
        <img 
              src={fillPng}
              alt="Logo" 
              className="w-full h-full object-contain"
            />
      </div>
       <div className="w-[480px] h-[500px] bg-purple-200 rounded overflow-hidden text-center">
        <h3 className="mt-30 text-2xl text-blue-900 font-bold mb-20">{text.slogan}</h3>
        <p className="text-blue-900">{text.start}.</p>
      </div>
      <button onClick={onStart} className="bg-white text-blue-900 px-8 py-3 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors">
        LogIn
      </button>
    </div>

    <div className="grid md:grid-cols-4 gap-8 mb-12">
      {[text.guideStep5, text.guideStep6, text.guideStep7, text.guideStep8].map((step, i) => (
        <div key={i} className="bg-violet-100 p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center font-bold mb-4">
            {i + 5}
          </div>
          <p className="text-slate-800 leading-snug">{step}</p>
        </div>
      ))}
    </div>


  </div>
);

export default Tester;
/*import { useRef, type FormEvent } from "react";

export function APITester() {
  const responseInputRef = useRef<HTMLTextAreaElement>(null);

  const testEndpoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const endpoint = formData.get("endpoint") as string;
      const url = new URL(endpoint, location.href);
      const method = formData.get("method") as string;
      const res = await fetch(url, { method });

      const data = await res.json();
      responseInputRef.current!.value = JSON.stringify(data, null, 2);
    } catch (error) {
      responseInputRef.current!.value = String(error);
    }
  };

  return (
    <div className="mt-8 mx-auto w-full max-w-2xl text-left flex flex-col gap-4">
      <form
        onSubmit={testEndpoint}
        className="flex items-center gap-2 bg-[#1a1a1a] p-3 rounded-xl font-mono border-2 border-[#fbf0df] transition-colors duration-300 focus-within:border-[#f3d5a3] w-full"
      >
        <select
          name="method"
          className="bg-[#fbf0df] text-[#1a1a1a] py-1.5 px-3 rounded-lg font-bold text-sm min-w-[0px] appearance-none cursor-pointer hover:bg-[#f3d5a3] transition-colors duration-100"
        >
          <option value="GET" className="py-1">
            GET
          </option>
          <option value="PUT" className="py-1">
            PUT
          </option>
        </select>
        <input
          type="text"
          name="endpoint"
          defaultValue="/api/hello"
          className="w-full flex-1 bg-transparent border-0 text-[#fbf0df] font-mono text-base py-1.5 px-2 outline-none focus:text-white placeholder-[#fbf0df]/40"
          placeholder="/api/hello"
        />
        <button
          type="submit"
          className="bg-[#fbf0df] text-[#1a1a1a] border-0 px-5 py-1.5 rounded-lg font-bold transition-all duration-100 hover:bg-[#f3d5a3] hover:-translate-y-px cursor-pointer whitespace-nowrap"
        >
          Send
        </button>
      </form>
      <textarea
        ref={responseInputRef}
        readOnly
        placeholder="Response will appear here..."
        className="w-full min-h-[140px] bg-[#1a1a1a] border-2 border-[#fbf0df] rounded-xl p-3 text-[#fbf0df] font-mono resize-y focus:border-[#f3d5a3] placeholder-[#fbf0df]/40"
      />
    </div>
  );
}*/
