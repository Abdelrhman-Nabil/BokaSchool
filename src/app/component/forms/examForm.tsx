"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../comp/inputField";
import { ExamSchema,examSchema } from "@/lib/formValidationSchemas";

const ExamForm = ({
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
    } = useForm<ExamSchema>({
        resolver: zodResolver(examSchema),
    });
    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });
    console.log(data)
    return (

        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-lg font-semibold ">{type === "create" ? "Create a New Subject" : "Update Subject"}</h1>
            <div className="flex justify-between flex-wrap gap-4">
            <InputField
          label="Exam title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Start Date"
          name="startTime"
          defaultValue={data?.startTime}
          register={register}
          error={errors?.startTime}
          type="datetime-local"
        />
        <InputField
          label="End Date"
          name="endTime"
          defaultValue={data?.endTime}
          register={register}
          error={errors?.endTime}
          type="datetime-local"
        />
                <InputField
          label="Lesson"
          name="lessonId"
          defaultValue={data?.lessonId}
          register={register}
          error={errors?.lessonId}
          type="number"
        />
            </div>

            <button className="bg-blue-400 text-white p-2 rounded-md ">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}
export default ExamForm