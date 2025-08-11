export type ApplicationStatus = 'new' | 'in_review' | 'shortlist' | 'rejected' | 'hired'

export interface ApplicationField {
  name: string
  label: string
  type: string
  value: string | boolean
}

export interface ApplicationFile {
  fieldName: string
  url: string
  filename: string
  publicId?: string
  resourceType?: string
  format?: string
  storage?: 'gridfs' | 'cloudinary'
  fileId?: string
}

export interface Application {
  id: string
  jobId: string
  jobTitle: string
  status: ApplicationStatus
  fields: ApplicationField[]
  files?: ApplicationFile[]
  email?: string
  createdAt: string
  updatedAt: string
}

export async function submitApplication(payload: Omit<Application, 'id' | 'status' | 'createdAt' | 'updatedAt'> & { status?: ApplicationStatus }): Promise<{ success: boolean; id?: string }>
{
  try {
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error('Failed to submit application')
    return await response.json()
  } catch (err) {
    console.error('Error submitting application:', err)
    return { success: false }
  }
}

export async function getApplications(): Promise<Application[]> {
  try {
    const res = await fetch('/api/applications', { headers: { 'Cache-Control': 'no-cache' } })
    if (!res.ok) throw new Error('Failed to list applications')
    return await res.json()
  } catch (e) {
    console.error('Error fetching applications:', e)
    return []
  }
}

export async function getApplicationsByJob(jobId: string): Promise<Application[]> {
  try {
    const res = await fetch(`/api/applications?jobId=${encodeURIComponent(jobId)}`, { headers: { 'Cache-Control': 'no-cache' } })
    if (!res.ok) throw new Error('Failed to list applications')
    return await res.json()
  } catch (e) {
    console.error('Error fetching applications by job:', e)
    return []
  }
}

export async function getApplication(id: string): Promise<Application | null> {
  try {
    const res = await fetch(`/api/applications/${id}`)
    if (!res.ok) return null
    return await res.json()
  } catch (e) {
    console.error('Error fetching application:', e)
    return null
  }
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus): Promise<Application | null> {
  try {
    const res = await fetch(`/api/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (!res.ok) return null
    return await res.json()
  } catch (e) {
    console.error('Error updating application:', e)
    return null
  }
}

export async function deleteApplication(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/applications/${id}`, { method: 'DELETE' })
    if (!res.ok) return false
    return true
  } catch (e) {
    console.error('Error deleting application:', e)
    return false
  }
}


