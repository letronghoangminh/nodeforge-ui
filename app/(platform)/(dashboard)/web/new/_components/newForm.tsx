"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRepository from "@/hooks/use-select-repo";
import { NewDeploymentStatic } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { TrainTrack, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { comma } from "postcss/lib/list";



const formSchema = z.object({
  type: z.enum(["FRONTEND", "BACKEND"]),
  framework: z.enum([
    "NEXT",
    "VUE",
    "REACT",
    "ANGULAR",
    "SVELTE",
    "NUXT",
    "OTHER",
    "NEST",
  ]),
  name: z.string().min(1),
  repositoryName: z.string().min(1),
  repositoryBranch: z.string().min(1),
  repositoryUrl: z.string().min(1),
  repositoryOwner: z.string().min(1),
  command: z.string().min(1).optional(),
  subdomain: z.string().min(1),
  envVars: z.record(z.string()),
});

type DeploymentFormValues = z.infer<typeof formSchema>;



const NewForm = () => {

  const { item: dataStore } = useRepository();
  const [loading, setLoading] = useState(false);
  const [envVarFields, setEnvVarFields] = useState([{ key: "", value: "" }]);
  const [type, setType] = useState<"BACKEND"| "FRONTEND">("FRONTEND");
  const router = useRouter();
  const { data: session, status } = useSession();

  const {data: dataBranch} = useQuery<{name: string}[]>({
    queryKey: ["branch", dataStore.name, dataStore.ownerName],
    queryFn: () => fetch("https://api.nodeforge.site" + `/api/github/branches?repository=${dataStore.name}&owner=${dataStore.ownerName}`,
    {
      headers: {
        authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    }
    ).then((res) => res.json()),
});


  const defaultValues: NewDeploymentStatic =
  type === "FRONTEND"
      ? {
          type: "FRONTEND",
          framework: "NEXT",
          name: "",
          command: "",
          repositoryName: dataStore.name,
          repositoryBranch: "",
          repositoryUrl: `https://github.com/${dataStore.ownerName}/${dataStore.name}.git`,
          repositoryOwner: dataStore.ownerName,
          subdomain: "",
          envVars: {},
        }
      : {
          type: "BACKEND",
          framework: "NEST",
          name: "",
          command: "",
          repositoryName: dataStore.name,
          repositoryBranch: "",
          repositoryUrl: `https://github.com/${dataStore.ownerName}/${dataStore.name}.git`,
          repositoryOwner: dataStore.ownerName,
          subdomain: "",
          envVars: {},
        };

  const form = useForm<DeploymentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isSubmitting, isValid } = form.formState;


  const addEnvVarField = () => {
    setEnvVarFields([...envVarFields, { key: "", value: "" }]);
  };

  const handleEnvVarChange = (index:number, field:string, value:string) => {
    const newEnvVarFields = [...envVarFields];
    newEnvVarFields[index][field] = value;
    setEnvVarFields(newEnvVarFields);
    console.log(newEnvVarFields);
    const object = {}
    // Update the form value for envVars
    newEnvVarFields.map((envVar) => {
      if (envVar.key) object[envVar.key] = envVar.value;
    });
    form.setValue("envVars", object);
  };

  const deleteEnvVarField = (index) => {
    const newEnvVarFields = envVarFields.filter((_, i) => i !== index);
    setEnvVarFields(newEnvVarFields);


    const object = {}
    // Update the form value for envVars
    newEnvVarFields.map((envVar) => {
      if (envVar.key) object[envVar.key] = envVar.value;
    });
    form.setValue("envVars", object);
    
  };


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{

        const checkSubdomain = await fetch("https://api.nodeforge.site" + `/api/deployment/check-subdomain`, {
            method: "POST",
            body: JSON.stringify({
              subdomain: values.subdomain,
            }),
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session?.accessToken}`,
            }
        });

        if(!checkSubdomain.ok){
            toast.error("Subdomain already exists")
            return;
        }

        const res = await fetch("https://api.nodeforge.site/" + "api/deployment", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session?.accessToken}`,
            }
        }).then((res) => res.json());
        if(!(res.statusCode === 200)  ){
          toast.error(res.message || "Something went wrong")
          return;
        }
        toast.success("Deployment created successfully")
        router.push(`/dashboard`);
    }catch(error){
        toast.error("Something went wrong")
    }
  };


  return (
    <div className=" flex flex-col justify-between">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=" flex justify-between items-center">
                  <div className="flex-1">
                    <FormLabel>Name</FormLabel>
                    <FormDescription>
                      A unique name for your web service.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input
                      className=" max-w-[700px]"
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className=" flex justify-between items-center">
                  <div className="flex-1">
                    <FormLabel>Type</FormLabel>
                    <FormDescription>Select Type</FormDescription>
                  </div>
                  <div className="w-[700px]">
                    <FormControl>
                      <Select
                        disabled={loading}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setType(value as "BACKEND"| "FRONTEND"); // Update state immediately on change
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FRONTEND">Frontend</SelectItem>
                          <SelectItem value="BACKEND">Backend</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repositoryName"
              render={({ field }) => (
                <FormItem className=" flex justify-between items-center">
                  <div className="flex-1">
                    <FormLabel>Repository Name</FormLabel>
                    <FormDescription>
                      A unique repository name for your web service.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input
                      className=" max-w-[700px]"
                      disabled={true}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repositoryUrl"
              render={({ field }) => (
                <FormItem className=" flex justify-between items-center">
                  <div className="flex-1">
                    <FormLabel>Repository Url</FormLabel>
                    <FormDescription>
                      A unique repository url for your web service.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input
                      className=" max-w-[700px]"
                      disabled={true}
                      placeholder="Repository Url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repositoryOwner"
              render={({ field }) => (
                <FormItem className=" flex justify-between items-center">
                  <div className="flex-1">
                    <FormLabel>Repository Owner</FormLabel>
                    <FormDescription>Owner Repository</FormDescription>
                  </div>
                  <FormControl>
                    <Input
                      className=" max-w-[700px]"
                      disabled={true}
                      placeholder="Owner Repository"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="framework"
              render={({ field }) => (
                <FormItem className=" flex justify-between items-center">
                  <div className="flex-1">
                    <FormLabel>Framework</FormLabel>
                    <FormDescription>
                      Select framework your web service.
                    </FormDescription>
                  </div>
                  <div className="w-[700px]">
                    <FormControl>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {type === "FRONTEND" ? 
                            <>
                              <SelectItem value="NEXT">NEXT</SelectItem>
                              <SelectItem value="VUE">VUE</SelectItem>
                              <SelectItem value="REACT">REACT</SelectItem>
                              <SelectItem value="ANGULAR">ANGULAR</SelectItem>
                              <SelectItem value="SVELTE">SVELTE</SelectItem>
                              <SelectItem value="NUXT">NUXT</SelectItem>
                            </>
                            :
                            <>
                              <SelectItem value="NEST">NEST</SelectItem>
                              <SelectItem value="EXPRESS">EXPRESS</SelectItem>
                            </>
                          }
                          <SelectItem value="OTHER">OTHER</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {type === "BACKEND" && (
              <FormField
                control={form.control}
                name="command"
                render={({ field }) => (
                  <FormItem className=" flex justify-between items-center">
                    <div className="flex-1">
                      <FormLabel>Command</FormLabel>
                      <FormDescription>Type Command</FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        className=" max-w-[700px]"
                        disabled={loading}
                        placeholder="Type Command"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="repositoryBranch"
              render={({ field }) => (
                <FormItem className=" flex justify-between items-center">
                  <div className="flex-1">
                    <FormLabel>Branch</FormLabel>
                    <FormDescription>
                      The repository branch used for your web service.
                    </FormDescription>
                  </div>
                  <div className="w-[700px]">
                    <FormControl>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a branch" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dataBranch && dataBranch.length > 0 && dataBranch?.map((branch) => (
                            <SelectItem key={branch.name} value={branch.name}>
                              {branch.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subdomain"
              render={({ field }) => (
                <FormItem className=" flex justify-between items-center">
                  <div className="flex-1">
                    <FormLabel>subdomain</FormLabel>
                    <FormDescription>
                      A unique repository name for your web service.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input
                      className=" max-w-[700px]"
                      disabled={loading}
                      placeholder="subdomain"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="envVars"
              render={({ field }) => (
                <FormItem className=" flex justify-between">
                  <div className="flex flex-col max-w-[400px] gap-2">
                    <FormLabel>Environment Variables</FormLabel>
                    <FormDescription>
                      Set environment-specific config and secrets (such as API
                      keys), then read those values from your code.
                    </FormDescription>
                  </div>
                  <div className=" w-[700px]">
                    {envVarFields.map((envVar, index) => (
                      <div key={index} className="flex gap-4 my-2">
                        <FormControl>
                          <Input
                            className="flex-1"
                            disabled={loading}
                            placeholder="Key"
                            value={envVar.key}
                            onChange={(e) =>
                              handleEnvVarChange(index, "key", e.target.value)
                            }
                          />
                        </FormControl>
                        <FormControl className="w-1/2">
                          <Input
                            className="flex-1"
                            disabled={loading}
                            placeholder="Value"
                            value={envVar.value}
                            onChange={(e) =>
                              handleEnvVarChange(index, "value", e.target.value)
                            }
                          />
                        </FormControl>
                        <Button
                          onClick={() => deleteEnvVarField(index)}
                          variant={"destructive"}
                          size={"icon"}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" onClick={addEnvVarField}>
                      Add Env Variable
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full justify-end flex" >
            <Button
              type="submit"
              variant={"destructive"}
              disabled={isSubmitting || !isValid}
            >Deployment</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewForm;
