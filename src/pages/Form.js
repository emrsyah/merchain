import React from "react";
import { useForm } from "react-hook-form";

export default function Form() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  // console.log(watch("exampleRequired")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} onChange={()=>console.log('first')}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} className="outline" />
      
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} className="outline" />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  );
}