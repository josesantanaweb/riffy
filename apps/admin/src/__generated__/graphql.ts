import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type AddUserToRoomInput = {
  numberOfCards: Scalars['Int']['input'];
  roomId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type Card = {
  __typename?: 'Card';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  number: Scalars['Float']['output'];
  numbers: Scalars['JSON']['output'];
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateRoomInput = {
  award: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToRoom: Scalars['String']['output'];
  announceNumber?: Maybe<Scalars['Float']['output']>;
  createCard: Card;
  createRoom: Room;
  login: AuthResponse;
  logout: Scalars['Boolean']['output'];
  register: AuthResponse;
  updateUser: User;
};

export type MutationAddUserToRoomArgs = {
  input: AddUserToRoomInput;
};

export type MutationAnnounceNumberArgs = {
  roomId: Scalars['String']['input'];
};

export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationLogoutArgs = {
  id: Scalars['String']['input'];
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  card: Card;
  cards: Array<Card>;
  profile: User;
  refreshToken: AuthResponse;
  room: Room;
  rooms: Array<Room>;
  user: User;
  users: Array<User>;
};

export type QueryCardArgs = {
  id: Scalars['String']['input'];
};

export type QueryRefreshTokenArgs = {
  id: Scalars['String']['input'];
  refreshToken: Scalars['String']['input'];
};

export type QueryRoomArgs = {
  id: Scalars['String']['input'];
};

export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Room = {
  __typename?: 'Room';
  award: Scalars['Float']['output'];
  cards: Array<Card>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  drawnNumbers: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  status: Scalars['Boolean']['output'];
  time: Scalars['DateTime']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userCards: Array<Card>;
  users: Array<User>;
  winnerCard?: Maybe<Card>;
  winnerUser?: Maybe<User>;
};

export type RoomUserCardsArgs = {
  userId: Scalars['String']['input'];
};

export type RoomStarted = {
  __typename?: 'RoomStarted';
  message: Scalars['String']['output'];
  roomId: Scalars['String']['output'];
};

export type RoomWinner = {
  __typename?: 'RoomWinner';
  roomId: Scalars['String']['output'];
  winnerCard: Card;
  winnerUser: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  announceNumber: Scalars['Float']['output'];
  roomStarted: RoomStarted;
  roomWinner: RoomWinner;
};

export type SubscriptionRoomStartedArgs = {
  roomId: Scalars['String']['input'];
};

export type SubscriptionRoomWinnerArgs = {
  roomId: Scalars['String']['input'];
};

export type UpdateUserInput = {
  balance?: InputMaybe<Scalars['Float']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  balance: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  raking: Scalars['Float']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type UserFragmentFragment = {
  __typename?: 'User';
  id: string;
  name?: string | null;
  balance: number;
  username: string;
  raking: number;
  email: string;
  image?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type CardFragmentFragment = {
  __typename?: 'Card';
  id: string;
  number: number;
  numbers: any;
  status: boolean;
  createdAt?: any | null;
  updatedAt?: any | null;
};

export type RoomFragmentFragment = {
  __typename?: 'Room';
  id: string;
  name: string;
  award: number;
  price: number;
  time: any;
  createdAt?: any | null;
  status: boolean;
  updatedAt?: any | null;
  drawnNumbers: any;
  users: Array<{
    __typename?: 'User';
    id: string;
    name?: string | null;
    balance: number;
    username: string;
    raking: number;
    email: string;
    image?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  }>;
  cards: Array<{
    __typename?: 'Card';
    id: string;
    number: number;
    numbers: any;
    status: boolean;
    createdAt?: any | null;
    updatedAt?: any | null;
  }>;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthResponse';
    accessToken: string;
    refreshToken: string;
    user: {
      __typename?: 'User';
      username: string;
      email: string;
      name?: string | null;
      id: string;
    };
  };
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'AuthResponse';
    accessToken: string;
    refreshToken: string;
    user: {
      __typename?: 'User';
      username: string;
      email: string;
      name?: string | null;
      id: string;
    };
  };
};

export type MutationMutationVariables = Exact<{
  input: AddUserToRoomInput;
}>;

export type MutationMutation = {
  __typename?: 'Mutation';
  addUserToRoom: string;
};

export type AnnounceNumberMutationVariables = Exact<{
  roomId: Scalars['String']['input'];
}>;

export type AnnounceNumberMutation = {
  __typename?: 'Mutation';
  announceNumber?: number | null;
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    balance: number;
    username: string;
    raking: number;
    email: string;
    image?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  };
};

export type RoomsQueryVariables = Exact<{ [key: string]: never }>;

export type RoomsQuery = {
  __typename?: 'Query';
  rooms: Array<{
    __typename?: 'Room';
    id: string;
    name: string;
    award: number;
    price: number;
    time: any;
    createdAt?: any | null;
    status: boolean;
    updatedAt?: any | null;
    drawnNumbers: any;
    users: Array<{
      __typename?: 'User';
      id: string;
      name?: string | null;
      balance: number;
      username: string;
      raking: number;
      email: string;
      image?: string | null;
      createdAt?: any | null;
      updatedAt?: any | null;
    }>;
    cards: Array<{
      __typename?: 'Card';
      id: string;
      number: number;
      numbers: any;
      status: boolean;
      createdAt?: any | null;
      updatedAt?: any | null;
    }>;
  }>;
};

export type RoomQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type RoomQuery = {
  __typename?: 'Query';
  room: {
    __typename?: 'Room';
    id: string;
    name: string;
    award: number;
    price: number;
    time: any;
    createdAt?: any | null;
    status: boolean;
    updatedAt?: any | null;
    drawnNumbers: any;
    users: Array<{
      __typename?: 'User';
      id: string;
      name?: string | null;
      balance: number;
      username: string;
      raking: number;
      email: string;
      image?: string | null;
      createdAt?: any | null;
      updatedAt?: any | null;
    }>;
    cards: Array<{
      __typename?: 'Card';
      id: string;
      number: number;
      numbers: any;
      status: boolean;
      createdAt?: any | null;
      updatedAt?: any | null;
    }>;
  };
};

export type ProfileQueryVariables = Exact<{ [key: string]: never }>;

export type ProfileQuery = {
  __typename?: 'Query';
  profile: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    username: string;
    raking: number;
    balance: number;
    email: string;
    image?: string | null;
    refreshToken?: string | null;
    role?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  };
};

