import { Region } from "./graphql"

export function countryQueryById(id: Number) {
  return `
      query {
        country(id: ${id}) {
          # Country Fields
          id
          name
          capital
          currency
        }
      }
    `
}

export function countriesQueryByRegion(region: string) {
  return `
      query {
        countries(
        filter: { region: ${region} }
        page: { first: 100 }
      ) {
        totalCount
        edges {
          cursor
          node {
            id
            name
            iso3
            emoji
          }
        }
      }
    }
  `
}

export function statesQueryByCountryId(countryId: Number) {
  return `
      query {
        states(
        filter: { cid: ${countryId} }
        page: { first: 100 }
      ) {
        totalCount
        edges {
          cursor
          node {
            name
            state_code
            country_code
            latitude
            longitude
          }
        }
      }
    }
  `
}

export function stateQueryBy_StateCode_and_CountryCode(stateCode: String, countryCode: String) {
  return `
      query {
        state(
          locationCode: { state_code: "${stateCode}", country_code: "${countryCode}" }
        ) {
          # State Fields
          id
          name
          country_id
          
          # ...
        }
      }
  `
}

export function citiesQueryByStateId(stateId: Number, ciso2: String, first: Number) {
  return `
      query {
        cities(
        filter: { sid: ${stateId}, ciso2: "${ciso2}" }
        page: { first: ${first} }
      ) {
        totalCount
        edges {
          cursor
          node {
            name
            state_code
            country_code
          }
        }
      }
    }
  `
}

