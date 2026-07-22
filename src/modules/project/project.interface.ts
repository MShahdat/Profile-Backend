


export interface IProject {
  title: string
  category: string
  subtitle?: string
  cover: string
  image: string[]
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
  level: string
  value: string
}



export interface IProjectUpdate {
  subtitle?: string
  cover?: string
  image?: string[]
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