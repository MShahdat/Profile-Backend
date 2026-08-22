


export interface ISiteConfigFormPayload {
  name: string
  email: string
  phone: string
  title?: string
  aboutDescription: string
  experience?: number
  totalProjects?: number
  happyClients?: number

  greeting: string
  role: string
  titleLine: string[]
  heroDescription: string
  passion: string

  footerTxt?: string
  footerTagline?: string

  primaryColor?: string
  secondaryColor?: string
  ternaryColor?: string

}
