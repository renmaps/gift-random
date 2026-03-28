import React, { useState } from 'react';
// 1. Use 'import type' to satisfy verbatimModuleSyntax: true
import type { SubmitEvent } from 'react';

const Tester = () => {
  const [route, setRoute] = useState<'login' | 'logged'>('login');

  if (route === 'logged') {
    return <LoggedView onLogOut={() => setRoute('login')} />;
  }

  return <LoginView onLogIn={() => setRoute('logged')} />;
}

function LoginView({ onLogIn }: { onLogIn: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showReset, setShowReset] = useState(false);

  // Use FormEvent<HTMLFormElement> to specify the source of the event
  const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3180/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, frpass: password }),
      });
      
      const data = await response.json();
      if (data.status === 'logged') {
        onLogIn();
      }
    } catch (error) {
      console.error("Connection error during login", error);
    }
  };

  const handleReset = async () => {
    if (!email) return alert("Please enter your email first.");
    
    await fetch('http://localhost:3180/api/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    alert("Reset instructions sent to your email.");
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center  p-4 font-sans text-[#A9A9A9]">
      <div className="bg-[#1e1e1e] p-8 rounded-xl w-full max-w-lg border border-[#333333] shadow-2xl">
        
        <form onSubmit={handleLogin} className="flex-col gap-5">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-[#2a2a2a] text-white rounded outline-none focus:ring-1 focus:ring-[#00BFFF] transition-shadow placeholder-[#A9A9A9] mb-6"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength={17}
            className="w-full p-3 bg-[#2a2a2a] text-white rounded outline-none focus:ring-1 focus:ring-[#00BFFF] transition-shadow placeholder-[#A9A9A9] mb-4"
          />
          
          <button
            type="submit"
            className="w-full mt-2 py-3 bg-[#00BFFF] text-[#121212] font-bold rounded hover:bg-sky-400 transition-colors"
          >
            logIn
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setShowReset(!showReset)}
            className="text-sm text-[#A9A9A9] hover:text-[#00BFFF] underline decoration-transparent hover:decoration-[#00BFFF] transition-all"
          >
            forgotten your password?
          </button>

          {showReset && (
            <div className="mt-4 w-full flex flex-col items-center">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 border border-[#00BFFF] text-[#00BFFF] rounded hover:bg-[#00BFFF] hover:text-[#121212] transition-colors"
              >
                Send only email, clear password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoggedView({ onLogOut }: { onLogOut: () => void }) {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-[#A9A9A9]">
      <h1 className="text-2xl mb-8 font-light tracking-wide text-white">
        Welcome to the <span className="text-[#00BFFF] font-medium">logged</span> route.
      </h1>
      <button
        onClick={onLogOut}
        className="px-8 py-2 border-2 border-[#A9A9A9] text-[#A9A9A9] rounded hover:border-[#00BFFF] hover:text-[#00BFFF] transition-colors"
      >
        logOut
      </button>
    </div>
  );
}
export default Tester;