import React, { useState } from "react";
import Button from '@mui/material/Button';

export default function Review({ text, maxLength }) {
  const [showMore, setShowMore] = useState(false);

  const displayText = showMore ? text : String(text).substring(0,250)
  console.log(displayText)

  return (
    <div>
        {showMore?text:<p>{displayText}......</p>}
        <Button variant="text" onClick={() => setShowMore(!showMore)}>{showMore? <span>Show Less</span>:<span>Show More</span>}</Button >

    </div>
  );
}