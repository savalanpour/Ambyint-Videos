import dayjs from "dayjs";
import { Clock8 } from "lucide-react";
import { Tooltip } from "antd";
import React from "react";

export const ReleaseDate = ({ date }: { date: string }) => (
  <Tooltip
    title={<span className="text-xs text-black">Release Date</span>}
    color="#eee"
    className="flex items-center mt-1 mr-1 cursor-pointer"
  >
    <Clock8 className="text-orange-600 mr-1" width={16} />
    <div>
      <span className="text-xs text-gray-400">
        {date ? dayjs(date).format("MMM D, YYYY") : "N/A"}
      </span>
    </div>
  </Tooltip>
);
