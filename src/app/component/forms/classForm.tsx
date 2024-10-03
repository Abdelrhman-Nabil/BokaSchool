"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../comp/inputField";
import { classSchema, ClassSchema } from "@/lib/formValidationSchemas";

const ClassForm = ({
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
    } = useForm<ClassSchema>({
        resolver: zodResolver(classSchema),
    });
    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });
    console.log(type)
    return (

        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-lg font-semibold ">{type === "create" ? "Create a New Subject" : "Update Subject"}</h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Subject Name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name}
                />
                <InputField
                    label="Capacity"
                    name="capacity"
                    defaultValue={data?.capacity}
                    register={register}
                    error={errors?.capacity}
                />
                <InputField
                    label="Id"
                    name="id"
                    defaultValue={data?.id}
                    register={register}
                    error={errors?.id}

                />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
                <label className="text-xs text-gray-500">Sex</label>

                <select className="ring-[1.5px]
         ring-gray-300 p-2 rounded-md text-sm w-full" {...register("supervisorId")}
                    defaultValue={data?.teacher}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                {errors.supervisorId?.message && <p className="text-xs text-red-400">{errors.supervisorId?.message.toString()}</p>}

            </div>

            <button className="bg-blue-400 text-white p-2 rounded-md ">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}
export default ClassForm