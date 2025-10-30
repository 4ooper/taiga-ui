import {inject, Pipe, type PipeTransform} from '@angular/core';
import {TuiDocPage, type TuiRawLoaderContent} from '@taiga-ui/addon-doc';

import {toKebab} from './kebab.pipe';

const EMPTY = {default: ''};

@Pipe({
    standalone: true,
    name: 'tuiExample',
})
export class TuiExamplePipe implements PipeTransform {
    private readonly page = inject(TuiDocPage);

    public transform(
        index: number,
        formats:
            | 'html,less'
            | 'html,ts,less'
            | 'html,ts'
            | 'html'
            | 'ts' = 'html,ts,less',
        additionalFiles?: Record<string, TuiRawLoaderContent>,
    ): Record<string, TuiRawLoaderContent> {
        const directory = `${this.page.type}/${toKebab(this.page.header)}/examples/${index}`;
        const ts = import(`../modules/${directory}/index.ts`, {
            with: {loader: 'text'},
        }).catch(() => EMPTY);

        return Object.fromEntries(
            formats
                .split(',')
                .map((format) => [
                    format === 'ts' ? 'TypeScript' : format.toUpperCase(),
                    format === 'ts' ? ts : load(`${directory}/index.${format}`),
                ])
                .concat(additionalFiles ? Object.entries(additionalFiles) : [])
                .map(([name, content]) => [
                    name,
                    content && typeof content !== 'string'
                        ? // During server side rendering it ignores attributes imports for `.ts` files and loads its class instead of file content
                          content.then((x) => (typeof x.default === 'string' ? x : EMPTY))
                        : content,
                ]),
        );
    }
}

async function load(path: string): Promise<{default: string}> {
    try {
        return await import(/* @vite-ignore */ `../modules/${path}`);
    } catch {
        return EMPTY;
    }
}
