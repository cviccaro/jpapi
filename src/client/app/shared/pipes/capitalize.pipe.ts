import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
	transform(value: string, args: any[]): string {
		console.log('Transform this value to capitalized: ', value);

		if ( !value ) return value;

		return value.charAt(0).toUpperCase() + value.substr(1);
	}
}
