import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
    constructor(private http: Http) { }

    private _problemSource = new BehaviorSubject<Problem[]>([]);
    getProblems(): Observable<Problem[]> {
        this.http.get(`api/v1/problems`)
            .toPromise()
            .then((res: Response) => {
                this._problemSource.next(res.json())   // 接受更新
            })
            .catch(this.handleError)
        return this._problemSource.asObservable();
    }

    private _topProblems = new BehaviorSubject<Problem[]>([]);
    getTopProblems(): Observable<Problem[]> {
        this.http.get(`api/v1/top-problems`)
            .toPromise()
            .then((res: Response) => {
                this._topProblems.next(res.json())   // 接受更新
            })
            .catch(this.handleError)
        return this._topProblems.asObservable();
    }

	// getProblems():Observable<Problem[]> {
	// 	return this.http.get(`api/v1/problems`)
	// 			   // .toPromise()  // converted the Observable to a Promise
	// 			   // The response JSON has a single data property, which holds the  heroes
	// 			   // Adjust the code to match your web API.
	// 			   .map(response => response.json().data as Observable<Problem[]>)
	// 			   .catch((error:any) => Observable.throw(error || 'Server error'));
	// }

    getProblem(id: number): Promise<Problem> {
        // return PROBLEMS.find((problem) => problem.id === id );
        // return this.problems.find((problem) => problem.id === id );
        return  this.http.get(`api/v1/problems/${id}`)
                    .toPromise()
                    .then((res: Response) => res.json())
                    .catch(this.handleError);
    }


    private headers = new Headers({'content-Type': 'application/json'});

    addProblem(newProblem: Problem) {
        // newProblem.id = this.problems.length + 1;
        // this.problems.push(newProblem);
        return this.http.post('api/v1/problems', newProblem, this.headers)
                        .toPromise()
                        .then((res: Response) => {
                            this.getProblems(); // becuase we need one more problem to display
                            res.json();  //没用？
                        })
                        .catch(this.handleError);
    }



    delete(id: number): Promise<void> {
        const url = `api/v1/problems/delete/${id}`;
        return  this.http.delete(url, {headers: this.headers})
                    .toPromise()
                    .then(() => null)
                    .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error happened', error);
        return Promise.reject(error.body || error);
    }


}
