import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type CreateRaffleInput = {
  banner: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  drawDate: Scalars['DateTime']['input'];
  logo: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  primaryColor: Scalars['String']['input'];
  secondaryColor?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  totalTickets: Scalars['Int']['input'];
};

export type CreateTicketInput = {
  number: Scalars['String']['input'];
  raffleId: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRaffle: Raffle;
  createTicket: Ticket;
  createUser: User;
  deleteRaffle: Raffle;
  deleteTicket: Ticket;
  deleteUser: User;
  login: AuthResponse;
  register: AuthResponse;
  updateRaffle: Raffle;
  updateTicket: Ticket;
  updateUser: User;
};


export type MutationCreateRaffleArgs = {
  input: CreateRaffleInput;
};


export type MutationCreateTicketArgs = {
  input: CreateTicketInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteRaffleArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTicketArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateRaffleArgs = {
  id: Scalars['String']['input'];
  input: UpdateRaffleInput;
};


export type MutationUpdateTicketArgs = {
  id: Scalars['String']['input'];
  input: UpdateTicketInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  profile: User;
  raffle: Raffle;
  raffles: Array<Raffle>;
  ticket: Ticket;
  tickets: Array<Ticket>;
  user: User;
  users: Array<User>;
};


export type QueryRaffleArgs = {
  id: Scalars['String']['input'];
};


export type QueryTicketArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type Raffle = {
  __typename?: 'Raffle';
  available?: Maybe<Scalars['Float']['output']>;
  banner: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  drawDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  logo: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  primaryColor: Scalars['String']['output'];
  progress?: Maybe<Scalars['Float']['output']>;
  secondaryColor?: Maybe<Scalars['String']['output']>;
  sold?: Maybe<Scalars['Float']['output']>;
  tickets?: Maybe<Array<Ticket>>;
  title: Scalars['String']['output'];
  totalTickets: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['ID']['output'];
  number: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
};

export type UpdateRaffleInput = {
  banner?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  drawDate?: InputMaybe<Scalars['DateTime']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  primaryColor?: InputMaybe<Scalars['String']['input']>;
  secondaryColor?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  totalTickets?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTicketInput = {
  number?: InputMaybe<Scalars['String']['input']>;
  raffleId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type RafflesQueryVariables = Exact<{ [key: string]: never; }>;


export type RafflesQuery = { __typename?: 'Query', raffles: Array<{ __typename?: 'Raffle', id: string, title: string, description?: string | null, primaryColor: string, secondaryColor?: string | null, totalTickets: number, price: number, drawDate?: any | null, createdAt?: any | null, updatedAt?: any | null, sold?: number | null, available?: number | null, progress?: number | null, tickets?: Array<{ __typename?: 'Ticket', id: string, number: string, status?: string | null }> | null }> };


export const RafflesDocument = gql`
    query Raffles {
  raffles {
    id
    title
    description
    primaryColor
    secondaryColor
    totalTickets
    price
    drawDate
    createdAt
    updatedAt
    sold
    available
    progress
    tickets {
      id
      number
      status
    }
  }
}
    `;

/**
 * __useRafflesQuery__
 *
 * To run a query within a React component, call `useRafflesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRafflesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRafflesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRafflesQuery(baseOptions?: Apollo.QueryHookOptions<RafflesQuery, RafflesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RafflesQuery, RafflesQueryVariables>(RafflesDocument, options);
      }
export function useRafflesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RafflesQuery, RafflesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RafflesQuery, RafflesQueryVariables>(RafflesDocument, options);
        }
export function useRafflesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RafflesQuery, RafflesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RafflesQuery, RafflesQueryVariables>(RafflesDocument, options);
        }
export type RafflesQueryHookResult = ReturnType<typeof useRafflesQuery>;
export type RafflesLazyQueryHookResult = ReturnType<typeof useRafflesLazyQuery>;
export type RafflesSuspenseQueryHookResult = ReturnType<typeof useRafflesSuspenseQuery>;
export type RafflesQueryResult = Apollo.QueryResult<RafflesQuery, RafflesQueryVariables>;