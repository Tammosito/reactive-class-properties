# reactive-class-properties
[![npm](https://img.shields.io/npm/v/reactive-class-properties.svg)](https://npm.im/reactive-class-properties)

Make your class properties observable.


## Installation
`npm install --save reactive-class-properties`

Make sure to install the peer dependencies:

`npm install rxjs@^6.0.0`

## Usage

### Usage with Angular Inputs
Converts a regular Component Input into an rxjs Observable. Tested with Angular 7.1 and Typescript 1.3.

```ts
import { Component, Input } from '@angular/core';
import { ReactiveProperty } from 'reactive-class-properties';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-title',
  template: `hello {{ title | async }}`,
})
export class TitleComponent {
	@Input()
	@ReactiveProperty()
	title: Observable<string>;
}

```
