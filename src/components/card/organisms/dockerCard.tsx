import { FC } from "react";
import { DockerMatrics } from "../../../hooks/serverSentEvent";

export interface DockerCardProps {
  dockerMatrics: DockerMatrics;
}

export const DockerCard: FC<DockerCardProps> = ({ dockerMatrics }) => {
  const { name, status, running } = dockerMatrics;
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="p-3">
        <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <div className="mb-2 flex items-center">
          <span className="text-md font-medium mr-2">Status:</span>
          <span
            className={`inline-block px-2 py-0.5 text-sm font-medium text-white rounded ${
              running ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};
