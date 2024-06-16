"use client"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  id: z.number().min(1),
  envVars: z.record(z.string()),
});

interface EnvVarField {
  key: string;
  value: string;
}

type EnvironmentFormValues = z.infer<typeof formSchema>;

interface EnvironmentFormProps {
  data: {
    id: number;
    envVars: Record<string, string>;
  };
  isShow: boolean;
}
function convertObjectToArray(obj: Record<string, any>) {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  }
  

const EnvironmentForm = ({ data, isShow }: EnvironmentFormProps) => {
    const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [envVarFields, setEnvVarFields] = useState(convertObjectToArray(data?.envVars));

  const defaultValues = {
    id: data.id,
    envVars: data.envVars,
  };


  const form = useForm<EnvironmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { isSubmitting, isValid } = form.formState;


  const addEnvVarField = () => {
    setEnvVarFields([...envVarFields, { key: "", value: "" }]);
  };

  const handleEnvVarChange = (index: number, field: keyof EnvVarField, value: string) => {
    const newEnvVarFields: EnvVarField[] = [...envVarFields];
    newEnvVarFields[index][field] = value;
    setEnvVarFields(newEnvVarFields);
  
    const object: Record<string, string> = {};
    newEnvVarFields.forEach((envVar) => {
      if (envVar.key) object[envVar.key] = envVar.value;
    });
    form.setValue("envVars", object)
  };
  
  const deleteEnvVarField = (index: number) => {
    const newEnvVarFields: EnvVarField[] = envVarFields.filter((_, i) => i !== index);
    setEnvVarFields(newEnvVarFields);
  
    const object: Record<string, string> = {};
    newEnvVarFields.forEach((envVar) => {
      if (envVar.key) object[envVar.key] = envVar.value;
    });
    form.setValue("envVars", object)
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.nodeforge.site/" + "api/deployment/environment",
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (!res.ok) {
        toast.error("Something went wrong");
      }
      setLoading(false);

      toast.success("Deployment created successfully");
      window.location.reload(); 
    } catch (error) {
      setLoading(false);

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="envVars"
            render={({ field }) => (
              <FormItem className=" flex flex-col">
                <div className=" w-[1000px]">
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
                          value={isShow ? envVar.value : '****'} 
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
        <div className="w-full justify-end flex" >
            <Button
              type="submit"
              variant={"destructive"}
              disabled={isSubmitting || !isValid}
            >Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EnvironmentForm;
