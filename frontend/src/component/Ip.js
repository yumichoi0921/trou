import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Ip() {
  const [ip, setIp] = useState("");

  useEffect(() => {
    axios.get("/ip").then((response) => {
      console.log(response);
      setIp(response.data);
    });
  }, []);

  return <p> 이 기기의 ip 주소는 {ip}입니다.</p>;
}
