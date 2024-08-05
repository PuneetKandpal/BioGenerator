"use client";

import React, { Key, useContext, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slider } from "@nextui-org/slider";
import { Select, SelectItem } from "@nextui-org/select";
import MetaIcon from "./icons/meta";
import MistralIcon from "./icons/mistral";
import { Tooltip } from "@nextui-org/tooltip";
import { Info } from "lucide-react";
import { Textarea } from "@nextui-org/input";
import Label from "./lable";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { SwitchMagic } from "./magicui/switch";
import { generateBio } from "@/app/action";
import { BioContext } from "@/context/bio-context";
import { motion } from "framer-motion";

const formSchema = z.object({
  model: z.string().min(1, "Model is required"),
  temperature: z
    .number()
    .min(0.1, "Temperature must be at least 0")
    .max(2, "Temperature must be less than 2"),
  content: z
    .string()
    .min(50, "Content should have at least 50 characters")
    .max(2000, "Content should have less than 2000 characters"),
  type: z.enum(["Personal", "Brand"], {
    errorMap: () => ({ message: "Type is required" }),
  }),
  tone: z.enum(
    [
      "Professional",
      "Casual",
      "Sarcastic",
      "Funny",
      "Passionate",
      "Thoughtful",
    ],
    { errorMap: () => ({ message: "Type is required" }) }
  ),
  emojis: z.boolean(),
});

const Models = [
  {
    icons: <MetaIcon className="size-5" />,
    label: "Llama 3.1",
    weight: "70B",
    value: "llama-3.1-70b-versatile",
  },
  {
    icons: <MetaIcon className="size-5" />,
    label: "Llama 3.1",
    weight: "8B",
    value: "llama-3.1-8b-instant",
  },
  {
    icons: <MistralIcon className="size-5" />,
    label: "Mixtral",
    weight: "8x7B",
    value: "mixtral-8x7b-32768",
  },
  {
    icons: <MetaIcon className="size-5" />,
    label: "Llama 3",
    weight: "70B",
    value: "llama3-70b-8192",
  },
  {
    icons: <MetaIcon className="size-5" />,
    label: "Llama 3",
    weight: "8B",
    value: "llama3-8b-8192",
  },
];

const Types = [
  {
    label: "Personal",
    value: "Personal",
  },
  {
    label: "Brand",
    value: "Brand",
  },
];

const Tones = [
  {
    label: "Professional",
    value: "Professional",
  },
  {
    label: "Casual",
    value: "Casual",
  },
  {
    label: "Sarcastic",
    value: "Sarcastic",
  },
  {
    label: "Funny",
    value: "Funny",
  },
  {
    label: "Passionate",
    value: "Passionate",
  },
  {
    label: "Thoughtful",
    value: "Thoughtful",
  },
];

