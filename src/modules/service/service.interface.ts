

export interface IService {
  icon: string
  iconColor: string
  bgColor: string
  title: string
  description: string
  order?: number
  isPublished?: boolean
}



export interface IServiceUpdate {
  icon?: string
  iconColor?: string
  bgColor?: string
  title?: string
  description?: string
  order?: number
  isPublished?: boolean
}