"use client";

import { FC, useState } from "react";

import { Button } from "@/components/Button/Button";
import { Form } from "@/components/Form/Form";
import { MultiStepFormProps } from "./types";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const MultiStepForm: FC<MultiStepFormProps> = ({ stepComponents }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const { id, Component } = stepComponents[stepIndex];

  const form = useForm({
    resolver: yupResolver(stepComponents[stepIndex]?.schema),
    defaultValues: stepComponents[stepIndex]?.defaultValues ?? {},
  });

  const nextStep = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
    setStepIndex((prev) => Math.min(prev + 1, stepComponents.length - 1));
  };

  const prevStep = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          {stepComponents.map(({ id, title }) => (
            <div
              key={id}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                stepIndex === id - 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {title}
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(nextStep)} className="space-y-6">
            <motion.div
              key={id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              {id === 3 ? (
                <Component values={form.getValues()} />
              ) : (
                <Component values={[]} />
              )}
            </motion.div>

            <div className="flex justify-between mt-6">
              <Button onClick={prevStep} disabled={stepIndex === 0}>
                Previous
              </Button>
              {stepIndex < stepComponents.length - 1 ? (
                <Button type="submit">Next</Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MultiStepForm;
