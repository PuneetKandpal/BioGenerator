import React from "react";

function CopyLabel({ text }: { text: string }) {
  const [label, setLabel] = React.useState("copy");

  async function copyBioToClipboard() {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.log("failed to copy the text.");
    }
  }

  function handleClick() {
    copyBioToClipboard();
    setLabel("copied");
    setTimeout(() => {
      setLabel("copy");
    }, 3000);
  }
  return (
    <button
      onClick={handleClick}
      className="text-sm text-white bg-gray-900 my-0 w-16 h-auto rounded-none border border-primary/20 border-t-0 rounded-b-lg hover:text-primary-foreground  pb-0.5 "
    >{label}</button>
  );
}

export default CopyLabel;
