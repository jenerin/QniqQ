import React, { useState, useRef } from 'react';
import { 
  QrCode, 
  Download, 
  Share2, 
  Plus, 
  Copy, 
  Check,
  Search,
  Filter,
  Grid
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion, AnimatePresence } from 'motion/react';

const departments = [
  { id: 1, name: 'Registrar', code: 'REG', scans: 1242, status: 'Active' },
  { id: 2, name: 'Accounting', code: 'ACC', scans: 856, status: 'Active' },
  { id: 3, name: 'Student Affairs', code: 'OSA', scans: 432, status: 'Active' },
  { id: 4, name: 'Library', code: 'LIB', scans: 215, status: 'Active' },
  { id: 5, name: 'Guidance Center', code: 'GC', scans: 189, status: 'Active' },
];

export default function QRCodes() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const [qrData, setQrData] = useState('REG');
  const [copied, setCopied] = useState(false);

  const fullUrl = `${baseUrl}?join=${qrData}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = (data: string, filename: string) => {
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${filename}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const downloadAll = async () => {
    for (const dept of departments) {
      setQrData(dept.code);
      // Wait for the canvas to update
      await new Promise(resolve => setTimeout(resolve, 300));
      downloadQR(`${baseUrl}?join=${dept.code}`, `UniQ-${dept.name}-QR`);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QR Code Management</h1>
          <p className="text-white/40 text-sm mt-1">Generate and track department access codes</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={downloadAll}
            className="glass-input px-6 py-2 text-xs font-bold flex items-center gap-2 hover:bg-white/5 transition-colors"
          >
            <Grid size={14} />
            Download All
          </button>
          <button className="btn-accent px-6 py-2 text-xs font-bold flex items-center gap-2">
            <Plus size={14} />
            Generate New QR
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Generator */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card space-y-6">
            <h3 className="font-bold text-lg">Quick Generator</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Target URL / Dept Code</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value.toUpperCase())}
                    className="w-full glass-input pr-12"
                    placeholder="e.g. REG"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  >
                    {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                  </button>
                </div>
                <p className="text-[10px] text-white/30 mt-1">Full Link: <span className="text-accent/60">{fullUrl}</span></p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Department</label>
                  <select 
                    onChange={(e) => setQrData(e.target.value)}
                    value={qrData}
                    className="w-full glass-input appearance-none text-sm"
                  >
                    {departments.map(dept => (
                      <option key={dept.code} value={dept.code}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">QR Style</label>
                  <select className="w-full glass-input appearance-none text-sm">
                    <option>Modern Rounded</option>
                    <option>Classic Square</option>
                  </select>
                </div>
              </div>
              <button className="w-full btn-accent py-3 flex items-center justify-center gap-2">
                <QrCode size={18} />
                Generate Production Code
              </button>
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h3 className="font-bold text-lg">Department Access Codes</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Total Scans</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {departments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold">{dept.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">
                        {dept.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-accent">{dept.scans}</td>
                    <td className="px-6 py-4">
                      <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                        {dept.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => {
                          setQrData(dept.code);
                          setTimeout(() => downloadQR(`${baseUrl}?join=${dept.code}`, `UniQ-${dept.name}-QR`), 100);
                        }}
                        className="p-2 hover:bg-accent hover:text-slate-900 text-white/40 rounded-lg transition-all"
                        title="Download QR"
                      >
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="glass-card p-8 flex flex-col items-center gap-6">
            <div className="w-full aspect-square bg-white rounded-2xl p-8 shadow-2xl flex items-center justify-center relative group overflow-hidden">
              <QRCodeCanvas 
                id="qr-canvas"
                value={fullUrl} 
                size={256}
                fgColor="#1e1b4b"
                level="H"
                includeMargin={true}
              />
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                <button 
                  onClick={() => downloadQR(fullUrl, `UniQ-${qrData}-QR`)}
                  className="bg-white text-slate-900 px-6 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Download size={16} />
                  Download PNG
                </button>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg">Live Preview</h3>
              <p className="text-white/40 text-xs">Scan with your phone camera</p>
              <div className="mt-4 p-2 bg-white/5 rounded-lg border border-white/10">
                <code className="text-[10px] text-accent font-bold truncate block">{fullUrl}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
