

export interface ISocialLink {
  platform: string
  url: string
  icon: string
  order: number
}



export interface IUpdateSocialLink {
  url?: string
  icon?: string
  order?: number
  isPublished?: boolean
}