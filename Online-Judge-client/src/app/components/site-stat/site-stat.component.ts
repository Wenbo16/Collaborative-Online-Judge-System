import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-site-stat',
	templateUrl: './site-stat.component.html',
	styleUrls: ['./site-stat.component.css']
})


export class SiteStatComponent implements OnInit {
	public currentTime: Date = new Date();

	constructor() {
		window.setInterval(
			()=>this.currentTime = new Date()
		,1000);
	}
	ngOnInit() {
	}
}
