interface InputType {
    label: string,
    placeholder: string,
    type: "string",
    colSpan: number,
    options?: string[]
}

const formsData = {
  first_name: {
    label: "First name",
    placeholder: "Joe",
    type: "text",
    colSpan: 1,
  },
  last_name: {
    label: "Last name",
    placeholder: "Rogan",
    type: "text",
    colSpan: 1,
  },
  address: {
    label: "Address",
    placeholder: "123 Alpine Ridge, Aspen, CO",
    type: "text",
    colSpan: 2,
  },
  birth_date: {
    label: "Birth date",
    placeholder: "YYYY-MM-DD",
    type: "date",
    colSpan: 1,
  },
  tel: {
    label: "Phone number",
    placeholder: "+1(555) 000-0000",
    type: "tel",
    colSpan: 1,
  },
  skiing_level: {
    label: "Skiing level",
    placeholder: "Choose level",
    type: "select",
    colSpan: 1,
    options: ["beginner", "medium", "confirmed"]
  },
  age: {
    label: "Age",
    placeholder: "25",
    type: "number",
    colSpan: 1,
  },
  height: {
    label: "Height",
    placeholder: "180",
    type: "number",
    colSpan: 1,
  },
  weight: {
    label: "Weight",
    placeholder: "75",
    type: "number",
    colSpan: 1,
  },
  shoe_size: {
    label: "Shoe size",
    placeholder: "42",
    type: "number",
    colSpan: 1,
  },
  password: {
    label: "Password",
    placeholder: "pass123!",
    type: "password",
    colSpan: 1,
  },
};

export default formsData;