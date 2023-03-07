/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BlogPost {
  id: number;
  /** @maxLength 100 */
  title?: string;
  /** @maxLength 255 */
  subtitle?: string;
  /** @format date-time */
  created: string;
  body: string;
  owner: User;
  comments: Comment[];
}

export interface Comment {
  id?: number;
  comments?: Comment[];
  /** @format date-time */
  created?: string;
  owner?: User;
  body: string;
  blogpost: number;
  parent_comment?: number;
}

export interface Login {
  username?: string;
  /** @format email */
  email?: string;
  password: string;
}

export interface PasswordChange {
  /** @maxLength 128 */
  new_password1: string;
  /** @maxLength 128 */
  new_password2: string;
}

/** Serializer for requesting a password reset e-mail. */
export interface PasswordReset {
  /** @format email */
  email: string;
}

/** Serializer for confirming a password reset attempt. */
export interface PasswordResetConfirm {
  /** @maxLength 128 */
  new_password1: string;
  /** @maxLength 128 */
  new_password2: string;
  uid: string;
  token: string;
}

export interface PatchedBlogPost {
  id?: number;
  /** @maxLength 100 */
  title?: string;
  /** @maxLength 255 */
  subtitle?: string;
  /** @format date-time */
  created?: string;
  body?: string;
  owner?: User;
  comments?: Comment[];
}

export interface PatchedUser {
  id?: number;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username?: string;
  blogposts?: number[];
  /** @maxLength 150 */
  first_name?: string;
  /** @maxLength 150 */
  last_name?: string;
}

/** User model w/o password */
export interface PatchedUserDetails {
  /** ID */
  pk?: number;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username?: string;
  /**
   * Email address
   * @format email
   */
  email?: string;
  /** @maxLength 150 */
  first_name?: string;
  /** @maxLength 150 */
  last_name?: string;
}

export interface RestAuthDetail {
  detail: string;
}

/** Serializer for Token model. */
export interface Token {
  /** @maxLength 40 */
  key: string;
}

export interface User {
  id: number;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  blogposts: number[];
  /** @maxLength 150 */
  first_name?: string;
  /** @maxLength 150 */
  last_name?: string;
}

