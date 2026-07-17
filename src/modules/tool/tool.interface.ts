



export interface ITool {
  name: string
  icon?: string
  order?: number
  isPublished?: boolean
}



export interface IToolUpdate {
  name?: string
  icon?: string
  order?: number
  isPublished?: boolean
}