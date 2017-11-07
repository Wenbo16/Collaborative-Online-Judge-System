import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	topProblems: Problem[] = [];
	title = 'Online Judge System!';
	constructor(@Inject('data') private dataService) { }

	ngOnInit() {
		this.dataService.getTopProblems()
			.subscribe(topProblems => this.topProblems = topProblems);
	}
}
