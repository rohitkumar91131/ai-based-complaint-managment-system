import Input from "../common/Input";

export default function ComplaintField({ register, name, label, type = "text", ...props }) {
  return <Input label={label} type={type} {...register(name)} {...props} />;
}