import Alert from "react-bootstrap/Alert";

function AdditionalContentExample() {
  return (
    <Alert variant="success">
      <Alert.Heading style={{ textAlign: "center" }}>
        Hey, nice to see you
      </Alert.Heading>
      <p style={{ textAlign: "center" }}>
        We have sent you an email to confirm that it is your own email , please
        login to gmail to confirm !
      </p>
    </Alert>
  );
}

export default AdditionalContentExample;
