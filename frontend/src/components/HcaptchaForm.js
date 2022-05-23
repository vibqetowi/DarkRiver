import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Form } from "react-bootstrap";

export default function HCaptchaForm() {
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef.current.execute();
  };

  useEffect(() => {
    if (token) console.log(`hCaptcha Token: ${token}`);
  }, [token]);

  return (
    <Form id="hcaptcha">
      <HCaptcha
        sitekey="e1ff1047-7739-4914-8b16-a87a99c2e619"
        onLoad={onLoad}
        onVerify={setToken}
        ref={captchaRef}
        theme="dark"
      />
    </Form>
  );
}
