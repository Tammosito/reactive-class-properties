import { Observable, BehaviorSubject } from "rxjs";

export type ReactivePropertyOptions = {
	initialValue?: any;
};

const defaultOptions: ReactivePropertyOptions = {
	initialValue: undefined
};

export function ReactiveProperty(options?: ReactivePropertyOptions) {
	return function<T, K extends keyof T>(target: T, prop: K) {
		const { initialValue } = { ...defaultOptions, ...options };
		
		const boxed_prop = Symbol(`$$boxed_value__${prop}`);

		Object.defineProperty(target, prop, <PropertyDescriptor>{
			enumerable: true,
			configurable: false,
			get(): Observable<T[K]> {
				if (!this[boxed_prop]) {
					this[boxed_prop] = new BehaviorSubject<T[K]>(initialValue);
				}
				// return "read-only" observable of value instead of the behavior subject
				return this[boxed_prop].asObservable();
			},
			set(value: T[K]): void {
				if (!this[boxed_prop]) {
					this[boxed_prop] = new BehaviorSubject<T[K]>(initialValue);
				}
				// set next value, will notify all subscribers about changes
				this[boxed_prop].next(value);
			}
		});
	};
}
