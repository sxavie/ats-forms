import { Routes } from '@angular/router';
import { TemplateComponent } from './shared/template/template.component';
import { ReactiveComponent } from './shared/reactive/reactive.component';
import { ReactiveSearchComponent } from './shared/reactive-search/reactive-search.component';

export const routes: Routes = [{
    path:   'driven-tamplate',
    component: TemplateComponent
}, {
    path: 'reactive-form',
    component: ReactiveComponent
}, {
    path: 'reactive-search',
    component: ReactiveSearchComponent
}];
