import React from 'react';
import { FileText, Calendar, Award } from 'lucide-react';
import { Certificate } from '../types';

interface CertificateCardProps {
  certificate: Certificate;
  onViewPdf: (cert: Certificate) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onViewPdf }) => {
  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Top Border/Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 to-indigo-500"></div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Header: Icon + Issuer */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-100 dark:border-teal-800/30 group-hover:scale-110 transition-transform duration-300">
            <Award className="h-5 w-5" />
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md uppercase tracking-wide">
            {certificate.issuer}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {certificate.title}
        </h3>

        {/* Date & ID */}
        <div className="space-y-1 mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>Issued: {certificate.issueDate}</span>
          </div>
          {certificate.credentialId && (
            <div className="text-xs text-slate-400 dark:text-slate-500 pl-5.5 truncate">
              ID: {certificate.credentialId}
            </div>
          )}
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {certificate.skills.slice(0, 3).map((skill, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[10px] font-medium text-slate-600 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className="px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[10px] font-medium text-slate-500">
              +{certificate.skills.length - 3}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewPdf(certificate)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-teal-600 dark:hover:bg-teal-600 text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white font-medium text-sm transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 group/btn"
        >
          <FileText className="h-4 w-4" />
          <span>View Certificate</span>
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;