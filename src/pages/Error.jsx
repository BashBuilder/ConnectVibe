import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <div>
      Error
      <Button onClick={() => navigate("/")}> Go back Home </Button>
    </div>
  );
}

export default Error;
