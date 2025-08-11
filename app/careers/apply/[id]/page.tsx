"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUpload, FiLock, FiCheck, FiUser, FiAlertTriangle, FiInfo, FiBriefcase, FiMapPin } from 'react-icons/fi';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { JobRole } from '../../../../lib/jobs';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
};

import { getJobById } from '../../../../lib/jobs';
import { submitApplication } from '../../../../lib/applications';

export default function CareerApplicationPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [job, setJob] = useState<JobRole | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState<Record<string, any>>({ agreeToTerms: false });
  
  const [resume, setResume] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string>('');
  const [isResumeUploading, setIsResumeUploading] = useState(false);
  const [resumePublicId, setResumePublicId] = useState<string>('');
  const [resumeResourceType, setResumeResourceType] = useState<string>('');
  const [resumeFormat, setResumeFormat] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  useEffect(() => {
    if (!jobId) return;
    (async () => {
      const jobData = await getJobById(jobId);
      setJob(jobData);
      setLoading(false);
    })();
  }, [jobId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName?: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setResume(file)
      if (fieldName) {
        setFormData(prev => ({ ...prev, [fieldName]: file.name }))
      }
      try {
        setIsResumeUploading(true)
        const fd = new FormData()
        fd.append('file', file)
        // Use GridFS-backed upload
        const resp = await fetch('/api/files/upload', { method: 'POST', body: fd })
        const data = await resp.json()
        if (data?.success && data?.url) {
          setResumeUrl(data.url)
          setResumePublicId(data.publicId || '')
          setResumeResourceType(data.resourceType || '')
          setResumeFormat(data.format || '')
        } else {
          setResumeUrl('')
        }
      } catch (err) {
        setResumeUrl('')
      } finally {
        setIsResumeUploading(false)
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      if (!job) throw new Error('No job')
      const fields = (job.formFields || []).map(f => ({
        name: f.name,
        label: f.label,
        type: f.type,
        value: formData[f.name] ?? (f.type === 'checkbox' ? false : ''),
      }))
      const files = resume && resumeUrl ? [{ fieldName: 'resume', url: resumeUrl, filename: resume.name, publicId: resumePublicId, resourceType: resumeResourceType, format: resumeFormat }] : undefined
      const result = await submitApplication({ jobId: job.id, jobTitle: job.title, fields, files })
      if (!result.success) throw new Error('Submit failed')
      setSubmitSuccess(true)
    } catch (err) {
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  };
  
  useEffect(() => {
    if (job && job.formFields) {
      const initial: Record<string, any> = { agreeToTerms: false }
      job.formFields.forEach(f => {
        initial[f.name] = f.type === 'checkbox' ? false : ''
      })
      setFormData(initial)
    }
  }, [job])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="h-8 w-1/2 bg-slate-100 rounded animate-pulse mb-3" />
            <div className="flex gap-4 text-slate-600 mb-6">
              <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-28 bg-slate-100 rounded animate-pulse" />
            </div>
            <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
            <div className="h-6 w-40 bg-slate-100 rounded animate-pulse mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-12 bg-slate-100 rounded animate-pulse" />
              <div className="h-12 bg-slate-100 rounded animate-pulse" />
              <div className="h-12 bg-slate-100 rounded animate-pulse" />
              <div className="h-12 bg-slate-100 rounded animate-pulse" />
              <div className="h-24 md:col-span-2 bg-slate-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-900 mb-3">Job Not Found</h1>
          <p className="text-slate-600 mb-8">
            The job posting you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            href="/careers" 
            className="inline-flex items-center bg-slate-900 hover:bg-slate-800 transition-all duration-300 text-white py-3 px-6 rounded-lg"
          >
            <FiArrowLeft className="mr-2" /> Return to Careers
          </Link>
        </div>
      </div>
    );
  }
  
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-white rounded-xl p-10 shadow-xl border border-slate-200 text-center"
          >
            <motion.div 
              variants={itemVariants} 
              className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-200"
            >
              <FiCheck className="text-green-600 text-4xl" />
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-3xl font-semibold text-slate-900 mb-4">
              Application Submitted!
            </motion.h1>
            <motion.p variants={itemVariants} className="text-slate-600 mb-6 leading-relaxed max-w-xl mx-auto">
              Thanks for applying to the <span className="text-slate-900 font-medium">{job.title}</span> role at the Perrin Institution.
              Your application has been received and assigned reference number <span className="text-teal-600 font-mono">APP-{Math.floor(Math.random() * 90000) + 10000}</span>.
              We’ll review your materials and be in touch soon.
            </motion.p>

            <motion.div variants={itemVariants} className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-left max-w-xl mx-auto mb-6">
              <h3 className="text-slate-900 font-medium mb-2">What happens next?</h3>
              <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                <li>Our team reviews applications on a rolling basis.</li>
                <li>If there’s a match, we’ll reach out to schedule next steps.</li>
                <li>You’ll receive an email confirmation at the address you provided.</li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/careers" className="inline-flex items-center px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all duration-300 text-center">
                <FiArrowLeft className="mr-2" /> Back to Careers
              </Link>
              <Link href="/" className="inline-flex items-center px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 rounded-lg transition-all duration-300 border border-slate-200 text-center">
                Return Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-32 pb-20 px-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        {/* Header section */}
        <motion.div variants={itemVariants} className="mb-12">
          <Link href="/careers" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6 group font-roboto transition-transform">
            <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span>Back to Career Listings</span>
          </Link>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-slate-900 font-roboto">Apply for {job.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-600 mt-2 mb-6 font-roboto">
            <div className="inline-flex items-center">
              <FiBriefcase className="mr-2 text-teal-600" />
              {job.type}
            </div>
            <div className="inline-flex items-center">
              <FiMapPin className="mr-2 text-teal-600" />
              {job.location}
            </div>
            <div className="inline-flex items-center">
              <FiUser className="mr-2 text-teal-600" />
              {job.department}
            </div>
          </div>
          <div className="h-1 w-24 bg-teal-600 mb-8 rounded-full will-change-transform"></div>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl font-roboto font-light">We're excited about your interest in joining the Perrin Institute team! Please complete this application form with your qualifications and experience.</p>
        </motion.div>
        
        {/* Tips panel removed for brevity */}
        
        {/* Main form */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
        >
          {submitError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <FiAlertTriangle className="text-red-600 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2 font-roboto">Submission Error</h3>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4 font-roboto font-light">
                    We encountered an error while processing your application. Please try again or contact our recruiting team directly.
                  </p>
                  <button 
                    onClick={() => setSubmitError(false)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 text-sm font-roboto"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {job?.formFields?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {job.formFields.map((field) => (
                    <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                      <label htmlFor={field.name} className="block text-sm font-medium text-slate-700 mb-2 font-roboto">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === 'textarea' && (
                        <textarea
                          id={field.name}
                          name={field.name}
                          rows={6}
                          required={field.required}
                          value={formData[field.name] ?? ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 transition-all duration-300 font-roboto"
                          placeholder={field.placeholder}
                        />
                      )}
                      {(field.type === 'text' || field.type === 'email' || field.type === 'url' || field.type === 'date' || field.type === 'phone') && (
                        <input
                          type={field.type === 'phone' ? 'tel' : field.type}
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          value={formData[field.name] ?? ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 transition-all duration-300 font-roboto"
                          placeholder={field.placeholder}
                        />
                      )}
                      {field.type === 'select' && (
                        <select
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          value={formData[field.name] ?? ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 transition-all duration-300 font-roboto"
                        >
                          <option value="">Please select</option>
                          {(field.options ?? []).map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      )}
                      {field.type === 'checkbox' && (
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            id={field.name}
                            name={field.name}
                            checked={!!formData[field.name]}
                            onChange={handleChange}
                            className="mr-2 w-4 h-4 text-teal-600 bg-white border-slate-300 rounded focus:ring-teal-500"
                          />
                          <span className="text-sm text-slate-700 font-roboto">{field.placeholder || 'Yes'}</span>
                        </label>
                      )}
                      {field.type === 'radio' && (
                        <div className="space-y-2">
                          {(field.options ?? []).map(opt => (
                            <label key={opt} className="flex items-center space-x-2">
                              <input type="radio" name={field.name} value={opt} checked={formData[field.name] === opt} onChange={handleChange} />
                              <span className="text-sm text-slate-700">{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      {field.type === 'file' && (
                        <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                          <input type="file" id={field.name} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required={field.required} onChange={(e) => handleResumeChange(e, field.name)} />
                          <p className="text-slate-600 text-sm mb-1">Drag and drop your resume/CV here or click to browse</p>
                          <p className="text-slate-500 text-xs mb-2">PDF, DOC, or DOCX up to 10MB</p>
                          <div className="inline-flex px-3 py-1 rounded bg-slate-100 text-slate-700 text-xs">
                            {isResumeUploading ? 'Uploading…' : (resume?.name || 'No file selected')}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
              
              {/* Equal Opportunity section */}
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-semibold mb-4 text-slate-900 font-roboto">Equal Opportunity Employer</h3>
                <p className="text-sm text-slate-700 mb-4 font-roboto font-light">
                  The Perrin Institute is an equal opportunity employer committed to diversity and inclusion in the workplace. 
                  All qualified applicants will receive consideration for employment without regard to race, color, religion, 
                  gender, gender identity or expression, sexual orientation, national origin, genetics, disability, age, or veteran status.
                </p>
              </div>
              
              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-teal-600 bg-white border-slate-300 rounded focus:ring-teal-500"
                  required
                />
                <label htmlFor="agreeToTerms" className="text-sm text-slate-700 font-roboto font-light">
                  I certify that all information provided in this application is true and complete to the best of my knowledge. 
                  I understand that any false information or omission may disqualify me from further consideration for employment 
                  and may result in dismissal if discovered at a later date. <span className="text-red-500">*</span>
                </label>
              </div>
              
              {/* Security notice */}
              <div className="flex items-center space-x-3 border-t border-slate-200 pt-6">
                <FiLock className="text-slate-400" />
                <p className="text-xs text-slate-500 font-roboto">
                  Your information is securely stored and only accessible to our HR team and hiring managers.
                </p>
              </div>
              
              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center font-roboto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiUser className="mr-2" /> Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
        
        {/* Contact alternative */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm font-roboto">
            Having trouble with the application? Contact our recruiting team at{' '}
            <a href="mailto:admin@perrininstitute.org" className="text-teal-600 hover:underline">
            admin@perrininstitute.org
            </a>
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
} 