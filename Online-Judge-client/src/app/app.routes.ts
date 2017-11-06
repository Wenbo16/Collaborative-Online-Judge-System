import { Routes, RouterModule } from '@angular/router';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { PostDetailMainComponent } from './components/post/post-detail-main/post-detail-main.component';


const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'}, // if nothing after 4200 },
	{ path: 'dashboard',  component: DashboardComponent },
    { path: 'problems', component: ProblemListComponent },
    { path: 'problems/new', component: NewProblemComponent },
    { path: 'problems/:id', component: ProblemDetailComponent, canActivate: ['authGuard'] },

    // { path: 'problems/:id/discuss/page/1', component: PostListComponent, canActivate: ['authGuard'] },
    { path: 'problems/discuss/:id', component: PostListComponent, canActivate: ['authGuard'] },
    { path: 'problems/:id/discuss/page/:page', component: PostListComponent, canActivate: ['authGuard'] },
    { path: 'problems/:id/discuss/postdetail/:postId',  component: PostDetailMainComponent, canActivate: ['authGuard'] },
    { path: '**', redirectTo: 'problems' }  // not matched path
];

export const routing = RouterModule.forRoot(routes);
