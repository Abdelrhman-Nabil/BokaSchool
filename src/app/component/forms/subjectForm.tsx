"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../comp/inputField";
import Image from "next/image";
import { subjectSchema ,SubjectSchema} from "@/lib/formValidationSchemas";

const SubjectForm = ({
    type,
    data,
}: {
    type: "create" | "update";
    data?: any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubjectSchema>({
        resolver: zodResolver(subjectSchema),
    });
    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });
      console.log(type)
    return (

        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-lg font-semibold ">{type ==="create"?"Create a New Subject":"Update Subject"}</h1>
            <span className="text-sm text-gray-400 font-medium">
                Subject Information</span>
            <div className="flex  flex-wrap gap-8">
                <InputField
                    label="Subject Name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name}
                />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                <label className="text-xs text-gray-500">Teacher</label>

                <select className="ring-[1.5px]
         ring-gray-300 p-2 rounded-md text-sm w-full" {...register("teachers")}
                    defaultValue={data?.teacher}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                {errors.teachers?.message && <p className="text-xs text-red-400">{errors.teachers?.message.toString()}</p>}

            </div>

            </div>
            
            <button className="bg-blue-400 text-white p-2 rounded-md ">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}
export default SubjectForm