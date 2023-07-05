import React from "react";

/**
 * Renders the AuthLayout component.
 *
 * @param {Object} props - The props object containing the children prop.
 * @param {ReactNode} props.children - The children to be rendered inside the component.
 * @return {ReactElement} The rendered AuthLayout component.
 */
export default function AuthLayout({ children }) {
  return <main className="h-full">{children}</main>;
}
