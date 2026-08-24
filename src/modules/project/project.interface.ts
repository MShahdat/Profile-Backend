


export interface IProject {
  title: string
  categoryId: number
  subtitle?: string
  shortDescription?: string
  description: string
  liveUrl?: string
  githubUrl?: string
  feature: string[]
  futureImporve: string[]
  stats: MetaState[]
  meta: MetaState[]
  isPublished?: boolean
  order?: number
}


export interface MetaState {
  [key: string]: string
  level: string
  value: string
}



export interface IProjectUpdate {
  categoryId?: number
  subtitle?: string
  shortDescription?: string
  description?: string
  liveUrl?: string
  githubUrl?: string
  feature?: string[]
  futureImporve?: string[]
  stats?: MetaState[]
  meta?: MetaState[]
  isPublished?: boolean
  order?: number
}