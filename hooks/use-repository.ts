import { Repository } from "@/types";
import { useMutation } from "@tanstack/react-query";

const useRepository = (repository: string, owner: string) => {
  const { mutate, data, error, isLoading } = useMutation(
    async () => {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repository}`
      );
      return response.json();
    },
    {
      enabled: false,
    }
  );

  return { mutate, data, error, isLoading } as Repository;
};
