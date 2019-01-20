import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Button from "../src/Button";

const label = "This is a Button";

storiesOf("Button", module)
  .add("with text", () => <Button onClick={action("click")}>{label}</Button>)
  .add("with emojis", () => (
    <Button onClick={action("click")}>😀 😎 👍 💯</Button>
  ))
  .add("with emoji and text", () => (
    <Button onClick={action("click")}>😀 {label} 💯</Button>
  ));
