import React, { useEffect, useState } from "react";
import emojiMata from '../assets/emojimata.png'
import emojiCart from '../assets/emojiCart.png'
import emojiProduk from '../assets/emojiProduk.png'

function StatistikAngka({ title, value, emoji}) {
  const [src, setSrc] = useState("")
  useEffect(()=>{
    if(emoji === "emojiMata"){
      setSrc(emojiMata)
    } else if (emoji === "emojiCart"){
      setSrc(emojiCart)
    } else{
      setSrc(emojiProduk)
    }
  }, [])
  return (
    <div className="flex items-center gap-3 bg-white p-2 lg:p-4 shadow rounded">
      <img className="hidden md:h-7 md:inline" src={src} alt="emoji"></img>
      {/* <div className="hidden md:text-3xl md:inline">{emote}</div> */}
      <div className="flex flex-col justify-between">
        <p className="text-sm text-gray-700">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

export default StatistikAngka;
