import React from "react";

type ContainerProps = {
  children: any;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="relative">{children}</div>;
};

export default Container;
