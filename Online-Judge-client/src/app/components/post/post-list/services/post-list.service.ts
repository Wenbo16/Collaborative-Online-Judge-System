import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Post } from '../../model/post.model';

@Injectable()
export class  PostListService {
	private _postSource = new BehaviorSubject<Post[]>([]);

	constructor(private http: Http) { }

	getPosts(id: number): Observable<Post[]> {

	    return this.http
	               // .get('api/posts')
	               .get(`api/v1/problems/discuss/${id}`)
	               .map((res:Response) => {
	                   return res.json();
	               })
	               .catch((error:any) => Observable.throw(error || 'Server error'));
					// this.http.get(`api/v1/problems`)
					//    .toPromise()
					//    .then((res: Response) => {
					//        this._problemSource.next(res.json())   // 接受更新
					//    })
					//    .catch(this.handleError)
					// return this._problemSource.asObservable();
	}


	private handleError(error: any): Promise<any> {
		console.error('An error happened', error);
		return Promise.reject(error.body || error);
	}
}
