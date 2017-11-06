import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Problem }  from '../models/problem.model';

@Injectable()
export class  ProblemSearchService {

	constructor(private http: Http) {}

	search(term: string): Observable<Problem[]> {
		let a =  {
		    id: 2,
		    name: "3Sum",
		    desc: `Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.`,
		    difficulty: "medium"
		};
		let b = [a];
		let params = new URLSearchParams();
		params.set('name',String(term));
		// return this.http
		//            .get(`/api/v1/problems`)
		//            .map(response => response.json() as Problem[])
		// 		   .filter(ev=>ev.name===32);

		return  this.http
		   			.get(`/api/v1/problems`,{search:params})
					.map(response => response.json() as Problem[]);
		}
}
