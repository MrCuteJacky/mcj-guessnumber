import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GuessnumberComponent} from './component/guessnumber/guessnumber.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: GuessnumberComponent
                }
            ]
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
