import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';

import {AppModule} from './app.module';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './component/app/app.component';
import {AppShellComponent} from './component/app-shell/app-shell.component';

const routes: Routes = [{path: 'shell', component: AppShellComponent}];

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        RouterModule.forRoot(routes),
    ],
    bootstrap: [AppComponent],
    declarations: [AppShellComponent],
})
export class AppServerModule {
}
