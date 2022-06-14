import { RadioGroup } from "@headlessui/react";
import { Icon } from "@iconify/react";
import React from "react";

function ColorThemeRadio({color, setColor, setIsChange}) {

  const changeColorHandler = (value) =>{
    setColor(value)
    setIsChange(true)
  }

  return (
    <RadioGroup value={color} onChange={(value)=>changeColorHandler(value)} as="div" className="flex items-center gap-4">
      {/* <RadioGroup.Label>Plan</RadioGroup.Label> */}
      <RadioGroup.Option value="purple">
        {({ checked }) => (
          <div className={`w-11 h-11 text-white hover:bg-purple-700 cursor-pointer rounded-full  bg-purple-600 flex items-center justify-center`}>
            {checked && <Icon icon="bi:check-lg"  width={28}/>}
          </div>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="red">
        {({ checked }) => (
          <div className={`w-11 h-11 text-white hover:bg-red-700 cursor-pointer rounded-full  bg-red-600 flex items-center justify-center`}>
            {checked && <Icon icon="bi:check-lg"  width={28}/>}
          </div>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="blue">
        {({ checked }) => (
          <div className={`w-11 h-11 text-white hover:bg-blue-700 cursor-pointer rounded-full  bg-blue-600 flex items-center justify-center`}>
            {checked && <Icon icon="bi:check-lg"  width={28}/>}
          </div>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="green">
        {({ checked }) => (
          <div className={`w-11 h-11 text-white hover:bg-green-700 cursor-pointer rounded-full  bg-green-600 flex items-center justify-center`}>
            {checked && <Icon icon="bi:check-lg"  width={28}/>}
          </div>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="yellow">
        {({ checked }) => (
          <div className={`w-11 h-11 text-white hover:bg-yellow-500 cursor-pointer rounded-full  bg-yellow-400 flex items-center justify-center`}>
            {checked && <Icon icon="bi:check-lg"  width={28}/>}
          </div>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="orange">
        {({ checked }) => (
          <div className={`w-11 h-11 text-white hover:bg-orange-700 cursor-pointer rounded-full  bg-orange-600 flex items-center justify-center`}>
            {checked && <Icon icon="bi:check-lg"  width={28}/>}
          </div>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
}

export default ColorThemeRadio;
