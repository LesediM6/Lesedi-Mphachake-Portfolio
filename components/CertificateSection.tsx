import React, { useState, useEffect } from 'react';
import Section from './Section';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';
import CertificateFormModal from './CertificateFormModal';
import { CERTIFICATES } from '../constants';
import { Certificate } from '../types';
import { Search, Filter, Award, Download, Settings, Plus, Check, CheckCircle2, Grid3X3 } from 'lucide-react';

interface NotificationState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

const CertificateSection: React.FC = () => {
  // Initialize state from LocalStorage if available, else use constant
  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    try {
      const saved = localStorage.getItem('lesedi-certificates');
      return saved ? JSON.parse(saved) : CERTIFICATES;
    } catch (e) {
      console.error("Failed to load certificates from storage", e);
      return CERTIFICATES;
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExpired, setShowExpired] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  
  // Management States
  const [isManageMode, setIsManageMode] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  
  // Notification State
  const [notification, setNotification] = useState<NotificationState>({ show: false, type: 'success', message: '' });

  // Persistence Effect
  useEffect(() => {
    try {
      localStorage.setItem('lesedi-certificates', JSON.stringify(certificates));
    } catch (e) {
      showNotification('error', 'Failed to save changes to local storage. Quota might be exceeded.');
    }
  }, [certificates]);

  // Notification Helper
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
  };

  // Derive categories dynamically
  const categories = ['All', ...new Set(certificates.map(c => c.category || 'Technical'))];

  // CRUD Handlers
  const handleDelete = (id: string) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
    showNotification('success', 'Certificate deleted successfully.');
  };

  const handleEdit = (cert: Certificate) => {
    setEditingCert(cert);
    setShowFormModal(true);
  };

  const handleSave = (savedCert: Certificate) => {
    if (editingCert) {
      // Update existing
      setCertificates(prev => prev.map(c => c.id === savedCert.id ? savedCert : c));
      showNotification('success', 'Certificate updated successfully.');
    } else {
      // Create new
      setCertificates(prev => [savedCert, ...prev]);
      showNotification('success', 'New certificate added successfully.');
    }
    setShowFormModal(false);
    setEditingCert(null);
  };

  const handleCloseForm = () => {
    setShowFormModal(false);
    setEditingCert(null);
  };

  // Filter Logic
  const filteredCertificates = certificates.filter(cert => {
    const matchesCategory = activeCategory === 'All' || cert.category === activeCategory;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Check expiration logic
    const isExpired = cert.expirationDate && new Date(cert.expirationDate) < new Date();
    const matchesExpired = showExpired ? true : !isExpired;

    return matchesCategory && matchesSearch && matchesExpired;
  });

  const handlePrintAll = () => {
    window.print();
  };

  return (
    <Section id="certificates" className="py-16 md:py-20 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
      
      {/* Toast Notification */}
      <div className={`fixed top-24 right-4 z-[90] transform transition-all duration-300 ${notification.show ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border ${
          notification.type === 'success' 
            ? 'bg-white dark:bg-slate-800 border-teal-500 text-teal-700 dark:text-teal-400' 
            : 'bg-white dark:bg-slate-800 border-red-500 text-red-700 dark:text-red-400'
        }`}>
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium text-sm">{notification.message}</span>
        </div>
      </div>

      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
            <Award className="h-8 w-8 text-teal-600" />
            Certifications & Accreditations
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            A verified collection of professional achievements in AI, Data Science, and Soft Skills from industry-leading institutions.
          </p>
        </div>

        <div className="flex items-center gap-3 no-print">
            {/* Manage Button */}
            <button
                onClick={() => setIsManageMode(!isManageMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isManageMode 
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
            >
                {isManageMode ? <Check className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
                {isManageMode ? 'Done Editing' : 'Manage Certs'}
            </button>

            <button 
            onClick={handlePrintAll}
            className="hidden md:flex items-center gap-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors text-sm font-medium"
            >
            <Download className="h-4 w-4" /> Export All
            </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center backdrop-blur-sm no-print">
        
        {/* Category Filters */}
        <div className="flex overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto gap-2 no-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search & Toggles */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search certs, issuers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-900 dark:text-white"
            />
          </div>
          
          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-4">
             <Filter className="h-4 w-4 text-slate-400" />
             <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 dark:text-slate-400 select-none">
               <input 
                 type="checkbox" 
                 checked={showExpired}
                 onChange={() => setShowExpired(!showExpired)}
                 className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
               />
               Show Expired
             </label>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
        
        {/* Add New Card (Only in Manage Mode) */}
        {isManageMode && (
             <button
                onClick={() => {
                    setEditingCert(null);
                    setShowFormModal(true);
                }}
                className="group relative h-full min-h-[300px] border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 rounded-xl flex flex-col items-center justify-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
             >
                <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/30 transition-colors">
                    <Plus className="h-8 w-8" />
                </div>
                <span className="font-medium">Add New Certificate</span>
             </button>
        )}

        {filteredCertificates.length > 0 ? (
          filteredCertificates.map(cert => (
            <CertificateCard 
              key={cert.id} 
              certificate={cert} 
              onClick={() => setSelectedCert(cert)}
              onDelete={isManageMode ? handleDelete : undefined} 
              onEdit={isManageMode ? handleEdit : undefined}
            />
          ))
        ) : !isManageMode && (
          <div className="col-span-full py-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 italic">No certifications match your filters.</p>
            <button 
              onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
              className="mt-2 text-teal-600 hover:text-teal-700 text-sm font-medium underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedCert && (
        <CertificateModal 
          certificate={selectedCert} 
          onClose={() => setSelectedCert(null)} 
        />
      )}

      {/* Create/Edit Form Modal */}
      {showFormModal && (
        <CertificateFormModal
            initialData={editingCert}
            onClose={handleCloseForm}
            onSave={handleSave}
        />
      )}
    </Section>
  );
};

export default CertificateSection;