import dayjs from "dayjs";
import { Clock8 } from "lucide-react";
import { Tooltip } from "antd";
import React from "react";

export const ReleaseDate = ({ date }: { date: string }) => (
  <Tooltip
    title="Release Date"
    className="flex items-center mt-1 mr-1 cursor-pointer"
  >
    <Clock8 className="text-orange-600 mr-1" width={16} />
    <div>
      <span className="text-xs text-gray-500">
        {dayjs(date).format("MMMM D, YYYY")}
      </span>
    </div>
  </Tooltip>
);
