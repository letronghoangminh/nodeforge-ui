"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useRepository from "@/hooks/use-select-repo";
import { Repository } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ListRepoProps {
  data: Repository[];
}

const ListRepo = ({ data }: ListRepoProps) => {


  const repository = useRepository()
  console.log(data);

  const router = useRouter();

  const redirect = (item: Repository) => {
    repository.replaceItem(item)
    router.push(`/web/new/?type=front-end`);
  }

  return (
    <Card className="w-[1200px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Connect a repository
        </p>
      </CardHeader>
      <CardContent className=" space-y-6">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {data &&
                data.map((repo: Repository) => (
                  <CommandItem key={repo.name} >
                    <div className="flex w-full justify-between px-4 items-center">
                      <div className="flex gap-2 items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              "data:image/png;base64,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"
                            }
                            alt="@shadcn"
                          />
                          <AvatarFallback>HM</AvatarFallback>
                        </Avatar>
                        <div className=" font-mono text-lg">
                          {`${repo.ownerName} / ${repo.name}`}
                        </div>
                      </div>
                        <Button onClick={() => redirect(repo)}  variant={"destructive"}>Connect</Button>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  );
};

export default ListRepo;
