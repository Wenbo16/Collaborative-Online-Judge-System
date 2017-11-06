import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';

import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PostListService } from './components/post/post-list/services/post-list.service';
import { CollaborationService } from './services/collaboration.service';


import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

import { routing } from './app.routes';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SiteStatComponent } from './components/site-stat/site-stat.component';
import { SocialChannelComponent } from './components/social-channel/social-channel.component';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { PostDetailMainComponent } from './components/post/post-detail-main/post-detail-main.component';

import { BooleanPipe } from './utils/boolean-pipe';
import { EditorComponent } from './components/editor/editor.component';


// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './components/post/post-list/services/in-memory-data.service';

@NgModule({

	declarations: [
		AppComponent,
		ProblemListComponent,
		ProblemDetailComponent,
		NewProblemComponent,
		NavbarComponent,
		DashboardComponent,
		SiteStatComponent,
		SocialChannelComponent,
		UserInfoComponent,
		PostListComponent,
		PostDetailMainComponent,
		BooleanPipe,
		EditorComponent,
	],

	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
		// InMemoryWebApiModule.forRoot(InMemoryDataService)
	],

	exports: [BooleanPipe],
	providers: [
							{  provide: 'data', useClass: DataService },
							{  provide: 'auth', useClass: AuthService },
							{  provide: 'authGuard', useClass: AuthGuardService},
							{ provide: 'collaboration', useClass: CollaborationService },

							PostListService
							],
	bootstrap: [AppComponent]
})

export class AppModule { }
