import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** date */
  Date: any
  /** datetime */
  DateTime: any
}

export type AddRecipeInput = {
  title: Scalars["String"]
  description?: Maybe<Scalars["String"]>
}

export enum EnumLoginType_Lufc {
  Password = "PASSWORD",
  Code = "CODE",
}

export type InputLogin = {
  login: Scalars["String"]
  type: EnumLoginType_Lufc
  password?: Maybe<Scalars["String"]>
  code?: Maybe<Scalars["String"]>
}

export type InputSendNotification = {
  content: Scalars["String"]
  createdAt: Scalars["DateTime"]
}

export type Mutation = {
  __typename?: "Mutation"
  addRecipe: TRecipe
  addRecipe2: TRecipe
  login: TProfile
  sendNotification: Scalars["Boolean"]
}

export type MutationAddRecipeArgs = {
  data: AddRecipeInput
}

export type MutationAddRecipe2Args = {
  data: AddRecipeInput
}

export type MutationLoginArgs = {
  data: InputLogin
}

export type MutationSendNotificationArgs = {
  data: InputSendNotification
}

export type Query = {
  __typename?: "Query"
  recipe?: Maybe<TRecipe>
  recipe2?: Maybe<TRecipe>
  healthCheck: THealthCheck
  profile: TProfile
}

export type QueryRecipeArgs = {
  title: Scalars["String"]
}

export type QueryRecipe2Args = {
  title: Scalars["String"]
}

export type Subscription = {
  __typename?: "Subscription"
  newNotification: TNotification
}

export type THealthCheck = {
  __typename?: "THealthCheck"
  ok: Scalars["Boolean"]
}

export type TNotification = {
  __typename?: "TNotification"
  id: Scalars["String"]
  content: Scalars["String"]
  createdAt: Scalars["DateTime"]
}

export type TProfile = {
  __typename?: "TProfile"
  id: Scalars["String"]
  name: Scalars["String"]
  createdAt: Scalars["DateTime"]
  birthday: Scalars["Date"]
  token: Scalars["String"]
}

/** Object representing cooking recipe */
export type TRecipe = {
  __typename?: "TRecipe"
  title: Scalars["String"]
  /** @deprecated Use `description` field instead */
  specification?: Maybe<Scalars["String"]>
  /** The recipe description with preparation info */
  description?: Maybe<Scalars["String"]>
  ratings: Array<Scalars["Int"]>
  creationDate: Scalars["Date"]
}

export type LoginMutationVariables = Exact<{
  data: InputLogin
}>

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "TProfile" } & Pick<TProfile, "id" | "name" | "createdAt">
}

export const LoginDocument = gql`
  mutation login($data: InputLogin!) {
    login(data: $data) {
      id
      name
      createdAt
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

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
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
