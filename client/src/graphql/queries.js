import { gql} from '@apollo/client';
import {PageFilter} from './types'


export const LOAD_PEOPLE = gql`
    query FetchPeople($filter: PageFilter) {
      fetchPeople(filter: $filter){
        data {
          name
          height
          mass
          gender
          home_world{
            name
            rotation_period
            orbital_period
            diameter
            climate
            gravity
            terrain
            surface_water
            population
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