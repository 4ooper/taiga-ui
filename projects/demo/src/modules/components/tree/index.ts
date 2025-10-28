import {Component} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {DemoRoute} from '@demo/routes';
import {TuiDemo} from '@demo/utils';

@Component({
    imports: [TuiDemo],
    templateUrl: './index.html',
    changeDetection,
})
export default class Page {
    protected readonly example5 = {
        TypeScript: import('./examples/5/index.ts?raw', {with: {loader: 'text'}}),
        HTML: import('./examples/5/index.html'),
        LESS: import('./examples/5/index.less'),
        'content.ts': import('./examples/5/content.ts?raw', {with: {loader: 'text'}}),
        'content.less': import('./examples/5/content.less'),
    };

    protected readonly routes = DemoRoute;
}