export type RoomStartedSubscriptionVariables = Exact<{
  roomId: Scalars['String']['input'];
}>;

export type RoomStartedSubscription = {
  __typename?: 'Subscription';
  roomStarted: { __typename?: 'RoomStarted'; roomId: string; message: string };
};

export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    name
    balance
    username
    raking
    email
    image
    createdAt
    updatedAt
  }
`;
export const CardFragmentFragmentDoc = gql`
  fragment CardFragment on Card {
    id
    number
    numbers
    status
    createdAt
    updatedAt
  }
`;
export const RoomFragmentFragmentDoc = gql`
  fragment RoomFragment on Room {
    id
    name
    award
    price
    time
    createdAt
    status
    updatedAt
    drawnNumbers
    users {
      ...UserFragment
    }
    cards {
      ...CardFragment
    }
  }
  ${UserFragmentFragmentDoc}
  ${CardFragmentFragmentDoc}
`;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        username
        email
        name
        id
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      accessToken
      refreshToken
      user {
        username
        email
        name
        id
      }
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const MutationDocument = gql`
  mutation Mutation($input: AddUserToRoomInput!) {
    addUserToRoom(input: $input)
  }
`;
export type MutationMutationFn = Apollo.MutationFunction<
  MutationMutation,
  MutationMutationVariables
>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MutationMutation,
    MutationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<MutationMutation, MutationMutationVariables>(
    MutationDocument,
    options,
  );
}
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<
  MutationMutation,
  MutationMutationVariables
>;
export const AnnounceNumberDocument = gql`
  mutation AnnounceNumber($roomId: String!) {
    announceNumber(roomId: $roomId)
  }
`;
export type AnnounceNumberMutationFn = Apollo.MutationFunction<
  AnnounceNumberMutation,
  AnnounceNumberMutationVariables
>;

/**
 * __useAnnounceNumberMutation__
 *
 * To run a mutation, you first call `useAnnounceNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnnounceNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [announceNumberMutation, { data, loading, error }] = useAnnounceNumberMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useAnnounceNumberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AnnounceNumberMutation,
    AnnounceNumberMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AnnounceNumberMutation,
    AnnounceNumberMutationVariables
  >(AnnounceNumberDocument, options);
}
export type AnnounceNumberMutationHookResult = ReturnType<
  typeof useAnnounceNumberMutation
