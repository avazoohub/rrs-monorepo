'use client'

import React from "react";
import style from "./ToggleSwitch.module.css";

type Props = {
	label: string,
	index: number,
	onToggle: (enabled: boolean, index: number) => void
}

export default function ToggleSwitch({ label, index, onToggle }: Props) {

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onToggle(event.target.checked, index);
	};

	return (
		<div className={`${style.container}`}>
			<div className={`${style.toggleSwitch}`}>
				<input
					type="checkbox"
					className={`${style.checkbox}`}
					name={label}
					id={label}
					onChange={handleChange}
				/>
				<label className={`${style.label}`} htmlFor={label}>
					<span className={`${style.inner}`} />
					<span className={`${style.switch}`} />
				</label>
			</div>
		</div>
	);
};


