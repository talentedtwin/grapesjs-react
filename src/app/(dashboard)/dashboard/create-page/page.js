"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  metaTitle: yup.string().required("Meta title is required"),
  metaDescription: yup
    .string()
    .required("Meta description is required")
    .max(160, "Meta Description must be 160 characters or less"),
  active: yup.number().required("Active status is required"),
  published: yup.number().required("Published status is required"),
});

// Function to generate a URL-friendly slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading and trailing hyphens
    .replace(/\/+/g, "-"); // Replace forward slashes with hyphens
};

export default function CreatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      active: 0,
      published: 0,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Generate the slug from the title
      const slug = generateSlug(data.title);

      // Add the slug to the data object
      const dataWithSlug = { ...data, slug };

      const response = await fetch("/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithSlug),
      });

      if (!response.ok) {
        throw new Error("Failed to create page");
      }

      router.push("/pages");
    } catch (error) {
      console.error("Error creating page:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title">Page Title</Label>
          <Input {...register("title")} placeholder="Page Title" />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input {...register("metaTitle")} placeholder="Meta Title" />
          {errors.metaTitle && (
            <p className="text-red-500">{errors.metaTitle.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea
            {...register("metaDescription")}
            placeholder="Meta Description"
          />
          {errors.metaDescription && (
            <p className="text-red-500">{errors.metaDescription.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="active">Active</Label>
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Inactive" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value={0}>Inactive</SelectItem>
                    <SelectItem value={1}>Active</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.active && (
            <p className="text-red-500">{errors.active.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="published">Published</Label>
          <Controller
            name="published"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Un-published" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value={0}>Un-published</SelectItem>
                    <SelectItem value={1}>Published</SelectItem>
                    <SelectItem value={2}>Archived</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.published && (
            <p className="text-red-500">{errors.published.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Page"}
        </Button>
      </form>
    </div>
  );
}
