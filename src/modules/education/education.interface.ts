
type eduType = "CERTIFICATION" | "EDUCATION"

export interface IEducation {
  type: eduType
  year: string
  dateRange: string
  degree: string
  institute: string
  location: string
  description: string
  tags: string[]
  creadentialUrl?: string
  isPublished?: boolean
  order?: number
}