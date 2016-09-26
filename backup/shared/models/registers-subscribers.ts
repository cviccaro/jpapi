import { Subscription } from 'rxjs/Rx';

export interface RegistersSubscribers {
	_subscriptions: Subscription[];
	registerSubscriber?(sub: Subscription): void;
	ngOnDestroy(): void;
}