function UserInput() {
  const [checked, setChecked] = useState(false);
  const { loading, setOutput, setLoading } = useContext(BioContext);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "llama-3.1-70b-versatile",
      temperature: 1.22,
      content: "",
      type: "Personal",
      tone: "Professional",
      emojis: false,
    },
    mode: "onBlur",
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const userInputValue = `
    user: ${data.content},
    Bio Type: ${data.type},
    Bio Tone: ${data.tone},
    Add Emojis: ${data.emojis},
    `;

    setLoading(true);
    try {
      const response = await generateBio(
        userInputValue,
        data.temperature,
        data.model
      );
      if (response.status === "failed" || !response.data) {
        return;
      }
      setOutput(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 , x: -30 }}
      animate={{ opacity: 1 , x: 0 }}
      transition={{ duration: 0.3 , delay: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full items-start gap-4 md:gap-8"
      >
        <Card className="relative w-full rounded-[8px] bg-white/10 backdrop-blur-md">
          <CardHeader>
            <legend className=" bg-white px-2  text-base md:text-xl font-semibold">
              Settings
            </legend>
          </CardHeader>
          <CardBody className="grid gap-4 md:gap-6 py-2 md:py-4 px-6">
            <Select
              {...register("model")}
              items={Models}
              variant="bordered"
              isInvalid={!!errors?.model?.message}
              errorMessage={errors?.model?.message}
              placeholder="Select model"
              label={<Label>Model</Label>}
              labelPlacement="outside"
              size="lg"
              renderValue={(value) => {
                const model = value[0].data;
                return (
                  <div className="flex items-start gap-3 text-black">
                    {model?.icons}
                    <div>
                      <span className="font-medium text-gray-800 mr-2">
                        {model?.label}
                      </span>
                      <span className="text-gray-600">{model?.weight}</span>
                    </div>
                  </div>
                );
              }}
            >
              {(model) => (
                <SelectItem key={model.value} value={model.value}>
                  <div className="flex items-start gap-3 text-black">
                    {model.icons}
                    <div>
                      <span className="font-medium text-gray-800 mr-2">
                        {model.label}
                      </span>
                      <span className="text-gray-600">{model.weight}</span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>

            <Slider
              onChange={(value) => {
                setValue("temperature", value as number);
              }}
              size="sm"
              step={0.01}
              maxValue={2}
              minValue={0}
              defaultValue={1.22}
              classNames={{
                base: "max-w-full gap-3",
                track: "border-s-indigo-600 h-[6px]",
                filler: "bg-indigo-600",
                thumb: " ",
              }}
              renderThumb={(props) => (
                <div
                  {...props}
                  className="group p-1 top-1/2 bg-indigo-700 border-small border-default-200 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span className="transition-transform bg-white shadow-small from-secondary-100 to-secondary-500 rounded-full size-3 block group-data-[dragging=true]:scale-75" />
                </div>
              )}
              label={
                <span className="flex items-center gap-1 ">
                  <Label>Creativity</Label>
                  <Tooltip
                    offset={10}
                    size="md"
                    containerPadding={60}
                    triggerScaleOnOpen={true}
                    content={
                      <span className="p-2 text-gray-700 text-medium">
                        A higher setting produces more creative and surprising
                        bios, while a lower setting sticks to more conventional
                        and predictable styles.
                      </span>
                    }
                    className="max-w-sm"
                  >
                    <Info className="w-4 h-4 ml-1 cursor-pointer" />
                  </Tooltip>
                </span>
              }
            />
          </CardBody>
        </Card>
        <Card className="relative rounded-[8px] w-full  bg-white/10 backdrop-blur-md">
          <CardHeader>
            <legend className=" bg-white px-2 text-base md:text-xl font-medium">
              User Input
            </legend>
          </CardHeader>
          <CardBody className="grid gap-4 md:gap-6 py-2 md:py-4 px-6">
            <Textarea
              {...register("content")}
              isInvalid={!!errors?.content?.message}
              errorMessage={errors?.content?.message}
              variant="bordered"
              label={<Label>About Yourself</Label>}
              labelPlacement="outside"
              disableAutosize
              placeholder="Add your old bio or write few sentences about yourself"
              classNames={{
                base: "max-w-full",
                input: "resize-y min-h-[6rem] md:min-h-[10rem]",
              }}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
              <Select
                {...register("type")}
                items={Types}
                size="lg"
                variant="bordered"
                isInvalid={!!errors?.type?.message}
                errorMessage={errors?.type?.message}
                label={<Label>Type</Label>}
                placeholder="Select type"
                labelPlacement="outside"
                renderValue={(value) => {
                  const model = value[0].data;
                  return (
                    <div className="flex items-start gap-3 ">
                      <span className="font-medium text-gray-800 mr-2">
                        {model?.label}
                      </span>
                    </div>
                  );
                }}
              >
                {(type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <span className="font-medium mr-2 text-gray-700">
                      {type.label}
                    </span>
                  </SelectItem>
                )}
              </Select>
              <Select
                {...register("tone")}
                items={Tones}
                size="lg"
                variant="bordered"
                isInvalid={!!errors?.tone?.message}
                errorMessage={errors?.tone?.message}
                placeholder="Select tone"
                label={<Label>Tone</Label>}
                labelPlacement="outside"
                renderValue={(value) => {
                  const model = value[0].data;
                  return (
                    <div className="flex items-start gap-3 ">
                      <span className="font-medium text-gray-800 mr-2">
                        {model?.label}
                      </span>
                    </div>
                  );
                }}
              >
                {(tone) => (
                  <SelectItem key={tone.value} value={tone.value}>
                    <span className="font-medium text-gray-700 mr-2">
                      {tone.label}
                    </span>
                  </SelectItem>
                )}
              </Select>
            </div>

            <div className="flex items-center gap-4 ">
              <Label>Add Emojis</Label>
              <SwitchMagic
                checked={checked}
                setChecked={(value) => {
                  setChecked(value);
                  setValue("emojis", value);
                }}
              />
            </div>
          </CardBody>
        </Card>

        <Button
          type="submit"
          variant="faded"
          isDisabled={loading}
          isLoading={loading}
          className="bg-blue-800 w-full hover:bg-blue-900 text-white text-lg font-medium rounded-md"
          radius="none"
        >
          Generate{" "}
        </Button>
      </form>
    </motion.div>
  );
}

export default UserInput;
