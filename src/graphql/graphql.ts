/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type City = {
  __typename?: 'City';
  /**
   * The ISO Alpha-2 code designated to the
   * country where the city is located.
   */
  country_code: Scalars['String']['output'];
  /** The id of the country where the city is located. */
  country_id: Scalars['Int']['output'];
  /** The id of the city. */
  id: Scalars['Int']['output'];
  /** The latitude coordinate of the city. */
  latitude: Scalars['Float']['output'];
  /** The longitude coordinate of the city. */
  longitude: Scalars['Float']['output'];
  /** The name of the city. */
  name: Scalars['String']['output'];
  /**
   * The code designated to the state where
   * the city is located.
   */
  state_code: Scalars['String']['output'];
  /** The id of the state where the city is located. */
  state_id: Scalars['Int']['output'];
};

export type CityConnection = {
  __typename?: 'CityConnection';
  edges: Array<CityEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CityEdge = {
  __typename?: 'CityEdge';
  /** A cursor for use in the pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: City;
};

export type CityFilterInput = {
  /** Filter by country ISO Alpha-2 code. */
  ciso2: Scalars['ID']['input'];
  /** Filter by state id within the supplied csio2. */
  sid?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by state code within the supplied csio2. */
  siso?: InputMaybe<Scalars['String']['input']>;
};

export type Country = {
  __typename?: 'Country';
  /** The capital city of the country. */
  capital: Scalars['String']['output'];
  /** Get a list of cities within the country. */
  cities: CityConnection;
  /** The currency of the country. */
  currency: Scalars['String']['output'];
  /** The currency symbol of the country. */
  currency_symbol: Scalars['String']['output'];
  /** The emoji flag of the country. */
  emoji: Scalars['String']['output'];
  /** The unicode of the country's emoji flag. */
  emojiU: Scalars['String']['output'];
  /** The id of the country. */
  id: Scalars['Int']['output'];
  /**
   * The two-letter code (ISO Alpha-2) designated to the country.
   * Examples: US (for United States), and PH (for Philippines).
   */
  iso2: Scalars['ID']['output'];
  /**
   * The three-letter code (ISO Alpha-2) designated to the country.
   * Examples: USA (for United States), and PHL (for Philippines).
   */
  iso3: Scalars['ID']['output'];
  /** The latitude coordinate of the country. */
  latitude: Scalars['Float']['output'];
  /** The longitude coordinate of the country. */
  longitude: Scalars['Float']['output'];
  /** The name of the country. */
  name: Scalars['String']['output'];
  /** The native name of the country. */
  native: Scalars['String']['output'];
  /**
   * The three-digit code (ISO numeric) designated to the country.
   * Examples: 236 (for United States), and 020 (for Andora).
   */
  numeric_code: Scalars['ID']['output'];
  /** The dialing code of the country. */
  phone_code: Scalars['String']['output'];
  /** The region where the country is located. */
  region: Scalars['String']['output'];
  /** Get a list of states/provinces/regions within the country. */
  states: StateConnection;
  /** The subregion where the country is located. */
  subregion: Scalars['String']['output'];
  /** The timezones in the country. */
  timezones: Array<Timezone>;
  /** The top-level domain of the country. */
  tld: Scalars['String']['output'];
  /** The translation of the country's name in several languages. */
  translations: Scalars['JSONObject']['output'];
};


export type CountryCitiesArgs = {
  filter?: InputMaybe<CountryCitiesFilterInput>;
  page?: InputMaybe<PaginationInput>;
};


export type CountryStatesArgs = {
  page?: InputMaybe<PaginationInput>;
};

export type CountryCitiesFilterInput = {
  /** Filter by state id. */
  sid?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by state code. */
  siso?: InputMaybe<Scalars['String']['input']>;
};

export type CountryConnection = {
  __typename?: 'CountryConnection';
  edges: Array<CountryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CountryEdge = {
  __typename?: 'CountryEdge';
  /** A cursor for use in the pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Country;
};

export type CountryFilterInput = {
  /** Filter by region. */
  region?: InputMaybe<Region>;
  /** Filter by subregion. */
  subregion?: InputMaybe<Subregion>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor to continue when paginating forward. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /**
   * Indicates whether more edges exist,
   * when paginating forward.
   */
  hasNextPage: Scalars['Boolean']['output'];
  /**
   * Indicates whether more edges exist,
   * when paginating backwards.
   */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The cursor to continue when paginating backward. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaginationInput = {
  /** Returns the elements that come after the specified cursor. */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Returns the elements that come before the specified cursor. */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Returns the first n elements. */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Returns the last n elements. */
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get a list of cities. */
  cities: CityConnection;
  /** Get a specific city by id. */
  city?: Maybe<City>;
  /** Get a list of countries. */
  countries: CountryConnection;
  /** Get a specific country by id, iso2, iso3, or numeric_code. */
  country?: Maybe<Country>;
  /** Get a specific state by id or by state_code and country_code pair. */
  state?: Maybe<State>;
  /** Get a list of states/provinces/regions. */
  states: StateConnection;
};


export type QueryCitiesArgs = {
  filter?: InputMaybe<CityFilterInput>;
  page?: InputMaybe<PaginationInput>;
};


export type QueryCityArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCountriesArgs = {
  filter?: InputMaybe<CountryFilterInput>;
  page?: InputMaybe<PaginationInput>;
};


export type QueryCountryArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  iso2?: InputMaybe<Scalars['ID']['input']>;
  iso3?: InputMaybe<Scalars['ID']['input']>;
  numeric_code?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryStateArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  locationCode?: InputMaybe<StateCountryCodeInput>;
};


export type QueryStatesArgs = {
  filter?: InputMaybe<StateFilterInput>;
  page?: InputMaybe<PaginationInput>;
};

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Antarctica = 'Antarctica',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania'
}

export type State = {
  __typename?: 'State';
  /** Get a list of cities within the state. */
  cities: CityConnection;
  /**
   * The ISO Alpha-2 code designated to the
   * country where the state is located.
   */
  country_code: Scalars['String']['output'];
  /**
   * The id of the country where the
   * state is located.
   */
  country_id: Scalars['Int']['output'];
  /** The id of the state. */
  id: Scalars['Int']['output'];
  /** The latitude coordinate of the state. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** The longitude coordinate of the state. */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** The name of the state. */
  name: Scalars['String']['output'];
  /**
   * The code designated to the state.
   * Code is unique within the country.
   */
  state_code: Scalars['String']['output'];
};


export type StateCitiesArgs = {
  page?: InputMaybe<PaginationInput>;
};

export type StateConnection = {
  __typename?: 'StateConnection';
  edges: Array<StateEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StateCountryCodeInput = {
  country_code: Scalars['String']['input'];
  state_code: Scalars['String']['input'];
};

export type StateEdge = {
  __typename?: 'StateEdge';
  /** A cursor for use in the pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: State;
};

export type StateFilterInput = {
  /** Filter by country id */
  cid?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by country code */
  ciso2?: InputMaybe<Scalars['String']['input']>;
};

export enum Subregion {
  Antarctica = 'Antarctica',
  AustraliaAndNewZealand = 'Australia_and_New_Zealand',
  Caribbean = 'Caribbean',
  CentralAmerica = 'Central_America',
  CentralAsia = 'Central_Asia',
  EasternAfrica = 'Eastern_Africa',
  EasternAsia = 'Eastern_Asia',
  EasternEurope = 'Eastern_Europe',
  IndianOcean = 'Indian_Ocean',
  Melanesia = 'Melanesia',
  Micronesia = 'Micronesia',
  MiddleAfrica = 'Middle_Africa',
  NorthernAfrica = 'Northern_Africa',
  NorthernAmerica = 'Northern_America',
  NorthernEurope = 'Northern_Europe',
  Polynesia = 'Polynesia',
  SouthAmerica = 'South_America',
  SouthAtlanticOcean = 'South_Atlantic_Ocean',
  SouthEasternAsia = 'South_Eastern_Asia',
  SouthernAfrica = 'Southern_Africa',
  SouthernAsia = 'Southern_Asia',
  SouthernEurope = 'Southern_Europe',
  WesternAfrica = 'Western_Africa',
  WesternAsia = 'Western_Asia',
  WesternEurope = 'Western_Europe'
}

export type Timezone = {
  __typename?: 'Timezone';
  /** The abbreviation of the timezone name. */
  abbreviation: Scalars['String']['output'];
  /** The id of the country under the timezone. */
  country_id: Scalars['Int']['output'];
  /** The Greenwich Mean Time offset in seconds. */
  gmt_offset: Scalars['Int']['output'];
  /** Greenwich Mean Time offset name. */
  gmt_offset_name: Scalars['String']['output'];
  /** The name of the timezone. */
  timezone_name: Scalars['String']['output'];
  /** The zone name. */
  zone_name: Scalars['String']['output'];
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
