import "./Blackjack.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Blackjack({ account }) {
  const navigate = useNavigate();

  if (!account) {
    useEffect(() => {
      navigate("/login");
    });
  }

  return <h1 className="banner">Coming Soon!</h1>;
}