>;
export type AnnounceNumberMutationResult =
  Apollo.MutationResult<AnnounceNumberMutation>;
export type AnnounceNumberMutationOptions = Apollo.BaseMutationOptions<
  AnnounceNumberMutation,
  AnnounceNumberMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const RoomsDocument = gql`
  query Rooms {
    rooms {
      ...RoomFragment
    }
  }
  ${RoomFragmentFragmentDoc}
`;

/**
 * __useRoomsQuery__
 *
 * To run a query within a React component, call `useRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomsQuery(
  baseOptions?: Apollo.QueryHookOptions<RoomsQuery, RoomsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RoomsQuery, RoomsQueryVariables>(
    RoomsDocument,
    options,
  );
}
export function useRoomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RoomsQuery, RoomsQueryVariables>(
    RoomsDocument,
    options,
  );
}
export function useRoomsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<RoomsQuery, RoomsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<RoomsQuery, RoomsQueryVariables>(
    RoomsDocument,
    options,
  );
}
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsSuspenseQueryHookResult = ReturnType<
  typeof useRoomsSuspenseQuery
>;
export type RoomsQueryResult = Apollo.QueryResult<
  RoomsQuery,
  RoomsQueryVariables
>;
export const RoomDocument = gql`
  query Room($id: String!) {
    room(id: $id) {
      ...RoomFragment
    }
  }
  ${RoomFragmentFragmentDoc}
`;

/**
 * __useRoomQuery__
 *
 * To run a query within a React component, call `useRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRoomQuery(
  baseOptions: Apollo.QueryHookOptions<RoomQuery, RoomQueryVariables> &
    ({ variables: RoomQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RoomQuery, RoomQueryVariables>(RoomDocument, options);
}
export function useRoomLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RoomQuery, RoomQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RoomQuery, RoomQueryVariables>(
    RoomDocument,
    options,
  );
}
export function useRoomSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<RoomQuery, RoomQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<RoomQuery, RoomQueryVariables>(
    RoomDocument,
    options,
  );
}
export type RoomQueryHookResult = ReturnType<typeof useRoomQuery>;
export type RoomLazyQueryHookResult = ReturnType<typeof useRoomLazyQuery>;
export type RoomSuspenseQueryHookResult = ReturnType<
  typeof useRoomSuspenseQuery
>;
export type RoomQueryResult = Apollo.QueryResult<RoomQuery, RoomQueryVariables>;
export const ProfileDocument = gql`
  query Profile {
    profile {
      id
      name
      username
      raking
      balance
      email
      image
      refreshToken
      role
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(
    ProfileDocument,
    options,
  );
}
export function useProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProfileQuery,
    ProfileQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(
    ProfileDocument,
    options,
  );
}
export function useProfileSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ProfileQuery, ProfileQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ProfileQuery, ProfileQueryVariables>(
    ProfileDocument,
    options,
  );
}
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileSuspenseQueryHookResult = ReturnType<
  typeof useProfileSuspenseQuery
>;
export type ProfileQueryResult = Apollo.QueryResult<
  ProfileQuery,
  ProfileQueryVariables
>;
export const RoomStartedDocument = gql`
  subscription RoomStarted($roomId: String!) {
    roomStarted(roomId: $roomId) {
      roomId
      message
    }
  }
`;

/**
 * __useRoomStartedSubscription__
 *
 * To run a query within a React component, call `useRoomStartedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomStartedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomStartedSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useRoomStartedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    RoomStartedSubscription,
    RoomStartedSubscriptionVariables
  > &
    (
      | { variables: RoomStartedSubscriptionVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    RoomStartedSubscription,
    RoomStartedSubscriptionVariables
  >(RoomStartedDocument, options);
}
export type RoomStartedSubscriptionHookResult = ReturnType<
  typeof useRoomStartedSubscription
>;
export type RoomStartedSubscriptionResult =
  Apollo.SubscriptionResult<RoomStartedSubscription>;
