import { Form } from "react-bootstrap";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import SButton from "../../components/Button";

const Sform = ({ form, isLoading, handleChange, handleSubmit }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <TextInputWithLabel type={"email"} value={form.email} placeholder={"Enter email"} name={"email"} label={"Email Address"} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <TextInputWithLabel type={"password"} value={form.password} placeholder={"Password"} name={"password"} label={"Password"} onChange={handleChange} />
      </Form.Group>
      <SButton loading={isLoading} disabled={isLoading} variant="primary" type="submit" action={handleSubmit}>
        Submit
      </SButton>
    </Form>
  );
}

export default Sform;