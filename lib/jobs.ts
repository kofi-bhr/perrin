export type JobUrgency = 'low' | 'medium' | 'high'

export type JobFieldType =
  | 'text'
  | 'email'
  | 'textarea'
  | 'url'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'phone'

export interface JobFormField {
  id: string
  name: string
  label: string
  type: JobFieldType
  required: boolean
  placeholder?: string
  options?: string[]
}

export interface JobRole {
  id: string
  title: string
  type: string
  location: string
  department: string
  salaryRange?: string
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  urgency: JobUrgency
  formFields: JobFormField[]
  active: boolean
}

export async function getJobs(): Promise<JobRole[]> {
  try {
    const response = await fetch('/api/jobs', {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' },
    })
    if (!response.ok) throw new Error('Failed to fetch jobs')
    return await response.json()
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}

export async function getJobById(id: string): Promise<JobRole | null> {
  try {
    const response = await fetch(`/api/jobs/${id}`, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' },
    })
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Error fetching job by id:', error)
    return null
  }
}

export async function addJob(job: Omit<JobRole, 'id' | 'postedDate'> & { postedDate?: string }): Promise<JobRole | null> {
  try {
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    })
    if (!response.ok) throw new Error('Failed to create job')
    return await response.json()
  } catch (error) {
    console.error('Error creating job:', error)
    return null
  }
}

export async function updateJob(id: string, job: Partial<JobRole>): Promise<JobRole | null> {
  try {
    const response = await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    })
    if (!response.ok) throw new Error('Failed to update job')
    return await response.json()
  } catch (error) {
    console.error('Error updating job:', error)
    return null
  }
}

export async function deleteJob(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) throw new Error('Failed to delete job')
    return true
  } catch (error) {
    console.error('Error deleting job:', error)
    return false
  }
}


