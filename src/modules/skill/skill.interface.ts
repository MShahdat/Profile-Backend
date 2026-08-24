


export interface ISkill {
  categoryId: number
  name: string
  level: number
  icon: string
  featured: boolean
  order?: number
}




export interface ISkillUpdate {
  name?: string
  level?: number
  icon?: string
  featured?: boolean
  order?: number
}



export interface SkillQuery {
  type?: string
  sortOrder?: string
  sortBy?: string
  featured?: boolean
}