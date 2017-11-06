import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ProblemSearchService } from '../../services/problem-search.service';
import { Problem } from '../../models/problem.model';


import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css'],
  providers: [ProblemSearchService]
})


export class ProblemListComponent implements OnInit {
	problems: Problem[];
	selectedProblem: Problem;
	subscriptionProblems: Subscription;
	searchTerms = new Subject<string>();
	searchProblems: Observable<Problem[]>;
	title = "Online Judge System";

	constructor(
		@Inject('data') private dataService,
		@Inject('authGuard') private authGuardService,
	    private http: Http,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private problemSearchService: ProblemSearchService,
	) { }

	ngOnInit() {
		this.getProblems();
		this.activeRoute.params.subscribe(params => {
  			// 这里可以从路由里面获取URL参数
			this.dataService.getProblems().subscribe(
				problems => this.searchProblems = Observable.of<Problem[]>(problems));
   		});

		this.searchTerms
			.debounceTime(300)        // wait 300ms after each keystroke before considering the term
			.distinctUntilChanged()   // ignore if next search term is same as previous
			.switchMap(term => term   // switch to new observable each time the term changes
				? this.problemSearchService.search(term)
				: Observable.of<Problem[]>(this.problems))
			.subscribe(problems => this.searchProblems = Observable.of<Problem[]>(problems));
	}

	getProblems(): void{
		this.dataService.getProblems().subscribe(problems => this.problems = problems);
	}
	// getProblems(): void{
	//   // this.problems = this.dataService.getProblems();
	//   this.subscriptionProblems = this.dataService.getProblems()
	// 	.subscribe(problems => this.problems = problems);
	// }

	onSelect(problem: Problem): void {
		this.selectedProblem = problem;
	}

	gotoDetail(): void {
		this.router.navigate(['/problems', this.selectedProblem.id]);
	}

	search(term: string): void {
		this.searchTerms.next(term);
	}

	toAddPage(){
		this.router.navigate(['/problems/new']);
	}


	delete(problem: Problem): void {
		this.dataService
		    .delete(problem.id)
		    .then(() => {
				this.problems = this.problems.filter(p => p !== problem);
				if (this.selectedProblem === problem) { this.selectedProblem = null; }
				
		    });
		location.reload();
	}

}
