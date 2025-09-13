import {AsyncPipe} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {
    TuiError,
    TuiGroup,
    TuiHint,
    TuiIcon,
    TuiSelectLike,
    TuiTextfield,
} from '@taiga-ui/core';
import {
    TuiDataListWrapper,
    TuiFieldErrorPipe,
    TuiInputChip,
    TuiMultiSelect,
    TuiTooltip,
} from '@taiga-ui/kit';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

@Component({
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        TuiDataListWrapper,
        TuiError,
        TuiFieldErrorPipe,
        TuiGroup,
        TuiHint,
        TuiInputModule,
        TuiTooltip,
        TuiInputChip,
        TuiTextfieldControllerModule,
        TuiTextfield,
        TuiIcon,
        TuiSelectLike,
        TuiMultiSelect,
    ],
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    encapsulation,
    changeDetection,
})
export default class Example {
    protected readonly items = ['Option 1', 'Option 2', 'Option 3'];

    protected testForm = new FormGroup({
        testValue: new FormControl('', Validators.required),
        multiSelectControl: new FormControl<string[]>([], Validators.required),
        testValue3: new FormControl('', Validators.required),
    });
}
