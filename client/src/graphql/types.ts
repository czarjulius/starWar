export interface PageFilter {
  name: string
  page: number
}
export interface PersonType {
  name: string
  height: string
  mass: string
  gender: string
  home_world: HomeWorld
}
export interface HomeWorld {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
}