import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  Uploads: any;
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  code?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  errorStatus?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminChangePassword?: Maybe<AdminResponse>;
  changePassword?: Maybe<UserResponse>;
  createUser?: Maybe<UserResponse>;
  createUserType?: Maybe<UserResponse>;
  forgotPassword?: Maybe<UserResponse>;
  forgotPasswordAdmin?: Maybe<AdminResponse>;
  loginAdmin?: Maybe<AdminResponse>;
  loginUser?: Maybe<UserResponse>;
  resendPasscode?: Maybe<UserResponse>;
  verifyPasscode?: Maybe<UserResponse>;
};


export type MutationAdminChangePasswordArgs = {
  code?: InputMaybe<Scalars['String']>;
  confirm?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationChangePasswordArgs = {
  confirm?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  user_type?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserTypeArgs = {
  type?: InputMaybe<Scalars['String']>;
  type_icon?: InputMaybe<Scalars['Uploads']>;
};


export type MutationForgotPasswordArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type MutationForgotPasswordAdminArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type MutationLoginAdminArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationLoginUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  user_type?: InputMaybe<Scalars['String']>;
};


export type MutationResendPasscodeArgs = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationVerifyPasscodeArgs = {
  code?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getUserTypeList?: Maybe<UserTypesList>;
};


export type RootQueryGetUserTypeListArgs = {
  curr_page?: InputMaybe<Scalars['String']>;
  per_page?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  created_at?: Maybe<Scalars['String']>;
  doctors_cert?: Maybe<Scalars['Upload']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  is_verified?: Maybe<Scalars['Int']>;
  mobile_number?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile_photo?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  user_type?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Scalars['String']>;
  errorStatus?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

export type UserType = {
  __typename?: 'UserType';
  created_at?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
  type_icon?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
};

export type UserTypePager = {
  __typename?: 'UserTypePager';
  current_page?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<UserType>>>;
  first_page?: Maybe<Scalars['Int']>;
  last_page?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type UserTypesList = {
  __typename?: 'UserTypesList';
  data?: Maybe<UserTypePager>;
  file_url?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type LoginAdminMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginAdminMutation = { __typename?: 'Mutation', loginAdmin?: { __typename?: 'AdminResponse', success?: boolean | null, message?: string | null, errorStatus?: boolean | null, error?: string | null, token?: string | null } | null };

export type ForgotPasswordAdminMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordAdminMutation = { __typename?: 'Mutation', forgotPasswordAdmin?: { __typename?: 'AdminResponse', success?: boolean | null, email?: string | null, code?: string | null, message?: string | null } | null };

export type AdminChangePasswordMutationVariables = Exact<{
  code: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirm: Scalars['String'];
}>;


export type AdminChangePasswordMutation = { __typename?: 'Mutation', adminChangePassword?: { __typename?: 'AdminResponse', success?: boolean | null, message?: string | null } | null };

export type CreateUserTypeMutationVariables = Exact<{
  type: Scalars['String'];
  type_icon: Scalars['Uploads'];
}>;


export type CreateUserTypeMutation = { __typename?: 'Mutation', createUserType?: { __typename?: 'UserResponse', success?: boolean | null, message?: string | null, errorStatus?: boolean | null, error?: string | null, token?: string | null } | null };

export type GetUserTypeListQueryVariables = Exact<{
  per_page: Scalars['String'];
  curr_page: Scalars['String'];
}>;


export type GetUserTypeListQuery = { __typename?: 'RootQuery', getUserTypeList?: { __typename?: 'UserTypesList', success?: boolean | null, message?: string | null, file_url?: string | null, data?: { __typename?: 'UserTypePager', first_page?: number | null, last_page?: number | null, total?: number | null, per_page?: number | null, current_page?: number | null, data?: Array<{ __typename?: 'UserType', id?: string | null, type?: string | null, type_icon?: string | null, created_at?: string | null, updated_at?: string | null } | null> | null } | null } | null };


export const LoginAdminDocument = `
    mutation loginAdmin($email: String!, $password: String!) {
  loginAdmin(email: $email, password: $password) {
    success
    message
    errorStatus
    error
    token
  }
}
    `;
export const useLoginAdminMutation = <
      TError ,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<LoginAdminMutation, any, LoginAdminMutationVariables, TContext>
    ) =>
    useMutation<LoginAdminMutation, any, LoginAdminMutationVariables, TContext>(
      ['loginAdmin'],
      (variables?: LoginAdminMutationVariables) => fetcher<LoginAdminMutation, LoginAdminMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, LoginAdminDocument, variables)(),
      options
    );
export const ForgotPasswordAdminDocument = `
    mutation forgotPasswordAdmin($email: String!) {
  forgotPasswordAdmin(email: $email) {
    success
    email
    code
    message
  }
}
    `;
export const useForgotPasswordAdminMutation = <
      TError ,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<ForgotPasswordAdminMutation, any, ForgotPasswordAdminMutationVariables, TContext>
    ) =>
    useMutation<ForgotPasswordAdminMutation, any, ForgotPasswordAdminMutationVariables, TContext>(
      ['forgotPasswordAdmin'],
      (variables?: ForgotPasswordAdminMutationVariables) => fetcher<ForgotPasswordAdminMutation, ForgotPasswordAdminMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, ForgotPasswordAdminDocument, variables)(),
      options
    );
export const AdminChangePasswordDocument = `
    mutation adminChangePassword($code: String!, $email: String!, $password: String!, $confirm: String!) {
  adminChangePassword(
    code: $code
    email: $email
    password: $password
    confirm: $confirm
  ) {
    success
    message
  }
}
    `;
export const useAdminChangePasswordMutation = <
      TError,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AdminChangePasswordMutation, any, AdminChangePasswordMutationVariables, TContext>
    ) =>
    useMutation<AdminChangePasswordMutation, any, AdminChangePasswordMutationVariables, TContext>(
      ['adminChangePassword'],
      (variables?: AdminChangePasswordMutationVariables) => fetcher<AdminChangePasswordMutation, AdminChangePasswordMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AdminChangePasswordDocument, variables)(),
      options
    );
export const CreateUserTypeDocument = `
    mutation createUserType($type: String!, $type_icon: Uploads!) {
  createUserType(type: $type, type_icon: $type_icon) {
    success
    message
    errorStatus
    error
    token
  }
}
    `;
export const useCreateUserTypeMutation = <
      TError,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateUserTypeMutation, any, CreateUserTypeMutationVariables, TContext>
    ) =>
    useMutation<CreateUserTypeMutation, any, CreateUserTypeMutationVariables, TContext>(
      ['createUserType'],
      (variables?: CreateUserTypeMutationVariables) => fetcher<CreateUserTypeMutation, CreateUserTypeMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateUserTypeDocument, variables)(),
      options
    );
export const GetUserTypeListDocument = `
    query getUserTypeList($per_page: String!, $curr_page: String!) {
  getUserTypeList(per_page: $per_page, curr_page: $curr_page) {
    success
    data {
      first_page
      last_page
      total
      per_page
      current_page
      data {
        id
        type
        type_icon
        created_at
        updated_at
      }
    }
    message
    file_url
  }
}
    `;
export const useGetUserTypeListQuery = <
      TData ,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetUserTypeListQueryVariables,
      options?: UseQueryOptions<GetUserTypeListQuery, TError, GetUserTypeListQuery>
    ) =>
    useQuery<GetUserTypeListQuery, TError, GetUserTypeListQuery>(
      ['getUserTypeList', variables],
      fetcher<GetUserTypeListQuery, GetUserTypeListQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUserTypeListDocument, variables),
      options
    );
