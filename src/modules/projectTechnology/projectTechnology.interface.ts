


export interface IPTechnology {
  projectId: string
  technologyId: number
  order: number
  isPublished: boolean
}



export interface IPTechnologyUpdate {
  order?: number
  isPublished?: boolean
}