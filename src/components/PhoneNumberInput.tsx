import { forwardRef, type ChangeEvent } from 'react';

type PhoneNumberInputProps = {
	onChange?: (
		event: ChangeEvent<HTMLInputElement>,
		formattedNumber: string,
		number: string
	) => void;
};

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(
	({ onChange }, ref) => {
		const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
			const number = event.target.value.replace(/\D/g, '');

			const formattedNumber = number
				.slice(0, 10)
				.replace(/(\d{0,3})(\d{0,3})?(\d{0,4})?/, (_, p1, p2, p3) =>
					p3 ? `(${p1})${p2}-${p3}` : (p2 && `(${p1})${p2}`) || p1
				);

			event.target.value = formattedNumber;

			if (onChange) {
				onChange(event, formattedNumber, number);
			}
		};

		return <input ref={ref} type="tel" onChange={handleChange} />;
	}
);

export default PhoneNumberInput;

// вариант с сохранением курсора
// export default function PhoneNumberInput() {
// 	const inputRef = useRef<HTMLInputElement>(null);
// 	const cursorPosRef = useRef(0);

// 	const formatNumber = (number: string): string => {
// 		const clearedNumber = number.replace(/\D/g, '');

// 		if (clearedNumber.length === 0) return '';
// 		if (clearedNumber.length < 4) return clearedNumber;
// 		if (clearedNumber.length < 7) {
// 			return `(${clearedNumber.slice(0, 3)})${clearedNumber.slice(3)}`;
// 		}

// 		return `(${clearedNumber.slice(0, 3)})${clearedNumber.slice(
// 			3,
// 			6
// 		)}-${clearedNumber.slice(6, 10)}`;
// 	};

// 	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
// 		const current = inputRef.current;
// 		const inputValue = event.target.value;
// 		cursorPosRef.current = event.target.selectionStart || 0;

// 		if (current) {
// 			const formatted = formatNumber(inputValue);
// 			current.value = formatted;

// 			setTimeout(() => {
// 				current.setSelectionRange(
// 					cursorPosRef.current,
// 					cursorPosRef.current
// 				);
// 			}, 0);
// 		}
// 	};

// 	return <input ref={inputRef} type="tel" onChange={handleChange} />;
// }
