import React, { useState } from "react";
import { Button } from "antd";

export default function CustomButton({ icon, text, block, style, ...props }) {
  const [isGhost, setIsGhost] = useState(true);
  return (
    <>
      <Button
        onMouseOver={() => setIsGhost(false)}
        onMouseOut={() => setIsGhost(true)}
        type="primary"
        style={style}
        ghost={isGhost}
        block={block}
        icon={icon}
        {...props}
      >
        {text}
      </Button>
    </>
  );
}
