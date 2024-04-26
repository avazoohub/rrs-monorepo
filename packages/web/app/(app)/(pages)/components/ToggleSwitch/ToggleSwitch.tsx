'use client'

import React from "react";
import style from "./ToggleSwitch.module.css";

type Props = {
	status: boolean | undefined,
	label: string,
	index: any,
	onToggle: (enabled: boolean, index: number) => void
}

export default function ToggleSwitch({ status, label, index, onToggle }: Props) {

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onToggle(event.target.checked, index);
	};


	return (
		<div className={`${style.container}`}>
			<div className={`${style.toggleSwitch}`}>
				{status !== undefined && <>
					<input
						type="checkbox"
						className={`${style.checkbox}`}
						name={label}
						id={label}
						onChange={handleChange}
						defaultChecked={status}
					/>
					<label className={`${style.label}`} htmlFor={label}>
						<span className={`${style.inner}`} />
						<span className={`${style.switch}`} />
					</label>
				</>}
			</div>
		</div>
	);
};


