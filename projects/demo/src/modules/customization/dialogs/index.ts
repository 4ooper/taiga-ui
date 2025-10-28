import {Component} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {TuiDemo} from '@demo/utils';

import {TuiDialogsExample1} from './examples/1';
import {TuiDialogsExample2} from './examples/2';

@Component({
    imports: [TuiDemo, TuiDialogsExample1, TuiDialogsExample2],
    templateUrl: './index.html',
    changeDetection,
})
export default class Page {
    protected readonly example1 = {
        TypeScript: import('./examples/1/index.ts?raw', {with: {loader: 'text'}}),
        HTML: import('./examples/1/index.html'),
        LESS: import('./examples/1/index.less'),
        'prompt/prompt.service.ts': import('./examples/1/prompt/prompt.service.ts?raw', {
            with: {loader: 'text'},
        }),
        'prompt/prompt-options.ts': import('./examples/1/prompt/prompt-options.ts?raw', {
            with: {loader: 'text'},
        }),
        'prompt/prompt.component.ts': import(
            './examples/1/prompt/prompt.component.ts?raw',
            {with: {loader: 'text'}}
        ),
        'prompt/prompt.template.html': import('./examples/1/prompt/prompt.template.html'),
        'prompt/prompt.style.less': import('./examples/1/prompt/prompt.style.less'),
    };

    protected readonly example2 = {
        TypeScript: import('./examples/2/index.ts?raw', {with: {loader: 'text'}}),
        HTML: import('./examples/2/index.html'),
        'custom-dialog/custom-dialog.service.ts': import(
            './examples/2/custom-dialog/custom-dialog.service.ts?raw',
            {with: {loader: 'text'}}
        ),
        'custom-dialog/custom-dialog.directive.ts': import(
            './examples/2/custom-dialog/custom-dialog.directive.ts?raw',
            {with: {loader: 'text'}}
        ),
        'custom-dialog/custom-dialog.component.ts': import(
            './examples/2/custom-dialog/custom-dialog.component.ts?raw',
            {with: {loader: 'text'}}
        ),
        'custom-dialog/custom-dialog.style.less': import(
            './examples/2/custom-dialog/custom-dialog.style.less'
        ),
    };
}
