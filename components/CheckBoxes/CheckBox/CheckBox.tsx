import { 
	Content, CheckBoxBody
} from "./components/index";
import { CheckBoxProps } from "./CheckBox.props";

export const CheckBox = ({
	type,
	checked,
	setChecked
}: CheckBoxProps)=> {
	return (
		<CheckBoxBody
			checked={checked}
			setChecked={setChecked}
		>
			<Content
				checked={checked}
				type={type}
			/>
		</CheckBoxBody>
	)
}