


export interface ICategory {
  type: string
  icon: string
  order?: number
  isPublished?: boolean
}


export interface ICategoryUpdate {
  type?: string
  icon?: string
  order?: number
  isPublished?: boolean
}
