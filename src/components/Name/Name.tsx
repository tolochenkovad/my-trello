import React from "react";
import { resType } from "../../index";

type NameProps = {
  name: resType['name'],
}

const Name: React.FC<NameProps> = ({ name }) => {
  return <div>{name}</div>;
};

export default Name;
