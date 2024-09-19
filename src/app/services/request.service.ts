import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { getBasicError, getDomain, getErrorMessage } from './functions.service';
import { BasicResponse } from '../models/basic-response.model';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(public _http: HttpClient) {

  }
  async get(_url: string, _params: any = {}, _headers: any = undefined): Promise<BasicResponse> {
    try {
      if (_url) {
        _url = _url.includes("http") ? _url : getDomain() + "/" + _url
        let paramsUrl = "";
        if (!_headers) {
          _headers = {}
        }
        _headers = new HttpHeaders(_headers)
        // Recorremos los parametros para convertirlos a parametros de url
        for (const key in _params) {
          if (Object.prototype.hasOwnProperty.call(_params, key)) {
            const value = _params[key];
            paramsUrl += `${key}=${value}&`;
          }
        }
        console.log('parametros url: ', paramsUrl)
        console.log('url: ', _url)

        const result: any =  await firstValueFrom(this._http.get(paramsUrl.length > 0 ? _url.includes("?") ? `${_url}&${paramsUrl.toString()}` : `${_url}?${paramsUrl.toString()}` : `${_url}`, { headers: _headers, withCredentials: true }))
        return new BasicResponse(result.success != undefined ? result.success : true, result.message != undefined ? result.message : "Request success", result.data != undefined ? result.data : result, !result.success ? result : undefined)
      } else {
        console.log(_url)
        return new BasicResponse(false, "No se puede hacer el request a esta url porque está vacía");
      }
    } catch (error) {
     //console.error('ss',error)
      return new BasicResponse(false, getErrorMessage(error), undefined, getBasicError(error))
    }
  }
  async postLikeJSON(_url: string, _params: any, _headers: any = undefined, method: RequestMethod.POST | RequestMethod.PATCH | RequestMethod.PUT = RequestMethod.POST): Promise<BasicResponse> {
    try {
      if (_url) {
        _url = _url.includes("http") ? _url : getDomain() + "/" + _url
        if (_headers) {
          _headers["Content-Type"] = "application/json"
          _headers['Accept']= 'application/json'
        } else {
          _headers = { "Content-Type": "application/json" }
          _headers = { "Accept": "application/json" }
        }
        _headers = new HttpHeaders(_headers)
        let result: any
        switch (method) {
          case RequestMethod.POST: result = await  firstValueFrom(this._http.post(_url, _params, { headers: _headers})); break;
          case RequestMethod.PATCH: result = await firstValueFrom(this._http.patch(_url, _params, { headers: _headers })); break;
          case RequestMethod.PUT: result = await firstValueFrom(this._http.put(_url, _params, { headers: _headers })); break;
        }
        return new BasicResponse(result.process != undefined ? result.process : true, result.message != undefined ? result.message : "Request success", result.data != undefined ? result.data : result, !result.process ? result : undefined)
      } else {
        return new BasicResponse(false, "No se puede hacer el request a esta url porque está vacía");
      }
    } catch (error) {
      console.error(error)
      return new BasicResponse(false, getErrorMessage(error), undefined, getBasicError(error))
    }
  }
  async putLikeJSON(_url: string, _params: any, _headers: any = undefined, method: RequestMethod.POST | RequestMethod.PATCH | RequestMethod.PUT = RequestMethod.PUT): Promise<BasicResponse> {
    try {
      if (_url) {
        _url = _url.includes("http") ? _url : getDomain() + "/" + _url
        if (_headers) {
          _headers["Content-Type"] = "application/json"
          _headers['Accept']= 'application/json'
        } else {
          _headers = { "Content-Type": "application/json" }
          _headers = { "Accept": "application/json" }
        }
        _headers = new HttpHeaders(_headers)
        let result: any
        switch (method) {
          case RequestMethod.POST: result = await firstValueFrom(this._http.post(_url, _params, { headers: _headers })); break;
          case RequestMethod.PATCH: result = await firstValueFrom(this._http.patch(_url, _params, { headers: _headers })); break;
          case RequestMethod.PUT: result = await firstValueFrom(this._http.put(_url, _params, { headers: _headers,withCredentials: true })); break;
        }
        return new BasicResponse(result.success != undefined ? result.success : true, result.message != undefined ? result.message : "Request success", result.data != undefined ? result.data : result, !result.success ? result : undefined)
      } else {
        return new BasicResponse(false, "No se puede hacer el request a esta url porque está vacía");
      }
    } catch (error) {
      console.error(error)
      return new BasicResponse(false, getErrorMessage(error), undefined, getBasicError(error))
    }
  }
  async delete(_url: string, _params: any = {}, _headers: any = undefined): Promise<BasicResponse> {
    try {
        if (_url) {
            _url = _url.includes("http") ? _url : getDomain() + "/" + _url
            let paramsUrl = "";
            if (!_headers) {
                _headers = {}
            }
            _headers = new HttpHeaders(_headers)
            // Recorremos los parametros para convertirlos a parametros de url
            for (const key in _params) {
                if (Object.prototype.hasOwnProperty.call(_params, key)) {
                    const value = _params[key];
                    paramsUrl += `${key}=${value}&`;
                }
            }
            const result: any = await firstValueFrom(this._http.delete(`${_url}?${paramsUrl.toString()}`, {
                headers: _headers,withCredentials: true
            }))
            return new BasicResponse(result.success != undefined ? result.success : true, result.message != undefined ? result.message : "Request success", result.data != undefined ? result.data : result, !result.success ? result : undefined)
        } else {
            console.log(_url)
            return new BasicResponse(false, "No se puede hacer el request a esta url porque está vacía");
        }
    } catch (error) {
        console.error(error)
        return new BasicResponse(false, getErrorMessage(error), undefined, getBasicError(error))
    }
}
}

export enum RequestMethod {
  GET = "GET", POST = "POST", PUT = "PUT", PATCH = "PATCH", DELETE = "DELETE"
}