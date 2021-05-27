const fetchPeopleQuery = `
query FetchPeople($filter: PageFilter) {
  fetchPeople(filter: $filter) {
    data {
      name
      height
      mass
      gender
      home_world {
        name
        terrain
        population
        orbital_period
        rotation_period
        diameter
        climate
        gravity
        surface_water
      }
    }
    page{
      total
      next
      previous
    }
  }
}
`
module.exports = {
  fetchPeopleQuery
}