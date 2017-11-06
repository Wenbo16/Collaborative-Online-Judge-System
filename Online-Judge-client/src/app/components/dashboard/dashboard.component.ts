import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	problems: Problem[] = [];
	title = 'Online Judge System!';
	constructor(@Inject('data') private dataService) { }

	ngOnInit() {
		this.dataService.getProblems()
			.subscribe(problems => this.problems = problems.slice(1,5));
	}
}