/** User model w/o password */
export interface UserDetails {
  /** ID */
  pk: number;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email address
   * @format email
   */
  email: string;
  /** @maxLength 150 */
  first_name?: string;
  /** @maxLength 150 */
  last_name?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title No title
 * @version 0.0.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  blogposts = {
    /**
     * No description
     *
     * @tags blogposts
     * @name BlogpostsList
     * @request GET:/blogposts/
     * @secure
     */
    blogpostsList: (params: RequestParams = {}) =>
      this.request<BlogPost[], any>({
        path: `/blogposts/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags blogposts
     * @name BlogpostsCreate
     * @request POST:/blogposts/
     * @secure
     */
    blogpostsCreate: (data: BlogPost, params: RequestParams = {}) =>
      this.request<BlogPost, any>({
        path: `/blogposts/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags blogposts
     * @name BlogpostsRetrieve
     * @request GET:/blogposts/{id}/
     * @secure
     */
    blogpostsRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<BlogPost, any>({
        path: `/blogposts/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags blogposts
     * @name BlogpostsUpdate
     * @request PUT:/blogposts/{id}/
     * @secure
     */
    blogpostsUpdate: (id: number, data: BlogPost, params: RequestParams = {}) =>
      this.request<BlogPost, any>({
        path: `/blogposts/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags blogposts
     * @name BlogpostsPartialUpdate
     * @request PATCH:/blogposts/{id}/
     * @secure
     */
    blogpostsPartialUpdate: (id: number, data: PatchedBlogPost, params: RequestParams = {}) =>
      this.request<BlogPost, any>({
        path: `/blogposts/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags blogposts
     * @name BlogpostsDestroy
     * @request DELETE:/blogposts/{id}/
     * @secure
     */
    blogpostsDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/blogposts/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  comments = {
    /**
     * No description
     *
     * @tags comments
     * @name CommentsCreate
     * @request POST:/comments/
     * @secure
     */
    commentsCreate: (data: Comment, params: RequestParams = {}) =>
      this.request<Comment, any>({
        path: `/comments/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name CommentsRetrieve
     * @request GET:/comments/{id}/
     * @secure
     */
    commentsRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<Comment, any>({
        path: `/comments/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  djRestAuth = {
    /**
     * @description Check the credentials and return the REST Token if the credentials are valid and authenticated. Calls Django Auth login method to register User ID in Django session framework Accept the following POST parameters: username, password Return the REST Framework Token Object's key.
     *
     * @tags dj-rest-auth
     * @name DjRestAuthLoginCreate
     * @request POST:/dj-rest-auth/login/
     * @secure
     */
    djRestAuthLoginCreate: (data: Login, params: RequestParams = {}) =>
      this.request<Token, any>({
        path: `/dj-rest-auth/login/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Calls Django logout method and delete the Token object assigned to the current User object. Accepts/Returns nothing.
     *
     * @tags dj-rest-auth
     * @name DjRestAuthLogoutCreate
     * @request POST:/dj-rest-auth/logout/
     * @secure
     */
    djRestAuthLogoutCreate: (params: RequestParams = {}) =>
      this.request<RestAuthDetail, any>({
        path: `/dj-rest-auth/logout/`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Calls Django Auth SetPasswordForm save method. Accepts the following POST parameters: new_password1, new_password2 Returns the success/fail message.
     *
     * @tags dj-rest-auth
     * @name DjRestAuthPasswordChangeCreate
     * @request POST:/dj-rest-auth/password/change/
     * @secure
     */
    djRestAuthPasswordChangeCreate: (data: PasswordChange, params: RequestParams = {}) =>
      this.request<RestAuthDetail, any>({
        path: `/dj-rest-auth/password/change/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Calls Django Auth PasswordResetForm save method. Accepts the following POST parameters: email Returns the success/fail message.
     *
     * @tags dj-rest-auth
     * @name DjRestAuthPasswordResetCreate
     * @request POST:/dj-rest-auth/password/reset/
     * @secure
     */
    djRestAuthPasswordResetCreate: (data: PasswordReset, params: RequestParams = {}) =>
      this.request<RestAuthDetail, any>({
        path: `/dj-rest-auth/password/reset/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Password reset e-mail link is confirmed, therefore this resets the user's password. Accepts the following POST parameters: token, uid, new_password1, new_password2 Returns the success/fail message.
     *
     * @tags dj-rest-auth
     * @name DjRestAuthPasswordResetConfirmCreate
     * @request POST:/dj-rest-auth/password/reset/confirm/
     * @secure
     */
    djRestAuthPasswordResetConfirmCreate: (data: PasswordResetConfirm, params: RequestParams = {}) =>
      this.request<RestAuthDetail, any>({
        path: `/dj-rest-auth/password/reset/confirm/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Reads and updates UserModel fields Accepts GET, PUT, PATCH methods. Default accepted fields: username, first_name, last_name Default display fields: pk, username, email, first_name, last_name Read-only fields: pk, email Returns UserModel fields.
     *
     * @tags dj-rest-auth
     * @name DjRestAuthUserRetrieve
     * @request GET:/dj-rest-auth/user/
     * @secure
     */
    djRestAuthUserRetrieve: (params: RequestParams = {}) =>
      this.request<UserDetails, any>({
        path: `/dj-rest-auth/user/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Reads and updates UserModel fields Accepts GET, PUT, PATCH methods. Default accepted fields: username, first_name, last_name Default display fields: pk, username, email, first_name, last_name Read-only fields: pk, email Returns UserModel fields.
     *
     * @tags dj-rest-auth
     * @name DjRestAuthUserUpdate
     * @request PUT:/dj-rest-auth/user/
     * @secure
     */
    djRestAuthUserUpdate: (data: UserDetails, params: RequestParams = {}) =>
      this.request<UserDetails, any>({
        path: `/dj-rest-auth/user/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Reads and updates UserModel fields Accepts GET, PUT, PATCH methods. Default accepted fields: username, first_name, last_name Default display fields: pk, username, email, first_name, last_name Read-only fields: pk, email Returns UserModel fields.
     *
     * @tags dj-rest-auth
     * @name DjRestAuthUserPartialUpdate
     * @request PATCH:/dj-rest-auth/user/
     * @secure
     */
    djRestAuthUserPartialUpdate: (data: PatchedUserDetails, params: RequestParams = {}) =>
      this.request<UserDetails, any>({
        path: `/dj-rest-auth/user/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  schema = {
    /**
     * @description OpenApi3 schema for this API. Format can be selected via content negotiation. - YAML: application/vnd.oai.openapi - JSON: application/vnd.oai.openapi+json
     *
     * @tags schema
     * @name SchemaRetrieve
     * @request GET:/schema/
     * @secure
     */
    schemaRetrieve: (
      query?: {
        format?: 'json' | 'yaml';
        lang?:
          | 'af'
          | 'ar'
          | 'ar-dz'
          | 'ast'
          | 'az'
          | 'be'
          | 'bg'
          | 'bn'
          | 'br'
          | 'bs'
          | 'ca'
          | 'cs'
          | 'cy'
          | 'da'
          | 'de'
          | 'dsb'
          | 'el'
          | 'en'
          | 'en-au'
          | 'en-gb'
          | 'eo'
          | 'es'
          | 'es-ar'
          | 'es-co'
          | 'es-mx'
          | 'es-ni'
          | 'es-ve'
          | 'et'
          | 'eu'
          | 'fa'
          | 'fi'
          | 'fr'
          | 'fy'
          | 'ga'
          | 'gd'
          | 'gl'
          | 'he'
          | 'hi'
          | 'hr'
          | 'hsb'
          | 'hu'
          | 'hy'
          | 'ia'
          | 'id'
          | 'ig'
          | 'io'
          | 'is'
          | 'it'
          | 'ja'
          | 'ka'
          | 'kab'
          | 'kk'
          | 'km'
          | 'kn'
          | 'ko'
          | 'ky'
          | 'lb'
          | 'lt'
          | 'lv'
          | 'mk'
          | 'ml'
          | 'mn'
          | 'mr'
          | 'ms'
          | 'my'
          | 'nb'
          | 'ne'
          | 'nl'
          | 'nn'
          | 'os'
          | 'pa'
          | 'pl'
          | 'pt'
          | 'pt-br'
          | 'ro'
          | 'ru'
          | 'sk'
          | 'sl'
          | 'sq'
          | 'sr'
          | 'sr-latn'
          | 'sv'
          | 'sw'
          | 'ta'
          | 'te'
          | 'tg'
          | 'th'
          | 'tk'
          | 'tr'
          | 'tt'
          | 'udm'
          | 'uk'
          | 'ur'
          | 'uz'
          | 'vi'
          | 'zh-hans'
          | 'zh-hant';
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, any>({
        path: `/schema/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersList
     * @request GET:/users/
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/users/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersCreate
     * @request POST:/users/
     * @secure
     */
    usersCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRetrieve
     * @request GET:/users/{id}/
     * @secure
     */
    usersRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdate
     * @request PUT:/users/{id}/
     * @secure
     */
    usersUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersPartialUpdate
     * @request PATCH:/users/{id}/
     * @secure
     */
    usersPartialUpdate: (id: number, data: PatchedUser, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersDestroy
     * @request DELETE:/users/{id}/
     * @secure
     */
    usersDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
}
