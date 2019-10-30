import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

var server = "https://localhost:44300/"

export class ApiOptions {
  ignoreAuth?: boolean; // null means 'false'
  contentType?: string; // undefined means 'application/json', null means not set content type
  parseResponse?: boolean; // null means 'true'
  ignoreAuthError?: boolean; // null means 'false'
  parseError?: boolean; // null means 'true'
}

class ApiResponse<T> {
  data: T;
  success: boolean;
  errors: { [errKey: string]: string; };
}

@Injectable()
export class ApiService {
  constructor(private http: Http) { }

  formatUrl(url: string) {
    return `${server}${url}`;
  }

  get<TResponse>(url: string, options?: ApiOptions): Observable<ApiResponse<TResponse>> {
    return this._get(url, options);
  }

  _get<TResponse>(url: string, options?: ApiOptions): Observable<ApiResponse<TResponse>> {
    return this.http.get(this.formatUrl(url), this.getRequestOptions(options))
      .map(resp => this.extractData(resp, options))
      .catch(err => this.handleError(err, options));
  }

  post<TResponse, TRequest>(url: string, data: TRequest, options?: ApiOptions): Observable<ApiResponse<TResponse>> {
    return this._post(url, data, options);
  }

  _post<TResponse>(url: string, data: any, options?: ApiOptions): Observable<ApiResponse<TResponse>> {
    return this.http.post(this.formatUrl(url), data, this.getRequestOptions(options))
      .map(resp => this.extractData(resp, options))
      .catch(err => this.handleError(err, options));
  }

  put<TResponse>(url: string, data: any, options?: ApiOptions): Observable<ApiResponse<TResponse>> {
    return this._put(url, data, options);
  }

  _put<TResponse>(url: string, data: any, options?: ApiOptions): Observable<ApiResponse<TResponse>> {
    return this.http.put(this.formatUrl(url), data, this.getRequestOptions(options))
      .map(resp => this.extractData(resp, options))
      .catch(err => this.handleError(err, options));
  }

  patch<TResponse>(url: string, data: any, options?: ApiOptions): Observable<ApiResponse<TResponse>> {
    return this._patch(url, data, options);
  }

  _patch<TResponse>(url: string, data: any, options?: ApiOptions): Observable<ApiResponse<TResponse>> {
    return this.http.patch(this.formatUrl(url), data, this.getRequestOptions(options))
      .map(resp => this.extractData(resp, options))
      .catch(err => this.handleError(err, options));
  }

  delete<TResponse>(url: string, options?: ApiOptions): Observable<ApiResponse<TResponse>> {
    return this._delete(url, options);
  }

  _delete<TResponse>(url: string, options?: ApiOptions): Observable<ApiResponse<TResponse>> {
    return this.http.delete(this.formatUrl(url), this.getRequestOptions(options))
      .map(resp => this.extractData(resp, options))
      .catch(err => this.handleError(err, options));
  }

  private getRequestOptions(settings: ApiOptions) {
    let headers = new Headers();
    if (!settings || settings.contentType !== null) { // null means not set content type
      headers.set('Content-Type', (settings && settings.contentType) || 'application/json');
      headers.set('Access-Control-Allow-Origin', '*');
    }

    let options = new RequestOptions({ headers });
    return options;
  }


  private extractData(res: Response, options: ApiOptions) {
    if (!options || options.parseResponse !== false) {
      let body = res.json();
      return body || {};
    }
    return res;
  }

  private handleError(error: Response | any, options: ApiOptions) {
    if (!options || options.parseError !== false) {
      if (error instanceof Response) {
        console.log(error.json());
        return Observable.throw(error.json() || '');
      }
      console.log(error.json());
      return Observable.throw(error);
    }
    console.log(error.json());
    return Observable.throw(error);
  }
}
